import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordRequestDto {
    @ApiProperty()    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email : string;
}
