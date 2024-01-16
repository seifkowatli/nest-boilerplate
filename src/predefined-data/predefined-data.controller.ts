import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permission } from 'src/permissions/permission.enum';
import { Permissions } from 'src/permissions/permissions.decorater';
import { CreatePredefinedDatumDto } from './dto/create-predefined-datum.dto';
import { UpdatePredefinedDatumDto } from './dto/update-predefined-datum.dto';
import { PredefinedDataService } from './predefined-data.service';
import { PredefinedData } from './schemas/predefined-data.schema';
import { PredefinedDataFilters } from './schemas/predefined-data.interfaces';

@ApiBearerAuth()
@ApiTags('Predefined Data')
@Controller('predefined-data')
export class PredefinedDataController {
  constructor(private readonly predefinedDataService: PredefinedDataService) {}

  @UseGuards(JwtAuthGuard)
  @Permissions(Permission.PREDEFINED_DATA_CREATE)
  @Post()
  create(
    @Body() createPredefinedDatumDto: CreatePredefinedDatumDto,
  ): Promise<PredefinedData> {
    return this.predefinedDataService.create(createPredefinedDatumDto);
  }

  @Get()
  findAll(@Query() query : PredefinedDataFilters): Promise<PredefinedData[]> {
    return this.predefinedDataService.findAll(query);
  }

  @Get('types')
  findAllTypes(): Promise<string[]> {
    return this.predefinedDataService.findAllTypes();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PredefinedData> {
    return this.predefinedDataService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Permissions(Permission.PREDEFINED_DATA_UPDATE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredefinedDatumDto: UpdatePredefinedDatumDto,
  ): Promise<PredefinedData> {
    return this.predefinedDataService.update(id, updatePredefinedDatumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(Permission.PREDEFINED_DATA_DELETE)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.predefinedDataService.remove(id);
  }
}
