import { Request, Response } from "express";
import { createTransactionService } from "../services/createTransaction.service";
import fs from 'fs';

export const createTransactionController =  async (request: Request, response: Response): Promise<Response | undefined> => {

   if (!request.file) {
        return response.status(400).json({ error: 'No files sent.' })
    } 

    const filePath = request.file.path;

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            return response.status(500).json({ error: 'Error reading the file.' });
        }

        await createTransactionService(data)

        return response.status(201).json({message: 'transactions saved to database successfully'})
    })
}