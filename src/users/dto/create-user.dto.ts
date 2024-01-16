import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator';
import { Gender } from '../schemas/user.enums';


//TODO add roles
export class CreateUserDto {
  @ApiProperty()
  @IsObject()
  @IsOptional()
  readonly avatar ?: Record<string, unknown>;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  readonly gender : Gender;
 
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly roles: string[];
  
}
