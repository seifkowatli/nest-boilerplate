import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtil } from 'src/utils/files';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Upload } from './schemas/upload.schema';
import { UploadsService } from './uploads.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  //TODO add validation pipes for files
  @Post(':entity')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FileUtil.GeneratePath,
        filename: FileUtil.UniqueName,
      }),
    }),
  )
  async create(
    @Param('entity') entity: string,
    @UploadedFile() file: Express.Multer.File,
  ) {

    const { filename, path, mimetype } = file;
    
    const createUploadDto: CreateUploadDto = {
      name: filename,
      path,
      entity,
      type: mimetype,
    };
    return this.uploadsService.create(createUploadDto);
  }

  @Get()
  findAll(): Promise<Upload[]> {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Upload> {
    return this.uploadsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploadDto: UpdateUploadDto,
  ): Promise<Upload> {
    return this.uploadsService.update(id, updateUploadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    const uploadEntry = await this.uploadsService.findOne(id);
    FileUtil.DeleteFile(uploadEntry.path);
    return this.uploadsService.remove(id);
  }
}
