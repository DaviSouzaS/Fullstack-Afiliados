import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction.entity";
import { iTransaction } from "../interfaces/transaction.interface";

export const createTransactionService = async (payload: string): Promise<void> => {

    const transactionsList = payload.split("\r\n")

    transactionsList.map(async item => {
        if (item.length > 0) {
            const type = item[0] 
            const date = item.slice(1, 26)
            const product = item.slice(26, 56)
            const value = item.slice(56, 66)
            const seller = item.slice(66, 86)

            const transactionDescription = type === "1" && "Venda produtor" || type === "2" && "Venda afiliado" || type === "3" && "Comissão paga" || type === "4" && "Comissão recebida" || undefined

            const transactionNature = parseInt(type) !== 3  && "Entrada" || parseInt(type) === 3 && "Saída" || undefined

            const transactionBody: iTransaction = {
                transaction_type: type,
                transaction_description: transactionDescription!,
                transaction_nature: transactionNature!,
                date: date,
                product: product,
                value: value,
                seller: seller
            }

            const transactionRepo: Repository<Transaction> = AppDataSource.getRepository(Transaction)
            const transaction: iTransaction = transactionRepo.create(transactionBody)

            await transactionRepo.save(transaction)
        }
    })
}