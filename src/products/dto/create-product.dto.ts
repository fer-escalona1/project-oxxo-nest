import { Provider } from "src/provider/entities/provider.entity";
import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import {Product} from "../entities/product.entity";

export class CreateProductDto {
    @IsUUID("4")
    @IsOptional()
    id: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID()
    provider: Provider;
}
