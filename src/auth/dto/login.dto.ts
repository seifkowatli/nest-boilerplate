import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsString } from "class-validator";


export class LoginUserDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    readonly username : string;
    
    @ApiProperty()
    @IsString()
    @IsAlphanumeric()
    readonly password : string;
}
