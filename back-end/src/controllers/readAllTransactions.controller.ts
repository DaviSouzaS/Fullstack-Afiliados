import { Request, Response } from "express";
import { readAllTransactionsService } from "../services/readAllTransactions.service";

export const readAllTransactionsController =  async (request: Request, response: Response): Promise<Response> => {

   const transactions = await readAllTransactionsService()

   return response.status(200).json(transactions)
}