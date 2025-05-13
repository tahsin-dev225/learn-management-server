import { z } from "zod";

const createValidation = z.object({
    courseId : z.string(),
    email : z.string(),
    price : z.number()
})

export const enrolledValidation = {
    createValidation
}