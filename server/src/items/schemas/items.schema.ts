import { ItemChild } from "./items-child.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Item {
    @Prop({unique: true, required: true})
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ItemChild'})
    child: ItemChild[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);