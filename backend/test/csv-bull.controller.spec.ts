import { Test, TestingModule } from '@nestjs/testing';
import { CsvBullController } from '../src/csv-bull/csv-bull.controller';
import { CsvBullService } from '../src/csv-bull/csv-bull.service';

describe('CsvBullController', () => {
  let controller: CsvBullController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvBullController],
      providers: [CsvBullService],
    }).compile();

    controller = module.get<CsvBullController>(CsvBullController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
