import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { Tenant, TenantSchema } from './schemas/tenants.schema';
import { TenantsRepository } from './tenants.repository';
import { TenantConnectionProvider } from './tenants.provider';


@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
    ]),
  ],
  controllers: [TenantsController],
  providers: [TenantsService , TenantsRepository],
  exports: [TenantsService]
})
export class TenantsModule {}

