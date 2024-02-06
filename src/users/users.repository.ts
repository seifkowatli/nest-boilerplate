import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@Inject(`${User.name}_MODEL`) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
