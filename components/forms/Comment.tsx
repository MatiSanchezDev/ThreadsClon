"use client"

import * as z from "zod"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button";
import {zodResolver} from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";

//import { updateUser } from "@/lib/actions/user.actions";
import { CommentValidation } from "@/lib/validation/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";
//import { createThread } from "@/lib/actions/thread.action";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

export const Comment = ({
    threadId,
    currentUserImg,
    currentUserId,
}: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
        thread: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)

        form.reset()
    }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel>
                <Image src={currentUserImg} alt="Profile Image" width={48} height={48} className="rounded-full"/>
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                 type='text'
                 placeholder="Comment..."
                 className="no-focus text-light-1 outline-none"
                 {...field}
                />  
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="comment-form_btn" type="submit">
            Reply
        </Button>
      </form>
    </Form>
  )
}