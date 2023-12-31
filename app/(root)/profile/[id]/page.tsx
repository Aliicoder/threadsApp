import ThreadPostCard from "@/components/cards/ThreadPostCard";
import CommentForm from "@/components/forms/CommentForm";
import { fetchThread } from "@/lib/actions/thread.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs , TabsList ,TabsTrigger,TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/links";
import Image from "next/image";
import ThreadTab from "@/components/shared/ThreadTab";
const Page = async ({params}:{params:{id:string}}) => {
  if(!params.id) return null
  const user = await currentUser()
  if(!user) return redirect('/sign-in')
  const userInfo = await getUser(params.id)
  console.log(userInfo)
  if(!userInfo.onboarded) return redirect('/onboarding')
  return ( 
    <section>
      <ProfileHeader
        urlId={params.id}
        authUserId={user.id}
        userId={userInfo._id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <Tabs className="w-full" defaultValue="threads">
        <TabsList className="tab">
        {profileTabs.map((tab)=>
            (
            <TabsTrigger
              className="tab"
              value={tab.value} key={tab.label}>
              <Image className="object-contain"
               src={tab.icon} alt={tab.label} height={24} width={24} />
              <p className="max-sm:hidden">{tab.label}</p>
              {
                tab.label === "Threads" && userInfo.threads.length > 0 && 
                (
                  <p 
                    className="ml-1 rounded-full 
                    w-5 h-5 flex justify-center items-center 
                    bg-light-1 px-2 py1 !text-tiny-medium text-dark-1"
                  >{userInfo.threads.length}</p>
                )
              }
            </TabsTrigger>
            )
          )}
        </TabsList>
        {
          profileTabs.map((tab)=>(
            <TabsContent  key={tab.label} value={tab.value}>
              <ThreadTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"              
              />
            </TabsContent>
          )
        )
        }
      </Tabs>
    </section>
   );
}
 
export default Page;