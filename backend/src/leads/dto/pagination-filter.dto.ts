/* eslint-disable indent */
import { IsDate, IsOptional, IsString } from 'class-validator';

export class FilterLeadDto {
  @IsString()
  @IsOptional()
  skip?: string;
  @IsDate()
  @IsOptional()
  take?: string;
  @IsOptional()
  filter?: {
      nome?: string;
      data_nascimento?: Date;
      data_criacao?: Date;
      genero?: string,
      nacionalidade?: string,
      data_atualizacao?: Date;
  };
}
