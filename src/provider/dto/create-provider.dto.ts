import {IsEmail,IsOptional,IsString, MaxLength, IsEmpty} from "class-validator";
import {Provider} from "../entities/provider.entity";

export class CreateProviderDto extends Provider{
    @IsEmpty()
    declare providerId: string;
    @IsString()
    @MaxLength(100)
    declare providerName: string;
    @IsEmail()
    @IsString()
    declare providerEmail: string;
    @IsString()
    @MaxLength(15)
    @IsOptional()
    declare providerPhoneNumber: string;
}

