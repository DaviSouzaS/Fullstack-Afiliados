import { iLoginUser, iUserLoginReturn } from "../interfaces/user.interfaces";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { Repository } from "typeorm";
import { AppError } from "../error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const loginUserService = async (payload: iLoginUser): Promise<iUserLoginReturn> => {
    
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.findOneBy({
        email: payload.email
    })

    if (!user) {
        throw new AppError('Invalid credentials', 401)
    }

    const checkPassword: boolean = await compare(payload.password, user.password)

    if (!checkPassword) {
        throw new AppError('Invalid credentials', 401)
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY!,
        { expiresIn: '24h', subject: String(user.id) }
    )
    
    const userReturn: iUserLoginReturn = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
    }

    return userReturn
}