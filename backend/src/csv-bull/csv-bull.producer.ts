import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as csvtojson from 'csvtojson';
import {
  InvalidLeadDataError,
  validateLeadData,
} from './repository/csv-bull.repository.factory';

@Injectable()
export class CreateCSVProducer {
  constructor(@InjectQueue('create-csv') private createCSVQueue: Queue) {}

  async createdCSVFromBuffer(file: Buffer): Promise<void> {
    try {
      const csvData = file.toString('utf-8');
      const jsonArray = await csvtojson().fromString(csvData);

      jsonArray.forEach((lead) => {
        validateLeadData(lead);
      });
      await this.createCSVQueue.add({
        file: csvData,
      });
    } catch (error) {
      if (error instanceof InvalidLeadDataError) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: error.message },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Erro inesperado',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
