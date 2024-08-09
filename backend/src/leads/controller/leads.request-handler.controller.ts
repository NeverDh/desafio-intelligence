/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { FilterLeadDto } from '../dto/pagination-filter.dto'; // Ajuste o caminho conforme necessário

@Injectable()
export class LeadsRequestHandlerController {
  transformQuery(query: any): FilterLeadDto {
    return {
      skip: query.skip,
      take: query.take,
      filter: {
        nome: query.nome,
        data_nascimento: query.data_nascimento
          ? new Date(query.data_nascimento)
          : undefined,
        data_criacao: query.data_criacao
          ? new Date(query.data_criacao)
          : undefined,
        genero: query.genero,
        nacionalidade: query.nacionalidade,
        data_atualizacao: query.data_atualizacao
          ? new Date(query.data_atualizacao)
          : undefined,
      },
    };
  }
}
