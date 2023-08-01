import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Transaction } from "../entity/Transaction.entity";

export const readAllTransactionsService = async (): Promise<Transaction[]> => {
    
    const transactionRepo: Repository<Transaction> = AppDataSource.getRepository(Transaction)

    const transactions: Transaction[] = await transactionRepo.find()
    
    return transactions
}