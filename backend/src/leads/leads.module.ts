import { Module } from '@nestjs/common';
import { LeadsService } from './service/leads.service';
import { LeadsController } from './controller/leads.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeadsRequestHandlerController } from './controller/leads.request-handler.controller';
import { LeadsRequestHandlerService } from './service/leads.request-handler.service';
import { HistoryLeadsModule } from './history-leads/history-leads.module';
import { HistoryLeadsService } from './history-leads/history-leads.service';

@Module({
  imports: [HistoryLeadsModule], // Corrigido para importar o módulo
  controllers: [LeadsController],
  providers: [
    LeadsService,
    PrismaService,
    LeadsRequestHandlerController,
    LeadsRequestHandlerService,
    HistoryLeadsService
  ]
})
export class LeadsModule {}
