import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transaction")
export class Transaction {
    
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    transaction_type: "1" | "2" | "3" | "4"
    
    @Column()
    transaction_description: "Venda produtor" | "Venda afiliado" | "Comissão paga" | "Comissão recebida"
    
    @Column()
    transaction_nature: "Entrada" | "Saída"
    
    @Column({ type: "datetime" })
    date: string
    
    @Column({ length: 30 })
    product: string
    
    @Column({ length: 10 })
    value: string
    
    @Column({ length: 20 })
    seller: string
}