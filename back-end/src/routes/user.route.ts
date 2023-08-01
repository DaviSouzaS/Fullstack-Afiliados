import { Router } from "express";
import { createUserController } from "../controllers/createUser.controller";
import { ensureUniqueEmail } from "../middlewares/ensureUniqueEmail.middleware";
import { validateData } from "../middlewares/validateData.middleware";
import { createUserSchema } from "../schemas/createUser.schema";
import { loginUserController } from "../controllers/userLogin.controller";
import { loginUserSchema } from "../schemas/loginClient.schema";

export const userRouter = Router()

userRouter.post("/", validateData(createUserSchema), ensureUniqueEmail, createUserController)
userRouter.post("/login", validateData(loginUserSchema), loginUserController)