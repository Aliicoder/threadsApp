"use server"
import mongoose, { FilterQuery, SortOrder } from "mongoose"
import { connectToDB } from "../mongoose"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"
import { upDateParams } from "../types/types"
import { redirect } from "next/dist/server/api-utils"
import Thread from "../models/thread.model"

export const updateUser = async (
  { userId , username , name , bio , image , path }:upDateParams ): Promise<void> =>
{
    try{
      connectToDB()
      await User.findOneAndUpdate(
      {id:userId},
      { username:username.toLowerCase() , name , bio , image , onboarded: true },
      {upsert: true}
    )  
    if( path === "/profile/edit")
      revalidatePath(path)
    }catch(e:any){
      throw new Error(`could not update the user: ${e.message}`)
    }
}
export const getUser = async (userId:string,path=null) =>
{
  try{
    connectToDB()
    const user = await User.findOne({ id: userId })
    revalidatePath(`/profile"/${userId}`)
    return user
  }catch(e:any){
    throw new Error(` might be new user :${e.message}`)
  }
}
export const fetchUserThreads = async (userId:string) =>
{
  try{
    connectToDB()
    const threads = await User.findOne({ id: userId })
      .populate({
        path:'threads',
        model: Thread,
        populate:{
          path:'children',
          model: Thread,
          populate:{
            path:'author',
            model: User,
            select: 'name image id'
          }
        }
      })
      return threads
  }catch(e:any){
    throw new Error(`can not fetch user threads: ${e.message}`)
  }
}
export const fetchUsers = async ({userId,searchKey,pageNumber=1,pageSize=20,sortBy="desc"}
:{userId:string,searchKey:string,pageNumber:number,pageSize:number,sortBy:SortOrder}) =>
{
  try{
    connectToDB()
    const skipAmount = (pageNumber-1)*pageSize
    const regex = new RegExp (searchKey,"i");
    const query:FilterQuery<typeof User> = {
      id:{$ne:userId}
    }
    if(searchKey.trim() !== '') 
      query.$or = [
        {username : {$regex : regex}},
        {name : {$regex : regex}}
      ]
    const sortOptions = {createAt: sortBy}
    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
    const totalUsersCount = await User.countDocuments(query)
    const users = await usersQuery.exec()
    const isNext = totalUsersCount > skipAmount + users.length
    return {users,isNext}
  }catch(e:any){
    throw new Error(`can not fetch users: ${e.message}`);
  }
}
export const getActivities = async ({userId}:{userId:string}) =>
{
  try{
    connectToDB()
    console.log(userId)
    const userThreads = await Thread.find({author: userId})
    const userCommentIds = userThreads.reduce((acc, thread) =>{
      return acc.concat(thread.children)
    },[])
    const replies = await Thread.find({
      _id:{$in:userCommentIds},
      author:{$ne:userId}}
      ).populate({
        path:'author',
        model: User,
        select: 'name image _id'
      }).populate({
        path:'parentId',
        model: Thread,
        select:'text'
      })
    // console.log("________");
    // console.log(replies);
    // console.log("________")
    return replies
  }catch(e:any){
    throw new Error(`can not get activities: ${e.message}`);
  }
}