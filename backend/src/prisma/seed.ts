import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingUsers = await prisma.users.findMany();
  if (existingUsers.length === 0) {
    const passwordHash: string = await hash(process.env.USER_PASSWORD, 8);
    await prisma.users.create({
      data: {
        nome: process.env.USER_NAME,
        login: process.env.USER_LOGIN,
        senha: passwordHash,
        data_criacao: new Date(),
        data_atualizacao: new Date(),
      },
    });
    console.log('Usuário padrão criado.');
  } else {
    console.log('Usuários já existem, seed não necessário.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
