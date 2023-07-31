import { getRounds, hashSync } from "bcryptjs"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"

@Entity("user")
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 127, unique: true })
    email: string

    @Column({ length: 255 })
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isEncrypted = getRounds(this.password)

        if(!isEncrypted){
            this.password = hashSync(this.password, 10)
        }
    }

}
