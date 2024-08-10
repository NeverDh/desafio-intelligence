import { Module } from '@nestjs/common';
import { HistoryLeadsService } from './history-leads.service';
import { HistoryLeadsController } from './controller/history-leads.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HistoryLeadsRequestHandlerController } from './controller/history-leads.request-handler.controller';

@Module({
  controllers: [HistoryLeadsController],
  providers: [
    PrismaService,
    HistoryLeadsRequestHandlerController,
    HistoryLeadsService,
  ],
  exports: [HistoryLeadsService]
})
export class HistoryLeadsModule {}
