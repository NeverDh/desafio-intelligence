import { Controller, Get } from '@nestjs/common';
import { CreateCSVProducer } from './create-csv.producer';

@Controller('csv-bull')
export class CsvBullController {
  constructor(private readonly createCSVProducer: CreateCSVProducer) {}
  @Get()
  getCSV() {
    return this.createCSVProducer.createdCSV();
  }
}
