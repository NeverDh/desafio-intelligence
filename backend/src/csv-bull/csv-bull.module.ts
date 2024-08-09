import { Module } from '@nestjs/common';
import { CsvBullController } from './csv-bull.controller';
import { CreateCSVProducer } from './csv-bull.producer';
import { BullModule } from '@nestjs/bull';
import { CreateCSVConsumer } from './csv-bull.consumer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCSVRepository } from './repository/csv-bull.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'create-csv',
    }),
  ],
  controllers: [CsvBullController],
  providers: [
    CreateCSVProducer,
    CreateCSVConsumer,
    PrismaService,
    {
      provide: CreateCSVRepository,
      useFactory: (prisma: PrismaService) => {
        return new CreateCSVRepository(prisma);
      },
      inject: [PrismaService],
    },
  ],
})
export class CsvBullModule {}
