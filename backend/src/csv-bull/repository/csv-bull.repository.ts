import { PrismaService } from 'src/prisma/prisma.service';
import { LeadsDTO } from '../dto/csv-bull.dto';

export class CreateCSVRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: LeadsDTO[]) {
    await this.prisma.leads.createMany({
      data,
    });
  }
}
