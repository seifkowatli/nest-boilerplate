import { PartialType } from '@nestjs/mapped-types';
import { Exclude  } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Exclude()
    password: string;
}
