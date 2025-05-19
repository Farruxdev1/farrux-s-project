
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../../transaction/entity/transaction.entity";
import * as bcrypt from 'bcrypt'
import { Role } from "src/auth/enum/role.enum";


@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string
    // {unique:true, type:'varchar'}
    @Column({unique:true, type:'varchar'})
    email:string

    @Column()
    password: string


@Column({
    type: 'enum',
    enum: Role,
    default:Role.ADMIN
})
role:Role


    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transaction: Transaction[]

    @CreateDateColumn()
    createdAt: Date
      
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,4)
    }
}