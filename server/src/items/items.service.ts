import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { ObjectId, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from "./entities/items.entity";
import { ItemChild } from "./entities/items-child.entity";
import { CreateItemChildDto } from "./dto/create-item-child.dto";
import { ObjectId as MongoObjectId } from "mongodb";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
        @InjectRepository(ItemChild)
        private itemChildRepository: Repository<ItemChild>
    ) { }

    //Get All
    async findAllItems() {
        return this.itemsRepository.find({
            relations: { child: true }
        });
    }

    //Get One
    async findItemById(_id: string) {
        var id = new MongoObjectId(_id);
        const product = await this.itemsRepository.findOne({
            where: { _id: id },
            relations: { child: true }
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${_id} not found`);
        }
        return product;
    }

    //Create Parent
    async createItem(createItemDto: CreateItemDto): Promise<Item> {
        try {
            const item = new Item({
                ...createItemDto
            });
            return this.itemsRepository.save(item);
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }    
    
    //Create Child
    async createItemChild(_id: string, itemChildData: CreateItemChildDto) {
        try {
            const item = await this.findItemById(_id);

                if(item) {
                    await this.itemsRepository.save(item);
        } else {
            throw new NotFoundException(`Item with ID ${_id} not found`);
        }

        const newChild = await this.itemsRepository.save({
            ...itemChildData,
            item: item
        })

        return `Success add ${newChild.name} to ${item?.name}`;
    } catch(error) {
        throw new NotFoundException(error.message);
    }
}

    //Update Parent
    async updateItem(_id: string, updateItemDto: CreateItemDto) {
    try {
        const item = await this.findItemById(_id);
        item.name = updateItemDto.name;
        await this.itemsRepository.save(item);
    } catch (error) {
        return error
    }
}

    //Update Child
    async updateChild(_id: string, childId: ObjectId, updateItemChild: Partial<ItemChild>) {
    try {
        const item = await this.findItemById(_id);
        if (!item) {
            throw new NotFoundException(`Item with ID ${_id} not found`);
        }

        const child = item.child.find(child => child._id == childId);
        if (child) {
            Object.assign(child, updateItemChild);
            return this.itemChildRepository.save(child);
        } else {
            throw new NotFoundException(`Child with ID ${childId} not found`);
        }
    } catch (error) {
        return error
    }
}

    //Remove Parent
    async removeItem(id: string) {
    await this.itemsRepository.delete(id);
}

    //Remove Child
    async removeChild(id: string) {
    await this.itemChildRepository.delete(id);
}
}