import { HttpException, Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { Item } from "./schemas/items.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ItemChild } from "./schemas/items-child.schema";

@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name)
        private itemsRepository: Model<Item>,
        @InjectModel(ItemChild.name)
        private itemChildRepository: Model<ItemChild>
    ) { }

    async createAnItem({ child, ...createItemDto }: CreateItemDto) {
        try {
            if (child) {
                const newChild = new this.itemChildRepository(child);
                const savedNewChild = await newChild.save();
                const newItem = new this.itemsRepository({ ...createItemDto, child: savedNewChild._id });
                return newItem.save();
            }
        } catch (error) {
            return new Error("Method not implemented.");
        }
    }

    //Update Parent
    async updateItem(id: string, updateItemDto: CreateItemDto) {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid ID', 400);
            }
            const item = await this.itemsRepository.findByIdAndUpdate(id, updateItemDto, { new: true });
            if (!item) {
                throw new HttpException('Item with ID not found', 404);
            }
            return new HttpException('Item updated successfully', 200);
        } catch (error) {
            return new Error("Method not implemented.");
        }
    }

    //Update Child
    async updateChildName(parentId: string, childId: string, newName: string) {
        try {
            const isValidParentId = mongoose.Types.ObjectId.isValid(parentId);
            const isValidChildId = mongoose.Types.ObjectId.isValid(childId);
            if (!isValidParentId || !isValidChildId) {
                throw new HttpException('Invalid ID', 400);
            }

            const parentItem = await this.itemsRepository.findById(parentId).populate('child');
            if (!parentItem) {
                throw new HttpException('Parent item with ID not found', 404);
            }

            const childItem = await this.itemChildRepository.findById(childId);
            if (!childItem) {
                throw new HttpException('Child item with ID not found', 404);
            }

            childItem.name = newName;
            await childItem.save();

            return new HttpException('Child item name updated successfully', 200);
        } catch (error) {
            return new Error("Method not implemented.");
        }
    }

    //Get All
    async findAllItems() {
        return this.itemsRepository.find({
            relations: { child: true }
        }).populate('child');
    }

    //Get One
    async findItemById(id: string) {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid ID', 400);
            }
            const item = await this.itemsRepository.findById(id).populate('child');
            if (!item) {
                throw new HttpException('Item with ID not found', 404);
            }
            return item;
        } catch (error) {
            return new Error("Method not implemented.");
        }
    }

    //Remove Parent
    async deleteItem(id: string) {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException('Invalid ID', 400);
            }
            const item = await this.itemsRepository.findByIdAndDelete(id);
            if (!item) {
                throw new HttpException('Item with ID not found', 404);
            }
            return new HttpException('Item deleted successfully', 200);

        } catch (error) {
            return new Error("Method not implemented.");
        }
    }

    //     //Remove Child
    //     async removeChild(id: string) {
    //     await this.itemChildRepository.delete(id);
    // }
}