import { TenantsRepository } from './tenants.repository';
import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './schemas/tenants.schema';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository :  TenantsRepository) {}

  create(createTenantDto: CreateTenantDto) : Promise<Tenant> {
    return this.tenantsRepository.create(createTenantDto);
  }

  findAll() : Promise<Tenant[]> {
    return this.tenantsRepository.find({})
  }

  findByName(name: string) : Promise<Tenant> {
    return this.tenantsRepository.findOne({name})
  }

  findOne(id: string) : Promise<Tenant> {
    return this.tenantsRepository.findOne({ _id: id });
  }

  update(id: string, updateTenantDto: UpdateTenantDto) : Promise<Tenant> {
    return this.tenantsRepository.findOneAndUpdate({ _id: id }, updateTenantDto);
  }

  remove(id: string) : Promise<number> {
    return this.tenantsRepository.deleteMany({ _id: id });
  }
}
