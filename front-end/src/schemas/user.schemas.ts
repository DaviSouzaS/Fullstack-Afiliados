import { z } from "zod";

const userLoginSchema = z.object({
    email: z.string().email("Deve ser um e-mail válido"),
    password: z.string().nonempty("Senha é obrigatória"),
})

const  createUserSchema = z.object({
    name: z.string().max(50, "O nome deve conter no máximo 50 caracteres").nonempty("O nome é obrigatório"),
    email: z.string().email("Deve ser um e-mail válido").max(127, "O email deve ter no máximo 127 caracteres"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres").max(255, "A senha deve conter no máximo 255 caracteres").nonempty("Senha é obrigatória"),
    confirmPassword: z.string().nonempty("Senha é obrigatória")
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