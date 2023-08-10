import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entity/User.entity";
import { Transaction } from "./entity/Transaction.entity";
import 'dotenv/config';

const dataSourceConfig = (): DataSourceOptions => { 

    const host: string | undefined = process.env.DB_HOST
    const port: string | undefined = process.env.DB_PORT
    const user: string | undefined = process.env.DB_USER
    const password: string | undefined = process.env.DB_PASSWORD
    const database: string | undefined = process.env.DB_NAME
    const nodeEnv: string | undefined = process.env.NODE_ENV

    if (!host || !port || !user || !password || !database) throw new Error("Missing env variables")

    if(nodeEnv === 'test'){
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [User, Transaction]
        }
    }

    return {
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
        subscribers: []
    }
}

export const AppDataSource = new DataSource(dataSourceConfig())
