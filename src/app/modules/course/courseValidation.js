import { z } from "zod";


const lessonSchema = z.object({
    video: z.string().url({ message: "Video must be a valid URL" }),
    title: z.string().min(1, { message: "Title is required" }),
    id: z.number().int({ message: "ID must be an integer" })
  });
  
  const courseSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.string().url({ message: "Image must be a valid URL" }),
    category: z.string().min(1, { message: "Category is required" }),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    lessons: z.array(lessonSchema).nonempty({ message: "At least one lesson is required" }),
    creator : z.string().min(1, { message: "Creator is required" })
  });
  
export const courseValidation = {
    courseSchema
}