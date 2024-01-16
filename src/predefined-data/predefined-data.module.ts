import { Module } from '@nestjs/common';
import { PredefinedDataService } from './predefined-data.service';
import { PredefinedDataController } from './predefined-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PredefinedData,
  PredefinedDataSchema,
} from './schemas/predefined-data.schema';
import { PredefinedDataRepository } from './predefined-data.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PredefinedData.name, schema: PredefinedDataSchema },
    ]),
  ],
  controllers: [PredefinedDataController],
  providers: [PredefinedDataService, PredefinedDataRepository],
})
export class PredefinedDataModule {}
