import { Test, TestingModule } from '@nestjs/testing';
import { PredefinedDataService } from './predefined-data.service';

describe('PredefinedDataService', () => {
  let service: PredefinedDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredefinedDataService],
    }).compile();

    service = module.get<PredefinedDataService>(PredefinedDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
