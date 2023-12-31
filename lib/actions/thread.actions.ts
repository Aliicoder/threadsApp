"use server"
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache"
import { threadProps, upDateParams ,addCommentToThreadProps } from "../types/types"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { currentUser } from "@clerk/nextjs"

export const createThread = async (
  {text,author,communityId,path}:threadProps ): Promise<void> =>
{
   
      connectToDB()
      const createThread = await Thread.create({
        text,
        author,
        community:null
      })
      await User.findByIdAndUpdate(author,{$push:{threads:createThread._id}})
      revalidatePath(path)
   
}
export const fetchPosts = async (pageNumber=1,pageSize=20) => 
{    connectToDB();
    const skipAmount = ( pageNumber - 1 ) * pageSize;
    const postsQuery = 
      Thread.find({parentId:{$in:[null,undefined]}})
      .sort({createdAt:'desc'})
      .skip(skipAmount)
      .limit(pageSize)
      .populate({path: 'author',model: User})
      .populate({
        path: 'children',
        populate:{
          path: 'author',
          model: User,
          select: 
          '_id name parentId image'
        }
      })
      const totalPosts = await Thread.countDocuments({parentId:{$in:[null,undefined]}})
      const posts = await postsQuery.exec();
      const isNext = totalPosts > skipAmount + posts.length;
      //console.log('----------')
      return { posts, isNext} ;

}
export const fetchThread = async (id:string) => 
{
  try{
    connectToDB()
    const thread = await Thread.findById(id)
      .populate({
        path:'author',
        model: User,
        select:'_id id name image'
      })
      .populate({
        path:'children',
        model: Thread,
        populate:[
          {
            path:'author',
            model: User,
            select:'_id id name image'
          },
          {
            path:'children',
            model: Thread,
            populate:{
              path:'author',
              model: User,
              select:'_id id name image'  
            }
          }
        ]
      }).exec();
      return thread
  }catch(e:any){
    throw new Error(`can not fetch thread ${id}: ${e.message}`)
  }
}
export const addCommentToThread = async ({
 currentUserId,threadId,thread,path
}:addCommentToThreadProps) => 
{
  try{
    connectToDB()
    const originalThread = await Thread.findById(threadId)
    if(!originalThread) throw new Error (`can not find thread ${threadId}`)
    const commentThread = new Thread({
      text:thread,
      author: currentUserId,
      parentId: threadId,
    })
    const savedCommentOfThread = await commentThread.save()
    originalThread.children.push(savedCommentOfThread._id)
    await originalThread.save()
    revalidatePath(path)

  }catch(e:any){
    throw new Error(`can not add comment: ${e.message}`)
  }
}