import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';
import { Upload } from 'src/uploads/schemas/upload.schema';
import { Gender, UserStatus } from './user.enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Upload.name,
    autopopulate: true,
  })
  avatar: Upload;

  @ApiProperty()
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  full_name: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.notConfirmed,
  })
  status: UserStatus;

  @ApiProperty()
  @Prop({
    type: String,
    enum: Gender,
    default : Gender.notAvailable
  })
  gender: Gender;

  @ApiProperty()
  @Prop()
  password: string;


  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], ref: Role.name, autopopulate: true , required : true })
  roles: Role[];



}

export const UserSchema = SchemaFactory.createForClass(User);




