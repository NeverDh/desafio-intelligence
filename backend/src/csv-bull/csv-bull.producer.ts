import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CreateCSVProducer {
  constructor(@InjectQueue('create-csv') private createCSVQueue: Queue) {}

  async createdCSVFromBuffer(file: Buffer) {
    await this.createCSVQueue.add({
      file: file.toString('utf-8'), // Converter o buffer para string
    });
    return {
      message: 'Arquivo adicionado à fila para processamento no metoto post.',
    };
  }
}
