import { UploadsRepository } from './uploads.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { Upload, UploadSchema } from './schemas/upload.schema';
import { TenantConnectionProvider } from 'src/tenants/tenants.provider';
import { createModelProvider } from 'src/tenants/tenants-model.provider';

@Module({
  
  controllers: [UploadsController],
  providers: [
    UploadsService , 
    UploadsRepository,
    TenantConnectionProvider,
    createModelProvider(Upload.name, UploadSchema),
  ],
})
export class UploadsModule {}
