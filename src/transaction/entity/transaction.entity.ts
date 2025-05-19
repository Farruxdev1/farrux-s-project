import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "src/user/entity/user.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { generate } from "rxjs";

@Entity()
export class Transaction{
    @PrimaryColumn({type: "uuid"})
    @Generated("uuid")
    id: string

    @Column()
    title:string

    @Column({nullable: true})
    type:string

    @ManyToOne(()=> User,(user) => user.transaction)
    @JoinColumn()
    user:User



    @Column()
    amount: number

     @CreateDateColumn()
    createdAt: Date
}