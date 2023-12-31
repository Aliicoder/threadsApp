import ThreadPostCard from "@/components/cards/ThreadPostCard";
import UserCard from "@/components/cards/UserCard";
import CommentForm from "@/components/forms/CommentForm";
import { fetchThread } from "@/lib/actions/thread.actions";
import { fetchUsers, getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const page = async () => {
  const user = await currentUser()
  if(!user) return redirect('/sign-in')
  const userInfo = await getUser(user.id)
  console.log(userInfo)
  if(!userInfo.onboarded) return redirect('/onboarding')
  const result = await fetchUsers({userId:user.id,pageNumber:1,pageSize:25,searchKey:""})
  console.log(result)
  return (
    <section>
      <h1 className="text-black">Search</h1>
      {/* search bar */}
      <div className="mt-10 gap-3">
      {
        result.users.map((userInfo) =>(
          <UserCard
            key={userInfo.id}
            id={userInfo.id}
            name={userInfo.name}
            username={userInfo.username}
            imgUrl={userInfo.image}
            personType='User'
          />
        ))
      }
      </div>
    </section>
  )
}

export default page