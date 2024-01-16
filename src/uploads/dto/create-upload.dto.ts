import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Entities, FileTypes } from '../schemas/upload.enum';

export class CreateUploadDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  path: string;

  @IsNotEmpty()
  @IsEnum(FileTypes)
  @ApiProperty({ enum: FileTypes })
  type: string;

  @IsNotEmpty()
  @ApiProperty({ enum: Entities})
  @IsEnum(Entities)
  entity: string;
}
