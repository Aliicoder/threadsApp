import ThreadPostCard from "@/components/cards/ThreadPostCard";
import CommentForm from "@/components/forms/CommentForm";
import { fetchThread } from "@/lib/actions/thread.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({params}:{params:{id:string}}) => {
  if(!params.id) return null
  const user = await currentUser()
  if(!user) return null
  const userInfo = await getUser(user?.id)
  //console.log(JSON.stringify(userInfo._id))
  if(!userInfo.onboarded) return null
  const thread = await fetchThread(params.id)
  return ( 
    <>
      <section>
        <div>
          <ThreadPostCard 
            key={thread._id}
            id={thread._id}
            currentUserId={user!.id}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        </div>
        <div>
          <CommentForm
            threadId={thread._id}
            currentUserId={userInfo._id}
            currentUserImage={userInfo.image}
          />
        </div>
        <div className="mt-10">
         {
          thread.children.map((child:any) =>
            (
              <ThreadPostCard 
                key={child._id}
                id={child._id}
                currentUserId={user!.id}
                parentId={child.parentId}
                content={child.text}
                author={child.author}
                community={child.community}
                createdAt={child.createdAt}
                comments={child.children}
                isComment
              />
            )
          )
         }
        </div>
      </section>
    </>
   );
}
 
export default Page;