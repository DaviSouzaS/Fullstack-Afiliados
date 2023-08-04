import { iTransactionLine } from "./type";

export const TransactionLine = ({transaction}: iTransactionLine) => {

    const transactionNature = transaction.transaction_nature === "Entrada" ? "Entrada (+)" : "Saída (-)"

    const transactionValue = (parseInt(transaction.value) * 1) / 100

    const date = new Date(transaction.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const completeDate = day + '/' + month + '/' + year;
    
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const completeHour = hour + ":" + minute + ":" + seconds


    return (
        <tr>
            <td className="border-[1px] border-black">{transaction.id}</td>
            <td className="border-[1px] border-black">{transaction.transaction_description}</td>
            <td className="border-[1px] border-black">{transactionNature}</td>
            <td className="border-[1px] border-black">{completeDate} - {completeHour}</td>
            <td className="border-[1px] border-black">{transaction.product}</td>
            <td className="border-[1px] border-black">R$ {transactionValue}</td>
            <td className="border-[1px] border-black">{transaction.seller}</td>
        </tr>
    )
}