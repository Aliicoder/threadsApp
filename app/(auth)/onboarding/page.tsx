import AccountProfileForm from "@/components/forms/AccountProfileForm";
import { getUser } from "@/lib/actions/user.actions";
import { UserProps } from "@/lib/types/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const onboarding = async () => {
  const user = await currentUser();
  const isUser = await getUser(user!.id)
  if(isUser) redirect('/')
  const userInfo:UserProps['user'] = {
    id: "",
    objectId: "",
    username: "",
    name: "",
    bio: "",
    image: ""
  };
  const userData = {
    id: user?.id, 
    objectId: userInfo!._id,
    username:userInfo?.username || user?.username || "enter your username",
    name:userInfo?.name || user?.firstName || "enter your name",
    bio:userInfo?.bio||"optional",
    image:userInfo?.image || user?.imageUrl
  }
  return ( 
    <main
    className="mx-auto flex flex-col max-w-3xl px-10 py-20 bg-slate-800"
    >
      <h1 
      className="head-text text-light-"
      >onboarding</h1>
      <p
      className=" mt-3 px-1 text-base-regular text-light-1"
      >Complete your profile</p>
      <section
      className="mt-9 bg-slate-700 p-10"
      >
        <AccountProfileForm user={userData} btnTitle="continue"/>
      </section>
    </main>
   );
}
 
export default onboarding;