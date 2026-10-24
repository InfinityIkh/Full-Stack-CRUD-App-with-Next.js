import { z } from "zod"

export const UserValidation = z.object({
    username : z.string("user must be a string").min(4 ,"username must contain at least 4 characters").max(20 ,"username must contain at maximum 20 characters"),
    email : z.email("invalid email address"),
})