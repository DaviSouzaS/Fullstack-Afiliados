import { createUserSchema, returnUserSchema } from "../schemas/createUser.schema";
import { loginUserSchema } from "../schemas/loginClient.schema";
import { z } from "zod";

type iCreateUser = z.infer<typeof createUserSchema>

type iReturnUser = z.infer<typeof returnUserSchema>

type iLoginUser = z.infer<typeof loginUserSchema>

type iUserLoginReturn = {
    id: number,
    name: string,
    email: string,
    token: string
}

export {
    iCreateUser,
    iReturnUser,
    iLoginUser,
    iUserLoginReturn
}