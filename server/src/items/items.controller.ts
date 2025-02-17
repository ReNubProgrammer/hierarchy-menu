import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { ItemChild } from './schemas/items-child.schema';
import { UpdateItemChildtDto, UpdateItemtDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsSercive: ItemsService) { }

  //Create Parent
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsSercive.createAnItem(createItemDto);
  }

  //Get All
  @Get()
  async getAll() {
    return this.itemsSercive.findAllItems();
  }

  //Get One
  @Get('/:itemId')
  async getOneById(@Param('itemId') itemId: string) {
    return this.itemsSercive.findItemById(itemId);
  }

  //Update Parent
  @Patch('/update/:itemId')
  @UsePipes(new ValidationPipe())
  updateItem(@Body() updateItemDto: UpdateItemtDto, @Param('itemId') itemId: string) {
    return this.itemsSercive.updateItem(itemId, updateItemDto);
  }

  //Update Child Name
  @Patch('/update/:parentId/:childId')
  @UsePipes(new ValidationPipe())
  async updateChildName(
    @Param('parentId') parentId: string,
    @Param('childId') childId: string,
    @Body() updateChildNameDto: UpdateItemChildtDto
  ) {
    return this.itemsSercive.updateChildName(parentId, childId, updateChildNameDto.name);
  }

  //Delete Parent
  @Delete('/remove/:itemId')
  deleteItem(@Param('itemId') itemId: string) {
    return this.itemsSercive.deleteItem(itemId);
  }

}