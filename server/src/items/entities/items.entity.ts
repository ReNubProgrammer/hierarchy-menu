import { GlobalEntity } from "src/_db/global.entity";
import { ItemChild } from "./items-child.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Item extends GlobalEntity<Item>{
    @Prop({unique: true, required: true})
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ItemChild'})
    child: ItemChild[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);