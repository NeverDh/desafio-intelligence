import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaService } from 'src/database/client/prisma.service';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, PrismaService],
})
export class LeadsModule {}
