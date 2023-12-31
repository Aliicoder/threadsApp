export interface upDateParams {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}
export interface UserProps  {
  user:{
    id:string
    objectId:string
    username:string
    name:string
    bio:string
    image:string
  } 
  btnTitle:string
}
export interface threadProps {
  text:string
  author:string
  communityId:string | null
  path:string
}
export interface threadCardProps {
  key:string
  id:string
  currentUserId:string 
  parentId: string | null
  content:string
  author : {
    name:string
    image:string
    id:string
  }
  community : {
    id :string
    name:string
    image:string
  } | null
  createdAt : Date
  comments: {
    author:{
      image:string
    }
  }
  isComment : boolean
}
export interface CommentProps {
  threadId:string
  currentUserId:string
  currentUserImage:string
}
export interface addCommentToThreadProps {
  threadId:string
  currentUserId:string
  thread:string
  path:string
}
export interface ProfileHeaderProps {
  urlId:string
  authUserId:string
  userId:string
  name:string
  username:string
  imgUrl:string
  bio:string
}
export interface ThreadTabProps {
  currentUserId:string
  accountId:string
  accountType:string
}
export interface UserCardProps {
  id:string
  name:string
  username:string
  imgUrl:string
  personType:string
}