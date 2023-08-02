import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Transaction } from "../entity/Transaction.entity";
import { AppError } from "../error";

export const readAllTransactionsService = async (): Promise<Transaction[]> => {
    
    const transactionRepo: Repository<Transaction> = AppDataSource.getRepository(Transaction)

    const transactions: Transaction[] = await transactionRepo.find()
    
    if (transactions.length === 0) {
        throw new AppError("Transactions not found", 404)
    }

    return transactions
}