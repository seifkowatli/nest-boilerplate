import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Upload, UploadDocument } from './schemas/upload.schema';

@Injectable()
export class UploadsRepository extends EntityRepository<UploadDocument> {
  constructor(@Inject(`${Upload.name}_MODEL`) uploadModel: Model<UploadDocument>) {
    super(uploadModel);
  }
}
