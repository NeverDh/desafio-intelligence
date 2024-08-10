/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Get, Query } from '@nestjs/common';
import { HistoryLeadsService } from '../history-leads.service';
import { HistoryLeadsRequestHandlerController } from './history-leads.request-handler.controller';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('history')
@Controller('history')
export class HistoryLeadsController {
  constructor(
    private readonly historyLeadsService: HistoryLeadsService,
    private readonly historyleadsRequestHandlerController: HistoryLeadsRequestHandlerController,
  ) {}

  @Get()
  findAll(@Query() query: any) {
    const pagination =
      this.historyleadsRequestHandlerController.transformQuery(query);
    return this.historyLeadsService.findAll(pagination);
  }

  @Get('count')
  findAllQuery() {
    return this.historyLeadsService.findAllQuery();
  }
}
