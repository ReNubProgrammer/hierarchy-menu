import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ItemChildDocument = HydratedDocument<ItemChild>

@Schema()
export class ItemChild {
    @Prop({required: true})
    name: string;
}

export const ItemChildSchema = SchemaFactory.createForClass(ItemChild);