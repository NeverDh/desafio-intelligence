Estrutura do Projeto

src/
├── auth/
│   ├── auth-response.dto.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── csv-bull/
│   ├── csv-bull.dto.ts
│   ├── csv-bull.repository.factory.ts
│   ├── csv-bull.repository.ts
│   ├── csv-bull.consumer.ts
│   ├── csv-bull.producer.ts
│   └── csv-bull.module.ts
│
├── leads/
│   ├── controller/
│   │   ├── leads.controller.ts
│   │   ├── leads-request-handler.controller.ts
│   │
│   ├── dto/
│   │   ├── create-lead.dto.ts
│   │   ├── pagination-filter.dto.ts
│   │   └── update-lead.dto.ts
│   │
│   ├── service/
│   │   ├── leads-request-handler.service.ts
│   │   ├── leads.service.ts
│   │   └── leads.module.ts
│   │
│   └── history-leads/
│       ├── controller/
│       │   ├── history-leads.controller.ts
│       │   └── history-leads-request-handler.controller.ts
│       │
│       ├── dto/
│       │   ├── create-update-history-lead.dto.ts
│       │   ├── pagination.dto.ts
│       │
│       ├── service/
│       │   └── history-lead.service.ts
│       │
│       └── history-leads.module.ts
│
├── prisma/
│   ├── migrations/
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   ├── schema.prisma
│   └── seeds.ts
│
└── users/
    ├── dto/
    │   └── user.dto.ts
    ├── users.controller.ts
    ├── users.service.ts
    └── users.module.ts


Arquivos Principais

app.controller.ts: Controlador principal da aplicação.
app.module.ts: Módulo raiz que agrupa todos os submódulos da aplicação.
main.ts: Ponto de entrada da aplicação.

Descrição dos Módulos

Módulo auth
Este módulo é responsável pela autenticação dos usuários. Ele utiliza JWT para gerar tokens que são válidos por 1 hora. A chave secreta e o tempo de expiração do token são configurados no arquivo .env.

Módulo csv-bull
Este é um módulo mais complexo que processa arquivos CSV e insere os dados no banco de dados. O processamento é feito por meio da fila Bull:
O Producer publica os itens na fila após validação.
O Consumer consome os itens da fila e os insere no banco de dados.

Módulo leads
Este é o módulo principal da aplicação, responsável pelas rotas mais importantes relacionadas aos leads. Dentro dele, existe um submódulo chamado history-leads, que grava todo o histórico de criação e alterações dos leads.

Módulo prisma
Utilizamos o Prisma como ORM para facilitar as interações com o banco de dados. O schema Prisma define três models principais que estruturam o banco de dados.

Módulo users
Este módulo gerencia as operações relacionadas aos usuários. Atualmente, há apenas um usuário para login e demonstração do JWT.

Configurações Iniciais

1. Criação do Arquivo .env
Antes de tudo, é necessário criar o arquivo .env com base no .env.example. Este arquivo conterá as configurações sensíveis e específicas do ambiente, como a chave secreta do JWT, informações de banco de dados, e credenciais iniciais do usuário.

2. Configuração do Docker
Para facilitar a configuração e execução do ambiente de desenvolvimento, o projeto inclui um arquivo docker-compose.yaml. Este arquivo define os serviços necessários para rodar a aplicação em containers Docker.

Iniciar os containers: 
Para criar e iniciar os containers, execute o comando:
docker-compose up -d
Este comando irá iniciar todos os serviços definidos no docker-compose.yaml em segundo plano.

3. Execução do Script de Seed
Com a aplicação rodando, é necessário criar o usuário inicial no banco de dados. Para isso, execute o comando:

npm run seed
Este comando utiliza o Prisma para popular o banco de dados com um usuário padrão, cujas informações são preenchidas no .env.

Bibliotecas Utilizadas

├── @nestjs/bull@10.2.0
├── @nestjs/config@3.2.3
├── @nestjs/core@10.3.10
├── @nestjs/jwt@10.2.0
├── @nestjs/mapped-types@2.0.5
├── @nestjs/platform-express@10.3.10
├── @nestjs/schematics@10.1.3
├── @nestjs/swagger@7.4.0
├── @nestjs/testing@10.3.10
├── @prisma/client@5.18.0
├── @types/express@4.17.21
├── @types/jest@29.5.12
├── @types/multer@1.4.11
├── @types/node@20.14.14
├── @types/supertest@6.0.2
├── @typescript-eslint/eslint-plugin@8.0.1
├── @typescript-eslint/parser@8.0.1
├── bcrypt@5.1.1
├── bull@4.16.0
├── class-transformer@0.5.1
├── class-validator@0.14.1
├── csvtojson@2.0.10
├── eslint-config-prettier@9.1.0
├── eslint-plugin-prettier@5.2.1
├── eslint@8.57.0
├── jest@29.7.0
├── multer@1.4.5-lts.1
├── prettier@3.3.3
├── prisma@5.18.0
├── reflect-metadata@0.2.2
├── rxjs@7.8.1
├── source-map-support@0.5.21
├── supertest@7.0.0
├── swagger-ui-express@5.0.1
├── ts-jest@29.2.4
├── ts-loader@9.5.1
├── ts-node@10.9.2
├── tsconfig-paths@4.2.0
└── typescript@5.5.4