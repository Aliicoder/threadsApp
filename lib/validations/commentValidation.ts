import * as z from "zod";

export const CommentValidation = z.object({
  thread:z.string().nonempty().trim().min(3)
})