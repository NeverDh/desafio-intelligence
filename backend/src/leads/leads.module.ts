import { Module } from '@nestjs/common';
import { LeadsService } from './service/leads.service';
import { LeadsController } from './controller/leads.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeadsRequestHandlerController } from './controller/leads.request-handler.controller';
import { LeadsRequestHandlerService } from './service/leads.request-handler.service';

@Module({
  controllers: [LeadsController],
  providers: [
    LeadsService,
    PrismaService,
    LeadsRequestHandlerController,
    LeadsRequestHandlerService,
  ],
})
export class LeadsModule {}
