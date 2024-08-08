import { PrismaService } from 'src/database/prisma/client/prisma.service';
import { LeadsType } from './create-csv.consumer';

export class CreateCSVRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: LeadsType[]) {
    await this.prisma.onlineLeads.deleteMany();
    await this.prisma.onlineLeads.createMany({
      data,
    });
  }
}
