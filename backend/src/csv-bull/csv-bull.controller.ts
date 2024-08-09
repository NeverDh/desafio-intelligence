import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCSVProducer } from './csv-bull.producer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('csv-bull')
@Controller('csv-bull')
export class CsvBullController {
  constructor(private readonly createCSVProducer: CreateCSVProducer) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async postCSV(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'Nenhum arquivo enviado.' };
    }
    return this.createCSVProducer.createdCSVFromBuffer(file.buffer);
  }
}
