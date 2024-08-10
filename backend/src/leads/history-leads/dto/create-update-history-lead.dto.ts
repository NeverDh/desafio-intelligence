/* eslint-disable indent */
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class HistoryLeadDto {
  @IsString()
  @IsNotEmpty()
  idLead: string;
  @IsString()
  @IsNotEmpty()
  nome: string;
  @IsDate()
  @IsNotEmpty()
  data_nascimento: Date;
  @IsString()
  @IsNotEmpty()
  genero: string;
  @IsString()
  @IsNotEmpty()
  nacionalidade: string;
  @IsString()
  @IsNotEmpty()
  status: string;
}
