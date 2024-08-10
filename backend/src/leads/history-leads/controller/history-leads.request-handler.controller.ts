/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { PaginationHistoryLeadDto } from '../dto/pagination.dto'; // Ajuste o caminho conforme necessário

@Injectable()
export class HistoryLeadsRequestHandlerController {
  transformQuery(query: any): PaginationHistoryLeadDto {
    return {
      skip: query.skip,
      take: query.take,
    };
  }
}
