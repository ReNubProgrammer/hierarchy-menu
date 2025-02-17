import { Controller, Get, Post, Body, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { ObjectId } from 'typeorm';
import { ItemChild } from './entities/items-child.entity';
import { CreateItemChildDto } from './dto/create-item-child.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsSercive: ItemsService) { }

  //Create Parent
  @Post('create')
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsSercive.createItem(createItemDto);
  }

  //Create Child
  @Post(':itemId/add-child')
  async createChild(
    @Param('itemId') itemId: string,
    @Body() itemChildData: CreateItemChildDto
  ) {
    try {
      const newChild = await this.itemsSercive.createItemChild(itemId, itemChildData);
      return newChild;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new NotFoundException(`Error creating new child for product ${itemId}`)
      }
    }
  }

  //Get One
  @Get('/view/:itemId')
  async findOne(@Param('itemId') itemId: string) {
    return this.itemsSercive.findItemById(itemId);
  }

  //Get All
  @Get('all')
  async findAll() {
    return this.itemsSercive.findAllItems();
  }
}