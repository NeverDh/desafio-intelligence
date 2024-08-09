import { PrismaService } from 'src/database/client/prisma.service';
import { LeadsDTO } from './dto/csv-bull.dto';

export class CreateCSVRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: LeadsDTO[]) {
    await this.prisma.leads.deleteMany();
    await this.prisma.leads.createMany({
      data,
    });
  }
}
