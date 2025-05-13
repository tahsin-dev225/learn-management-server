import { z } from "zod";

const commentSchema = z.object({
    text : z.string(),
    userId : z.string(),
    lessonId : z.string()
})

export const commentValidation = {
    commentSchema
}