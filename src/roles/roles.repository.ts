import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesRepository extends EntityRepository<RoleDocument> {
  constructor(@Inject(`${Role.name}_MODEL`) roleModel: Model<RoleDocument>) {
    super(roleModel);
  }
}
