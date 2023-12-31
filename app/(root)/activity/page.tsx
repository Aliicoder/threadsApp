import ThreadPostCard from "@/components/cards/ThreadPostCard";
import CommentForm from "@/components/forms/CommentForm";
import { fetchThread } from "@/lib/actions/thread.actions";
import { getActivities, getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs , TabsList ,TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/links";
import Image from "next/image";
import ThreadTab from "@/components/shared/ThreadTab";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
const page = async () => {
  const user = await currentUser()
  if(!user) return redirect('/sign-in')
  const userInfo = await getUser(user.id)
  //console.log(userInfo)
  if(!userInfo.onboarded) return redirect('/onboarding')
  const replies = await getActivities({userId: userInfo._id})
  console.log(replies)
  return (
    <section 
      className="mt-10 flex flex-col gap-5"
      >
      {
        replies.length > 0 ?
        (replies.reverse().map((reply)=>{
          const date = new Date(reply.createdAt)
          let hours = date.getHours()
          let minutes = date.getMinutes()
          const pmam = hours > 12 ? "PM" : "AM"
          let chours = hours % 12
          let mchours = chours < 10 ? '0'+chours : chours
          let cminutes = minutes < 10 ? '0'+minutes : minutes
          let time = mchours+':'+cminutes+' '+pmam
          return(
          <Link key={reply._id} href={`/thread/${reply.id}`}>
            <article className="activity-card gap-3">
              <Image
                className="rounded-full"
                src={reply.author.image} alt={"avatar"} height={30} width={30}
              />
              <span className="text-body-semibold">{reply.author.name}</span>
              <span>replies to your tweet</span>
              <span className="text-primary-500"
              >
                <Link href={`/thread/${reply.parentId._id}`} >
                  {reply.parentId.text.split(/\s+/).slice(0,3).join(' ')} . . .
                </Link>
              </span>
              <span className="ml-auto">{time}</span>
            </article>
          </Link>
        )}))
        :
        (
          <p>no activities yet</p>
        )
      }
    </section>
  )
}

export default page