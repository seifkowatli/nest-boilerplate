import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import {
  PredefinedData,
  PredefinedDataDocument,
} from './schemas/predefined-data.schema';

@Injectable()
export class PredefinedDataRepository extends EntityRepository<PredefinedDataDocument> {
  constructor(
    @Inject(`${PredefinedData.name}_MODEL`)  
    predefinedDataModel: Model<PredefinedDataDocument>,
  ) {
    super(predefinedDataModel);
  }
}
