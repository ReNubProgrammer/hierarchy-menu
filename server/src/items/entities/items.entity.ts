import { GlobalEntity } from "src/_db/global.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { ItemChild } from "./items-child.entity";

@Entity()
export class Item extends GlobalEntity<Item>{
    @Column()
    name: string;

    @OneToMany(()=>Item, item=>item.name, {cascade:true, onDelete:'CASCADE'})
    child: ItemChild[];
}