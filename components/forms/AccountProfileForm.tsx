"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from "@/lib/validations/userValidation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { ChangeEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
import * as z from "zod"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing";
import path from "path"
import { usePathname , useRouter } from "next/navigation"

import { UserProps } from "@/lib/types/types"
import { updateUser } from "@/lib/actions/user.actions"

const AccountProfile = ({user,btnTitle}:UserProps) => {
  const [files,setFiles] = useState<File[]>([]);
  const {startUpload} = useUploadThing("media");
  const pathName = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues:{
      profile_photo:user?.image||'',
      name:user?.name||'',
      username:user?.username||'',
      bio:user?.bio||''
    }
  })

  const handleImg = (e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void) =>{
    e.preventDefault();
    const fileReader = new FileReader();
    if(e.target.files && e.target.files.length>0)
    {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))
      if(!file.type.includes('image')) return;
      fileReader.onload = async (event) =>
      {
        const imageDataUrl = event.target?.result?.toString() || '';
        fieldChange(imageDataUrl);
      }
      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo
    const hasImageChanged = isBase64Image(blob)
    if(hasImageChanged)
    {
      const imgRes = await startUpload(files)
      if(imgRes && imgRes[0].fileUrl)
      {
        values.profile_photo=imgRes[0].fileUrl;
      }
    }
    await updateUser({
      userId:user.id,
      username:values.username,
      name:values.name,
      bio:values.bio,
      image:values.profile_photo,
      path:pathName
    })
    if( pathName === "/profile/edit")
      router.back()
    else
      router.push('/')
  }

  return ( 
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem 
              className="flex">
              <FormLabel>
                {field.value?(
                  <Image
                    className="rounded-full object-contain"
                    src={field.value}
                    alt="profile_photo"
                    width={50} height={50}
                    priority
                  />
                ):(
                  <Image 
                    className="object-contain"
                    src={"/assets/profile.svg"} 
                    alt={"profile_photo"}
                    width={50} height={50}                  
                  />
                )}
              </FormLabel>
              <FormControl>
                <Input 
                  onChange={(e)=>handleImg(e , field.onChange)}
                  className="account-form_image-input text-light-1"
                  type="file"
                  accept="image/*"
                  placeholder="upload a photo" 
                  />
              </FormControl>
             
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-1">
                Name
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your name" 
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-1">
                Username
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your Username" 
                  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-1">
                Bio
              </FormLabel>
              <FormControl>
               <Textarea
                rows={10}
                {...field} 
               />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
   );
}
 
export default AccountProfile;

