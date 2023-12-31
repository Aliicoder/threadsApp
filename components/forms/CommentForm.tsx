"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentV, CommentValidationalidation } from "@/lib/validations/thread"
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

import { addCommentToThread, createThread } from "@/lib/actions/thread.actions"
import { CommentValidation } from "@/lib/validations/commentValidation"
import { CommentProps } from "@/lib/types/types"
import { Input } from "../ui/input"
import Image from "next/image"
const CommentForm = ({currentUserImage,threadId,currentUserId}:CommentProps) => {
  const pathName = usePathname()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues:{
      thread:"",
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread({
      threadId: threadId,
      currentUserId : currentUserId,
      thread: values.thread,
      path:pathName
    })
    form.reset()
    // await createThread({
    //   text: values.thread,
    //   author: userId,
    //   communityId:null,
    //   path:pathName
    // })
    // router.push("/")
  }

  return ( 
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className=" comment-form ">
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem
                className="flex w-full items-center gap-5"
              >
                <FormLabel className="">
                  <Image
                    className="rounded-full object-contain"
                    src={currentUserImage} alt={"user-image"} width={48} height={48}/>
                </FormLabel>
                <FormControl>
                <Input
                  type='text'
                  placeholder="comment here"
                  {...field} 
                />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="" type="submit">Replay</Button>
        </form>
      </Form>
   );
}
 
export default CommentForm;