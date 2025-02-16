import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { ObjectId } from 'typeorm';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsSercive: ItemsService ) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto){
    return this.itemsSercive.createItem(createItemDto);
  }

  @Get('item/:itemId')
  async findOne(@Param('itemId') itemId: ObjectId){
    return this.itemsSercive.findItemById(itemId);
  }

  @Get('all')
  async findAll(){
    return this.itemsSercive.findAllItems();
  }
}