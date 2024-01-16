import { PredefinedDataRepository } from './predefined-data.repository';
import { Injectable } from '@nestjs/common';
import { CreatePredefinedDatumDto } from './dto/create-predefined-datum.dto';
import { UpdatePredefinedDatumDto } from './dto/update-predefined-datum.dto';
import { PredefinedData } from './schemas/predefined-data.schema';
import { PredefinedDataFilters } from './schemas/predefined-data.interfaces';

@Injectable()
export class PredefinedDataService {
  constructor(
    private readonly predefinedDataRepository: PredefinedDataRepository,
  ) {}

  create(
    createPredefinedDatumDto: CreatePredefinedDatumDto,
  ): Promise<PredefinedData> {
    return this.predefinedDataRepository.create(createPredefinedDatumDto);
  }

  findAll(query: PredefinedDataFilters): Promise<PredefinedData[]> {
    return this.predefinedDataRepository.find(query);
  }


  findAllTypes(): Promise<string[]> {
    return this.predefinedDataRepository.findDistinct('type');
  }
  

  findOne(id: string): Promise<PredefinedData> {
    return this.predefinedDataRepository.findOne({ _id: id });
  }

  update(
    id: string,
    updatePredefinedDatumDto: UpdatePredefinedDatumDto,
  ): Promise<PredefinedData> {
    return this.predefinedDataRepository.findOneAndUpdate(
      { _id: id },
      updatePredefinedDatumDto,
    );
  }

  remove(id: string): Promise<number> {
    return this.predefinedDataRepository.deleteMany({ _id: id });
  }
}
