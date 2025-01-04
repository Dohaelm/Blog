import { object, string } from "zod"
 
export const signInSchema = object({
    name:string({required_error:"Name is required"}).min(2,"Name should at least contain 2 characters."),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(2, "Password must be more than 2 characters")
    .max(32, "Password must be less than 32 characters"),
})