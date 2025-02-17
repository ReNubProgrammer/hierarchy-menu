import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";

export class CreateItemChildDto{
    @IsString({message:'Register with the correct typedata'})
    name: string;
}

export class CreateItemDto {
    @IsString({message:'Register with the correct typedata'})
    name: string;

    @ValidateNested()
    @Type(() => CreateItemChildDto)
    child: CreateItemChildDto[];
}