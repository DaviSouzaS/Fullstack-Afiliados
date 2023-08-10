import { Router } from "express";
import { createTransactionController } from "../controllers/createTransaction.controller";
import multer from "multer";
import { validateToken } from "../middlewares/validateToken.middleware";
import { readAllTransactionsController } from "../controllers/readAllTransactions.controller";
import { ensureArchiveIsTxt } from "../middlewares/ensureArchiveIsTxt.middleware";
import { ensureArchiveIsValidTxt } from "../middlewares/ensureArchiveIsValidTxt.middleware";

export const transactionsRouter = Router()

const upload = multer({ dest: 'uploads/' });

transactionsRouter.post("/", upload.single("file"), ensureArchiveIsTxt, ensureArchiveIsValidTxt, validateToken, createTransactionController)
transactionsRouter.get("/", validateToken, readAllTransactionsController)