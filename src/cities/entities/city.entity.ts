import { generate } from "rxjs";
import { Column, Entity, PrimaryGeneratedColumn,PrimaryColumn, Generated } from "typeorm";

@Entity({ name: 'city'})
export class City {
    @PrimaryColumn({type: "uuid"})
    @Generated("uuid")
    id: string;
    @Column({unique : true})
    name:string

    @Column('text')
    description: string | null
}
