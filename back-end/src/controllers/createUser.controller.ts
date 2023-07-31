import { Request, Response } from "express";
import { createUserService } from "../services/createUser.service";
import { iReturnUser } from "../interfaces/user.interfaces";

export const createUserController =  async (request: Request, response: Response): Promise<Response> => {

    const user: iReturnUser = await createUserService(request.body)

    delete user.password

    return response.status(201).json(user)
}