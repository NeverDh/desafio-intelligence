import { Test, TestingModule } from '@nestjs/testing';
import { CsvBullService } from './csv-bull.service';

describe('CsvBullService', () => {
  let service: CsvBullService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvBullService],
    }).compile();

    service = module.get<CsvBullService>(CsvBullService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
