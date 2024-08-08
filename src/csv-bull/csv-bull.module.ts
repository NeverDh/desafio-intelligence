import { Module } from '@nestjs/common';
import { CsvBullController } from './csv-bull.controller';
import { CreateCSVProducer } from './create-csv.producer';
import { BullModule } from '@nestjs/bull';
import { CreateCSVConsumer } from './create-csv.consumer';
import { PrismaService } from 'src/database/prisma/client/prisma.service';
import { CreateCSVRepository } from './csv-bull.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'create-csv',
    }),
  ],
  controllers: [CsvBullController],
  providers: [CreateCSVProducer, CreateCSVConsumer, PrismaService, {
    provide: CreateCSVRepository,
    useFactory: (prisma: PrismaService) => {
      return new CreateCSVRepository(prisma);
    },
    inject: [PrismaService],
  }],
})
export class CsvBullModule {}
