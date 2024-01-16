import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Upload, UploadDocument } from './schemas/upload.schema';

@Injectable()
export class UploadsRepository extends EntityRepository<UploadDocument> {
  constructor(@InjectModel(Upload.name) uploadModel: Model<UploadDocument>) {
    super(uploadModel);
  }
}
