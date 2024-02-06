import { Module } from '@nestjs/common';
import { createModelProvider } from 'src/tenants/tenants-model.provider';
import { TenantConnectionProvider } from 'src/tenants/tenants.provider';
import { PredefinedDataController } from './predefined-data.controller';
import { PredefinedDataRepository } from './predefined-data.repository';
import { PredefinedDataService } from './predefined-data.service';
import {
  PredefinedData,
  PredefinedDataSchema,
} from './schemas/predefined-data.schema';

@Module({
  controllers: [PredefinedDataController],
  providers: [
    PredefinedDataService,
    PredefinedDataRepository,
    TenantConnectionProvider,
    createModelProvider(PredefinedData.name, PredefinedDataSchema),
  ],
})
export class PredefinedDataModule {}
