import { Column, Entity, ManyToOne } from "typeorm";
import { Item } from "./items.entity";
import { GlobalEntity } from "src/_db/global.entity";

@Entity()
export class ItemChild extends GlobalEntity<Item>{
    @Column()
    name: string;

    @ManyToOne(() => Item, items => items.child, {onDelete:'CASCADE'})
    parents: Item;
}