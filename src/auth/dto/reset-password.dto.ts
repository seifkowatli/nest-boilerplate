import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsPasswordValid } from "../password.decorator";


export class ResetPasswordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly token : string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @IsPasswordValid()
    readonly password : string;
    
}
