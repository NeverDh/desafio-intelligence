/* eslint-disable @typescript-eslint/no-explicit-any */
import { Process, Processor } from '@nestjs/bull';
import * as csvtojson from 'csvtojson';
import { CreateCSVRepository } from './repository/csv-bull.repository';
import { LeadsDTO } from './dto/csv-bull.dto';
import {
  InvalidLeadDataError,
  validateLeadData,
} from './repository/csv-bull.repository.factory';

@Processor('create-csv')
export class CreateCSVConsumer {
  constructor(private readonly createCSVRepository: CreateCSVRepository) {}

  @Process()
  async createCSV(job: any) {
    const leads: LeadsDTO[] = [];
    try {
      const csvData = job.data.file;

      const jsonArray = await csvtojson().fromString(csvData);
      try {
        jsonArray.forEach((lead) => {
          validateLeadData(lead);
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
      } catch (error) {
        if (error instanceof InvalidLeadDataError) {
          console.warn('Dados obrigatórios:', error.message);
        } else {
          console.error('Erro inesperado:', error);
        }
      }
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
