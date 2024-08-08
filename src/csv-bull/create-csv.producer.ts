import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CreateCSVProducer {
  constructor(@InjectQueue('create-csv') private createCSVQueue: Queue) {}
  async createdCSV() {
    await this.createCSVQueue.add({
      title: 'CSV to JSON',
    });
    return {
      message: 'Created CSV Producer',
    };
  }
}
