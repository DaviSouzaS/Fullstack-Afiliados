import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.entity"
import { Transaction } from "./entity/Transaction.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "my_user",
    password: "my_password",
    database: "afiliados-db",
    synchronize: true,
    logging: false,
    entities: [User, Transaction],
    migrations: [],
    subscribers: [],
})
