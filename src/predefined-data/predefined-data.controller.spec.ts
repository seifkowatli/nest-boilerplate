import { Test, TestingModule } from '@nestjs/testing';
import { PredefinedDataController } from './predefined-data.controller';
import { PredefinedDataService } from './predefined-data.service';

describe('PredefinedDataController', () => {
  let controller: PredefinedDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredefinedDataController],
      providers: [PredefinedDataService],
    }).compile();

    controller = module.get<PredefinedDataController>(PredefinedDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
