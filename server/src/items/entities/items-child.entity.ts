import { Column, Entity, ManyToOne } from "typeorm";
import { Item } from "./items.entity";
import { GlobalEntity } from "src/_db/global.entity";

@Entity()
export class ItemChild extends GlobalEntity {
    @Column()
    name: string;
}