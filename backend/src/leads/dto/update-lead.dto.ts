/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsString,
  IsOptional,
  IsDate,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'AtLeastOneFieldRequired', async: false })
class AtLeastOneFieldRequired implements ValidatorConstraintInterface {
  validate(args: ValidationArguments) {
    const obj = args.object as any;
    return obj.nome || obj.data_nascimento || obj.genero || obj.nacionalidade;
  }

  defaultMessage() {
    return 'Pelo menos um dos campos "nome", "data_nascimento", "genero" ou "nacionalidade" deve ser preenchido.';
  }
}

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsOptional()
  @IsDate()
  data_nascimento?: Date;

  @IsString()
  @IsOptional()
  genero?: string;

  @IsString()
  @IsOptional()
  nacionalidade?: string;


  @Validate(AtLeastOneFieldRequired, {
    message:
      'Pelo menos um dos campos "nome", "data_nascimento", "genero" ou "nacionalidade" deve ser preenchido.',
  })

  _dummyValidation?: boolean;
}
