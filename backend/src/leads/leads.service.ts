import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PrismaService } from 'src/database/client/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateLeadDto) {
    return this.prisma.leads.create({ data });
  }

  findAll() {
    return this.prisma.leads.findMany();
  }

  findOne(id: number) {
    return id;
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return {id, updateLeadDto};
  }
}
