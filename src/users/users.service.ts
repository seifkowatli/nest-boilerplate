import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import PasswordUtil from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private defaultProjection = { password: 0 };

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersRepository.create({ ...createUserDto });
  }

  findOne(userId: string): Promise<User> {
    return this.usersRepository.findOne(
      { _id: userId },
      this.defaultProjection,
    );
  }

  find(filterQuery: FilterQuery<User>): Promise<User[]> {
    return this.usersRepository.find(filterQuery, this.defaultProjection);
  }

  update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate(
      { _id: userId },
      updateUserDto,
      { roles: 0 },
    );
  }

  isUserExists(email: string): Promise<any> {
    return this.usersRepository.findOne({ email });
  }

  async updatePassword(userId: string, password: string): Promise<boolean> {
    const newPassword = await PasswordUtil.hashPassword(password);
    this.usersRepository.findOneAndUpdate(
      { _id: userId },
      { password: newPassword },
    );

    return true;
  }

  remove(userId: string): Promise<number> {
    return this.usersRepository.deleteMany({ _id: userId });
  }
}
