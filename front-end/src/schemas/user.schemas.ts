import { z } from "zod";

const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const  createUserSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(127),
    password: z.string().min(8).max(255),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não correspondem",
    path: ["confirmPassword"],
});

export type iLogin = z.infer<typeof userLoginSchema>

export type iRegister = z.infer<typeof createUserSchema>

export {
    userLoginSchema,
    createUserSchema
}