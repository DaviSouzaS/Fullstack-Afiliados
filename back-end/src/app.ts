import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { handleErrors } from "./error";
import { userRouter } from "./routes/user.route";
import { transactionsRouter } from "./routes/transactions.route";

const app: Application = express()

app.use(cors())
app.use(express.json())

app.use("/user", userRouter)
app.use("/transaction", transactionsRouter)

app.use(handleErrors)

export default app