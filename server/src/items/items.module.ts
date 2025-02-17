import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item, ItemSchema } from "./schemas/items.schema";
import { ItemChild, ItemChildSchema } from "./schemas/items-child.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Item.name,
                schema: ItemSchema
            },
            {
                name: ItemChild.name,
                schema: ItemChildSchema
            }
        ]),
    ],
    providers: [ItemsService],
    controllers: [ItemsController],
})
export class ItemsModule { }