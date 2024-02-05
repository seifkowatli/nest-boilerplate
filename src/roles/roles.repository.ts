import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesRepository extends EntityRepository<RoleDocument> {
  constructor(@InjectModel(Role.name) roleModel: Model<RoleDocument>) {
    super(roleModel);
  }
}
