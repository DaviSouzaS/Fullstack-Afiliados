interface iTransaction {
    transaction_type: string
    transaction_description: "Venda produtor" | "Venda afiliado" | "Comissão paga" | "Comissão recebida"
    transaction_nature: "Entrada" | "Saída"
    date: string
    product: string
    value: string
    seller: string
}

export {
    iTransaction
}