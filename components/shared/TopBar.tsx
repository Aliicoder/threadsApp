import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/favicon.ico"
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const TopBar = () => {
  return ( 
    <nav className="topbar">
        <Link href={`/`} className="flex items-center gap-6">
          {/* <Image 
          src={Logo}
          alt="logo"
          width={30}
          height={30}
          /> */}
          <p className={`text-heading3-bold  max-xs:hidden pl-3`}>TRD<span className="text-primary-500">.</span></p>
        </Link>
        <div className="flex items-center gap-2">
          <div className="block md:hidden">
            <SignedIn>
              <SignOutButton>
                <div className="flex cursor-pointer">
                <Image 
                src={"assets/logout.svg"} 
                alt={"logOut"}
                width={25}
                height={25}
                />
                </div>
              </SignOutButton>  
            </SignedIn>            
          </div>
          <OrganizationSwitcher
            appearance={
              {
                elements:{
                  organizationSwitcherTrigger:"py-2 px-4",
                }
              }
            }
          />
        </div>
    </nav>
   );
}
 
export default TopBar;