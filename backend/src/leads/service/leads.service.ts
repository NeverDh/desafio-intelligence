/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HistoryLeadsService } from '../history-leads/history-leads.service';
import { FilterLeadDto } from '../dto/pagination-filter.dto';
import { LeadsRequestHandlerService } from './leads.request-handler.service';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private readonly leadRequestHandlerService: LeadsRequestHandlerService,
    private readonly historyLeadsService: HistoryLeadsService,
  ) {}
  async create(data: CreateLeadDto) {
    const newLead = await this.prisma.leads.create({ data });
    const historyLead = await this.historyLeadsService.create({ idLead: newLead.id, ...newLead, });
    console.log(historyLead);
    return newLead;
  }

  findAll(filter?: FilterLeadDto) {
    const skip = filter?.skip ? parseInt(filter.skip) : undefined;
    const take = filter?.take ? parseInt(filter.take) : undefined;
    const where = this.leadRequestHandlerService.buildWhere(filter || {});

    return this.prisma.leads.findMany({
      ...(skip !== undefined ? { skip: skip * (take ?? 10) } : {}),
      ...(take !== undefined ? { take } : {}),
      ...(Object.keys(where).length > 0 ? { where } : {}),
      orderBy: {
        data_atualizacao: 'desc',
      },
    });
  }

  findAllQuery() {
    return this.prisma.leads.aggregate({
      _count: true,
    });
  }

  findById(id: string) {
    return this.prisma.leads.findUnique({ where: { id: id } });
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const updatedLead = await this.prisma.leads.update({
      where: { id },
      data: {
        ...updateLeadDto,
        data_atualizacao: new Date(),
      },
    });
    const historyLead = await this.historyLeadsService.update(updateLeadDto);
    console.log(historyLead);
    return updatedLead;
  }
}
