import { Request, Response } from "express";
import { createTransactionService } from "../services/createTransaction.service";
import fs from 'fs';
import { AppError } from "../error";

export const createTransactionController =  async (request: Request, response: Response): Promise<Response | void> => {

    const filePath = request.file!.path;

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            throw new AppError("Error reading the file.", 500)
        }

        const transactionsList = data.split("\r\n")

        const transactions = await createTransactionService(transactionsList)

        return response.status(201).json(transactions)
    })
}