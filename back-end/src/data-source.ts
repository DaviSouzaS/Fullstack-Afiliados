import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.entity";
import { Transaction } from "./entity/Transaction.entity";
import 'dotenv/config';

const host: string | undefined = process.env.DB_HOST
const port: string | undefined = process.env.DB_PORT
const user: string | undefined = process.env.DB_USER
const password: string | undefined = process.env.DB_PASSWORD
const database: string | undefined = process.env.DB_NAME

if (!host || !port || !user || !password || !database) throw new Error("Missing env variables")

export const AppDataSource = new DataSource({
    type: "mysql",
    host: host,
    port: parseInt(port),
    username: user,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [User, Transaction],
    migrations: [],
    subscribers: [],
})
