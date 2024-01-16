import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePredefinedDatumDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    label : string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    value : string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type : string;

}
