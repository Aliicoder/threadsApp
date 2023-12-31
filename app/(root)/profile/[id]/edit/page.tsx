import AccountProfileForm from "@/components/forms/AccountProfileForm";
import { getUser } from "@/lib/actions/user.actions";
import { UserProps } from "@/lib/types/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const EditProfile = async () => {
  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  return ( 
    <main
    className="mx-auto flex flex-col max-w-3xl px-10 py-20 bg-slate-50"
    >
      <h1 
      className="head-text text-black"
      >Edit your profile</h1>
      <section
      className="mt-9 bg-slate-700 p-10"
      >
        <AccountProfileForm user={userInfo} btnTitle="continue"/>
      </section>
    </main>
   );
}
 
export default EditProfile;