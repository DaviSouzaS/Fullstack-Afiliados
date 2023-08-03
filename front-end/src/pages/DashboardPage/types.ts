export interface iTransaction {
    id: number,
    transaction_type: string,
    transaction_description: string,
    transaction_nature: string,
    date: string,
    product: string,
    value: string,
    seller: string
}