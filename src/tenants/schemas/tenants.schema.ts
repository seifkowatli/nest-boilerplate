import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({ timestamps: true })
export class Tenant {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

}

export const TenantSchema =
  SchemaFactory.createForClass(Tenant);
