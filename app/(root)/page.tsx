import ThreadPostCard from '@/components/cards/ThreadPostCard';
import { fetchPosts } from '@/lib/actions/thread.actions'
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
const Home = async () => {
  const user = await currentUser();
  if(!user) return  redirect('/sign-in')
  const userInfo = await getUser(user?.id);
  if(!userInfo || !(userInfo.onboarded) ) redirect('/onboarding')
  const result = await fetchPosts(1,30);
  return (
      <>
        {
          result.posts.length === 0 ?
          <p> No Posts</p>
          :
          result.posts.map(post =>(
            <ThreadPostCard
              key={post._id}
              id={post._id}
              currentUserId={user!.id}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              isComment
            />
            
          ))
        }
      </>
  )
}
export default Home