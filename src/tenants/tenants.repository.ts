import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Tenant, TenantDocument } from './schemas/tenants.schema';


@Injectable()
export class TenantsRepository extends EntityRepository<TenantDocument> {
  constructor(
    @InjectModel(Tenant.name)
    TenantsModel: Model<TenantDocument>,
  ) {
    super(TenantsModel);
  }
}
