/* eslint-disable @typescript-eslint/no-explicit-any */
import { Process, Processor } from '@nestjs/bull';
import * as csvtojson from 'csvtojson';
import { CreateCSVRepository } from './csv-bull.repository';
import { LeadsDTO } from './dto/csv-bull.dto';

@Processor('create-csv')
export class CreateCSVConsumer {
  constructor(private readonly createCSVRepository: CreateCSVRepository) {}

  @Process()
  async createCSV(job: any) {
    const leads: LeadsDTO[] = [];
    try {
      const csvData = job.data.file; // Obtém o arquivo CSV do job

      const jsonArray = await csvtojson().fromString(csvData); // Converte CSV em JSON

      jsonArray.forEach((lead) => {
        leads.push({
          nome: lead['nome'],
          data_nascimento: new Date(
            parseDateToISOString(lead['data_nascimento']),
          ),
          genero: lead['genero'],
          nacionalidade: lead['nacionalidade'],
          data_criacao: new Date(lead['data_criacao']),
          data_atualizacao: new Date(lead['data_atualizacao']),
        });
      });
      return await this.createCSVRepository.create(leads);
    } catch (e) {
      console.log(e);
    }
  }
}

function parseDateToISOString(dateString: string) {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toISOString();
}
