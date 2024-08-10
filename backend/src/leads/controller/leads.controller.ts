/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { LeadsService } from '../service/leads.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { LeadsRequestHandlerController } from './leads.request-handler.controller';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly leadsRequestHandlerController: LeadsRequestHandlerController,
  ) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const filter = this.leadsRequestHandlerController.transformQuery(query);
    return this.leadsService.findAll(filter);
  }

  @Get('/count')
  findAllNumber() {
    return this.leadsService.findAllQuery();
  }


  @Get(':id')
  findById(@Param('id') id: string) {
    return this.leadsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }
}
