/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterLeadDto } from '../dto/pagination-filter.dto';
import { LeadsRequestHandlerService } from './leads.request-handler.service';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private readonly leadRequestHandlerService: LeadsRequestHandlerService,
  ) {}
  async create(data: CreateLeadDto) {
    return this.prisma.leads.create({ data });
  }

  findAll(filter?: FilterLeadDto) {
    const skip = filter?.skip ? parseInt(filter.skip) : undefined;
    const take = filter?.take ? parseInt(filter.take) : undefined;
    const where = this.leadRequestHandlerService.buildWhere(filter || {});

    return this.prisma.leads.findMany({
      ...(skip !== undefined ? { skip: skip * (take ?? 25) } : {}),
      ...(take !== undefined ? { take } : {}),
      ...(Object.keys(where).length > 0 ? { where } : {}),
    });
  }

  findById(id: string) {
    return this.prisma.leads.findUnique({ where: { id: id } });
  }

  update(id: string, updateLeadDto: UpdateLeadDto) {
    return this.prisma.leads.update({
      where: { id },
      data: {
        ...updateLeadDto,
        data_atualizacao: new Date(),
      },
    });
  }
}
