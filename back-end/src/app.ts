import "express-async-errors"
import express, { Application } from "express"
import cors from "cors"
import { handleErrors } from "./error"


const app: Application = express()

app.use(cors())
app.use(express.json())

app.use(handleErrors)

export default app