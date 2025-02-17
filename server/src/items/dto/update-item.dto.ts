import { Type } from 'class-transformer';
import { CreateItemDto } from './create-item.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateItemChildtDto{
    @IsOptional()
    @IsString()
    name: string;
}

export class UpdateItemtDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @Type(() => UpdateItemChildtDto)
    child: CreateItemDto[];
}