import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Permission } from "src/permissions/permission.enum";

export class CreateRoleDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title : string

    //TODO do an extra validation step to check if the provided permissions array is a subset of the global permissions array
    @IsNotEmpty()
    @ApiProperty()
    permissions : Permission[]
}
