import { z } from "zod";

const commentSchema = z.object({
    text : z.string().min(1, { message: "Text is required" }),
    userId : z.string().min(1, { message: "User _id is required" }),
    lessonId : z.string().min(1, { message: "Lesson _id is required" })
})

export const commentValidation = {
    commentSchema
}