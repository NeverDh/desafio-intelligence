/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationHistoryLeadDto } from './dto/pagination.dto';

@Injectable()
export class HistoryLeadsService {
  constructor(private prisma: PrismaService) {}
  async create(data: any) {
    const newHistoryLead = await this.prisma.historyLeads.create({
      data: {
        ...data,
        idLead: data.id,
        status: 'created',
      },
    });
    return newHistoryLead;
  }

  async findAll(filter?: PaginationHistoryLeadDto) {
    const skip = filter?.skip ? parseInt(filter.skip) : undefined;
    const take = filter?.take ? parseInt(filter.take) : undefined;

    const teste = await this.prisma.historyLeads.findMany({
      ...(skip !== undefined ? { skip: skip * (take ?? 10) } : {}),
      ...(take !== undefined ? { take } : {}),
      orderBy: {
        data_atualizacao: 'desc',
      },
    });
    return teste;
  }

  findAllQuery() {
    return this.prisma.historyLeads.aggregate({
      _count: true,
    });
  }

  async update(data: any) {
    console.log(data);
    data.idLead = data.id;
    delete data.id;
    const newHistoryLead = await this.prisma.historyLeads.create({
      data: {
        ...data,
        status: 'updated',
      },
    });
    console.log(newHistoryLead, data);
    console.log(newHistoryLead);
    return newHistoryLead;
  }
}
