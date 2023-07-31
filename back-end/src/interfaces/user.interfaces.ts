import { createUserSchema, returnUserSchema } from "../schemas/createUser.schema";
import { z } from "zod";

type iCreateUser = z.infer<typeof createUserSchema>

type iReturnUser = z.infer<typeof returnUserSchema>

export {
    iCreateUser,
    iReturnUser
}