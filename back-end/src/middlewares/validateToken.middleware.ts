import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const validateToken = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    
    const authToken: string | undefined = request.headers.authorization

    if (!authToken) {
        throw new AppError('Missing bearer token', 401);
    }

    const token: string = authToken.split(' ')[1];

    jwt.verify(
        token,
        process.env.SECRET_KEY!,
        (error, decoded: any) => {
            if (error) {
                throw new AppError(error.message, 401)
            }

            request.user = {
                id: decoded.sub
            }
            
            return next()
        }
    )
}   