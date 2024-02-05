import { Module } from '@nestjs/common';
import { PredefinedDataService } from './predefined-data.service';
import { PredefinedDataController } from './predefined-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PredefinedData,
  PredefinedDataSchema,
} from './schemas/predefined-data.schema';
import { PredefinedDataRepository } from './predefined-data.repository';
import { createModelProvider } from 'src/tenants/tenants-model.provider';
import { tenantConnectionProvider } from 'src/tenants/tenants.provider';

@Module({
  // imports: [],
  controllers: [PredefinedDataController  ],
  providers: [
    PredefinedDataService,
    PredefinedDataRepository,
    tenantConnectionProvider,
    createModelProvider(PredefinedData.name, PredefinedDataSchema),
  ],
})
export class PredefinedDataModule {}
