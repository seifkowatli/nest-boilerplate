import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import {
  PredefinedData,
  PredefinedDataDocument,
} from './schemas/predefined-data.schema';

@Injectable()
export class PredefinedDataRepository extends EntityRepository<PredefinedDataDocument> {
  constructor(
    @InjectModel(PredefinedData.name)
    predefinedDataModel: Model<PredefinedDataDocument>,
  ) {
    super(predefinedDataModel);
  }
}
