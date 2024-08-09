/* eslint-disable indent */
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateLeadDto {
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
}
