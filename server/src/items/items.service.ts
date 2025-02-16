import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from "./entities/items.entity";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemsRepository: Repository<Item>,
    ){}

    async createItem(createItemDto: CreateItemDto): Promise<Item>{
        try {
            const item = new Item({
                ...createItemDto
            });
            return this.itemsRepository.save(item);
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }
    async findAllItems(){
        return this.itemsRepository.find();
    }

    async findItemById(id: string){
        const product = await this.itemsRepository.findOne({
            where: {id},
        });
        if(!product){
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async removeItem(id: string){
        await this.itemsRepository.delete(id);
    }
}