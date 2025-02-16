import { GlobalEntity } from "src/_db/global.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Item extends GlobalEntity<Item>{
    @Column()
    name: string;

    @Column()
    description: string;
}