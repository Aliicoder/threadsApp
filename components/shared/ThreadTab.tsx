import { fetchUserThreads } from '@/lib/actions/user.actions'
import { ThreadTabProps } from '@/lib/types/types'
import { useParams } from 'next/navigation'
import React from 'react'
import ThreadPostCard from '../cards/ThreadPostCard'

const ThreadTab = async ({accountId,accountType,currentUserId}:ThreadTabProps) => {
  const result = await fetchUserThreads(accountId)
  //console.log(result)
  return (
    <div>
      {
        result.threads.map((thread:any) =>(
          <ThreadPostCard 
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={{name:result.name,image:result.image,id:thread.id}}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children} 
            isComment={false}          
            />
        ))
      }
    </div>
  )
}

export default ThreadTab