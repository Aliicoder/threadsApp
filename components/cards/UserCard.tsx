"use client"
import Image from "next/image";
import { UserCardProps } from "@/lib/types/types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const UserCard = ({name,id,imgUrl,personType,username}:UserCardProps) => {
  const router = useRouter()
  return ( 
    <article className="user-card items-center bg-slate-50 p-4 rounded-sm">
      <div className="user-card_avatar">
        <Image 
          src={imgUrl} 
          alt={"avatar"}
          className="rounded-full"
          width={48}
          height={48}
        />
        <div className=" flex-1 text-ellipsis">
          <h4 className="text-base-semibold">{name}</h4>
          <p className="text-small-medium">{`@${username}`}</p>
        </div>
      </div>
      <Button className="!bg-primary-500" onClick={()=>router.push(`/profile/${id}`)}>
        view
      </Button>
    </article>
   );
}
 
export default UserCard;