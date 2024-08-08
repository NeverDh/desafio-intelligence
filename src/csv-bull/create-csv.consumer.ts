import { Process, Processor } from '@nestjs/bull';
import * as csvtojson from 'csvtojson';
import { CreateCSVRepository } from './csv-bull.repository';

@Processor('create-csv')
export class CreateCSVConsumer {
  constructor(private readonly creatCSVRepository: CreateCSVRepository) {}
  @Process()
  async createCSV() {
    const leads: LeadsType[] = [];
    try {
      await csvtojson()
        .fromFile('./src/dados_teste.csv')
        .then((jsonObject) => {
          jsonObject.forEach((lead) => {
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
        });
      await this.creatCSVRepository.create(leads);
    } catch (e) {
      console.log(e);
    }
  }
}

export type LeadsType = {
  nome: string;
  data_nascimento: Date;
  genero: string;
  nacionalidade: string;
  data_criacao: Date;
  data_atualizacao: Date;
};

function parseDateToISOString(dateString: string) {
  // Divide a string em partes: dia, mês e ano
  const [day, month, year] = dateString.split('/').map(Number);

  // Cria um objeto Date. Lembre-se de que o mês em JavaScript é baseado em zero, então subtraímos 1 do mês.
  const date = new Date(year, month - 1, day);

  return date;
}
