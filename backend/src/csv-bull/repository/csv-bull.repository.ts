/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaService } from 'src/prisma/prisma.service';


export class CreateCSVRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: any[]) {
    const datas = await this.prisma.leads.createMany({
      data,
    });

    data.map(async (data, index) => {
      data.idLead = (index * Math.random()).toString();
      data.status = 'created';
      await this.prisma.historyLeads.create({ data });
    });

    return datas;
  }
}
