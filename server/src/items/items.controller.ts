import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsSercive: ItemsService ) {}

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto){
    return this.itemsSercive.createItem(createItemDto);
  }
}