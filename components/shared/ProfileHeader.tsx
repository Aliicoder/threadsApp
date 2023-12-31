import { ProfileHeaderProps } from "@/lib/types/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getUser } from "@/lib/actions/user.actions";
const ProfileHeader = async ({
  authUserId,bio,name,imgUrl,userId,username,urlId
  }:ProfileHeaderProps) => {
    const authUser = await getUser(authUserId);
    //console.log(authUser.id)
    //console.log(urlId)
  return ( 
    <div className="flex w-full flex-col justify-start bg-slate-50 rounded-md p-5">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center gap-3">
          <div className=" relative object-contain h-20 w-20">
            <Image 
              className="rounded-full"
              src={imgUrl} 
              fill
              alt={"profileImage"}  
            />
          </div>
          <div className="flex-1">
            <div className="text-left text-heading4-medium">
              {name}
            </div>
            <p className="">{`@${username}`}</p>
          </div>
          {(urlId==authUser.id)&&<Button className=" mr-5 ml-auto">
            <Link href={`/profile/${authUserId}/edit`}>Edite</Link>
          </Button>}
        </div>
        
      </div>
      <p className="p-2 pt-5">{bio}</p>
    </div>
   );
}
 
export default ProfileHeader;