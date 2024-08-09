/* eslint-disable @typescript-eslint/no-explicit-any */
export class InvalidLeadDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidLeadDataError';
  }
}

export function validateLeadData(lead: any): void {
  const nome = lead['nome'];
  const data_nascimento = lead['data_nascimento'];
  const genero = lead['genero'];
  const nacionalidade = lead['nacionalidade'];
  const data_criacao = lead['data_criacao'];
  const data_atualizacao = lead['data_atualizacao'];

  if (typeof nome !== 'string' || !nome.trim()) {
    throw new InvalidLeadDataError(`Invalid 'nome': ${nome}`);
  }
  if (data_nascimento && !isValidDate(data_nascimento)) {
    throw new InvalidLeadDataError(
      `Invalid 'data_nascimento': ${data_nascimento}`,
    );
  }
  if (genero && typeof genero !== 'string') {
    throw new InvalidLeadDataError(`Invalid 'genero': ${genero}`);
  }
  if (nacionalidade && typeof nacionalidade !== 'string') {
    throw new InvalidLeadDataError(`Invalid 'nacionalidade': ${nacionalidade}`);
  }
  if (data_criacao && !isValidDate(data_criacao)) {
    throw new InvalidLeadDataError(`Invalid 'data_criacao': ${data_criacao}`);
  }
  if (data_atualizacao && !isValidDate(data_atualizacao)) {
    throw new InvalidLeadDataError(
      `Invalid 'data_atualizacao': ${data_atualizacao}`,
    );
  }
}

function isValidDate(dateString: string): boolean {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return !isNaN(date.getTime()) && day > 0 && month > 0 && year > 0;
}
