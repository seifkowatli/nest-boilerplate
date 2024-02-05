import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { type } from 'os';
import { Translatable } from 'src/database/interfaces';
import { Permission } from 'src/permissions/permission.enum';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({
    type: Object,
    default: { en: '', ar: '' },
  })
  title: Translatable<string>;

  @Prop({
    type: Boolean,
    default: true,
  })
  is_editable: boolean;

  @Prop({
    type: [String],
    enum: Permission,
    required: true,
  })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
