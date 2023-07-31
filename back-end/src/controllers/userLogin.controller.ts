import { Request, Response } from "express"
import { iLoginUser, iUserLoginReturn } from "../interfaces/user.interfaces"
import { loginUserService } from "../services/loginUser.service"

export const loginUserController = async (request: Request, response: Response): Promise<Response> => {

    const loginData: iLoginUser = request.body

    const userLoginReturn: iUserLoginReturn = await loginUserService(loginData)

    return response.status(200).json(userLoginReturn)
}