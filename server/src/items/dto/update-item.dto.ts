import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { CreateItemChildDto } from './create-item-child.dto';
import { IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/validation/isunique';

export class UpdateProductDto extends PartialType(CreateItemDto) {
    @IsOptional()
    @IsString({message:'Register with the correct typedata'})
    @IsUnique({
        table: 'item',
        column:'name'
    },{message:'Menu already exist. Try another.'})
    name: string;

    childs:CreateItemChildDto[];
}