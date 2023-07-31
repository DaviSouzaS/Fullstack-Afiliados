import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(127),
    password: z.string().max(255).min(8)
})

const returnUserSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(127),
    password: z.string().max(255).min(8).optional()
})

export {
    createUserSchema,
    returnUserSchema
}