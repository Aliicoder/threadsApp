import { threadCardProps } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
const ThreadPostCard = ({content,author,id,isComment,comments}:threadCardProps ) => {
  return ( 
    <>
      <article 
        className={`${isComment? 
        "flex flex-col rounded-md p-10 bg-slate-50 my-5"
        :
        "flex flex-col rounded-md p-10 bg-light-1 my-5" }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 gap-4">
            <div className=" flex flex-col items-center">
              <Link className=" relative h-11 w-11" href={`/profile/${author.id}`}>
                <Image 
                  className=" rounded-full  cursor-pointer"
                  src={author.image} alt={"profile_image"} fill/>
              </Link>
              <div className="thread-card_bar "></div>
            </div>
            <div className="flex w-full flex-col">
              <Link className="w-fit" href={`/profile/${author.id}`}>
                <h4 className="text-base-semibold cursor-pointer">{author.name}</h4>
              </Link>
              <p className="mt-5 text-small-regular">{content}</p>
              <div className="mt-5 flex flex-col">
                <div className="flex gap-3">
                  <Image
                    className="object-contain cursor-pointer" 
                    src={"/assets/heart-gray.svg"} alt={"heart"} 
                    height={24} width={24} 
                  />
                  <Link href={`thread/${id}`}>
                    <Image
                      className="object-contain cursor-pointer" 
                      src={"/assets/reply.svg"} alt={"heart"} 
                      height={24} width={24} 
                    />
                  </Link>
                  <Image
                    className="object-contain cursor-pointer" 
                    src={"/assets/share.svg"} alt={"heart"} 
                    height={24} width={24} 
                  />
                  <Image
                    className="object-contain cursor-pointer" 
                    src={"/assets/repost.svg"} alt={"heart"} 
                    height={24} width={24} 
                  />
                  {isComment && comments.length> 0 &&(
                    <Link href={`/thread/${id}`}>
                      <p>{comments.length} replies</p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
   );
}
 
export default ThreadPostCard;