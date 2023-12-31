import PostThreadForm from "@/components/forms/PostThreadForm";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  console.log(user);
  if (!user) redirect('/sign-in')
  const userInfo = await getUser(user.id)
   return ( 
    <section>
      <h2 className="text-heading4-medium mb-5">Create a Thread </h2>
      <PostThreadForm userId={userInfo!._id} />
    </section>
   );
}
 
export default Page;