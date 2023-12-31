"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { ThreadValidation } from "@/lib/validations/threadValidation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import * as z from "zod"
import { redirect, usePathname , useRouter } from "next/navigation"

import { createThread } from "@/lib/actions/thread.actions"
const PostThread = ({userId}:{userId:string}) => {
  const pathName = usePathname()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues:{
      thread:"",
      accountId:""
    }
  })

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId:null,
      path:pathName
    })
    router.push("/")
  }

  return ( 
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  content
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
 
export default PostThread;