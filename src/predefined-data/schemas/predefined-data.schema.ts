import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PredefinedDataDocument = HydratedDocument<PredefinedData>;

@Schema({ timestamps: true })
export class PredefinedData {
  @Prop({
    required: true,
    type: String,
  })
  label: string;

  @Prop({
    type: String,
    required: true,
  })
  value: string;

  @Prop({
    required: true,
    type: String,
  })
  type: string;
}

export const PredefinedDataSchema =
  SchemaFactory.createForClass(PredefinedData);
