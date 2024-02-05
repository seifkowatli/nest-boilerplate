import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FileTypes, Entities } from './upload.enum';

export type UploadDocument = HydratedDocument<Upload>;

@Schema()
export class Upload {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  path: string;

  @Prop({
    isRequired: true,
    //TODO add  [enum : FileTypes] for extra validation before adding the record to the db
  })
  type: string;

  @Prop({ isRequired: true, enum: Entities })
  entity: string; //TODO try to come up with better name for this property
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
