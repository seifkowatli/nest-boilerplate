import { RolesRepository } from './roles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role, RoleSchema } from './schemas/role.schema';
import { TenantConnectionProvider } from 'src/tenants/tenants.provider';
import { createModelProvider } from 'src/tenants/tenants-model.provider';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService, 
    RolesRepository,
    TenantConnectionProvider,
    createModelProvider(Role.name, RoleSchema),
  ],
})
export class RolesModule {}
