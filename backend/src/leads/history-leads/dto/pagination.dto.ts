/* eslint-disable indent */
import { IsDate, IsOptional, IsString } from 'class-validator';

export class PaginationHistoryLeadDto {
  @IsString()
  @IsOptional()
  skip?: string;
  @IsDate()
  @IsOptional()
  take?: string;
}
