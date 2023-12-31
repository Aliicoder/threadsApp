"use client"
import {sidebarLinks} from '@/constants/links'
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { SignOutButton, SignedIn, useAuth , } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
const LeftBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const {userId} = useAuth();
  //console.log(userId)
  return ( 
    <section className="custom-scrollbar bg-slate-50 leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {
          sidebarLinks.map((link) =>
            {

              const active = 
              (pathName.includes(link.route)&&link.route.length>1)
              ||
              pathName === link.route;
              if(link.route === '/profile') link.route = `${link.route}/${userId}`;
              return (
                <Link  href={link.route} key={link.label} 
                className={`leftsidebar_link ${active&&"bg-primary-500"}`}
                >
                  <Image className={`${!active&&'invert'}`} src={link.imgURL} alt={link.label} height={25} width={25}/>
                  <p className={`${active&&'text-light-1'} max-lg:hidden`}>{link.label}</p>
                </Link>
              )
            }
          )

        }
      </div>
      <div className="mt-10 px-6">
            <SignedIn>
              <SignOutButton
              signOutCallback={()=>router.push("/sign-in")}>
                <div className="flex cursor-pointer leftsidebar_link">
                <Image 
                className='invert'
                src={"assets/logout.svg"} 
                alt={"logOut"}
                width={25}
                height={25}
                />
                <p className=' max-lg:hidden '>logout</p>
                </div>
              </SignOutButton>  
            </SignedIn>            
          </div>
    </section> 
  );
}
 
export default LeftBar;