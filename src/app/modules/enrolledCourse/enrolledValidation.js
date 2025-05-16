import { z } from "zod";

const createValidation = z.object({
  courseId: z.string().min(1, { message: "Course ID is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  price: z.number({ invalid_type_error: "Price must be a number" }).min(1, { message: "Price must be at least 1" }),
});

export const enrolledValidation = {
    createValidation
}