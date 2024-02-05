import { UploadsRepository } from './uploads.repository';
import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Upload } from './schemas/upload.schema';

@Injectable()
export class UploadsService {
  constructor(private readonly uploadsRepository: UploadsRepository) {}

  create(createUploadDto: CreateUploadDto): Promise<Upload> {
    return this.uploadsRepository.create(createUploadDto);
  }

  findAll(): Promise<Upload[]> {
    return this.uploadsRepository.find({});
  }

  findOne(id: string): Promise<Upload> {
    return this.uploadsRepository.findOne({ _id: id });
  }

  update(id: string, updateUploadDto: UpdateUploadDto): Promise<Upload> {
    return this.uploadsRepository.findOneAndUpdate(
      { _id: id },
      updateUploadDto,
    );
  }

  remove(id: string): Promise<number> {
    return this.uploadsRepository.deleteMany({ _id: id });
  }
}
