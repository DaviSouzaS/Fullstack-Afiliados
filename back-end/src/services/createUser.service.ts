import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User.entity";
import { iCreateUser } from "../interfaces/user.interfaces";

export const createUserService = async (payload: iCreateUser): Promise<User> => {
    
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user: User = userRepo.create(payload)

    await userRepo.save(user)
    
    return user
}