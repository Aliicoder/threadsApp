import { SignIn} from "@clerk/nextjs";

const page = () => {
  return (
    <div className=" grid outline h-screen ">
      <div className=" place-self-center">
        <SignIn/>
      </div> 
    </div> 
   );
}
 
export default page;