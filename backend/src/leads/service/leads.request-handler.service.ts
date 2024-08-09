/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { FilterLeadDto } from '../dto/pagination-filter.dto'; // Ajuste o caminho conforme necessário

@Injectable()
export class LeadsRequestHandlerService {
  buildWhere(filters: FilterLeadDto) {
    const filter = filters.filter;
    const where: any = {};

    if (filter.nome) {
      where.nome = { contains: filter.nome };
    }
    if (filter.genero) {
      where.genero = { contains: filter.genero };
    }
    if (filter.nacionalidade) {
      where.nacionalidade = { contains: filter.nacionalidade };
    }
    if (filter.data_nascimento) {
      where.data_nascimento = { gte: filter.data_nascimento };
    }
    if (filter.data_criacao) {
      where.data_criacao = { gte: filter.data_criacao };
    }
    if (filter.data_atualizacao) {
      where.data_atualizacao = { gte: filter.data_atualizacao };
    }

    return where;
  }
}
