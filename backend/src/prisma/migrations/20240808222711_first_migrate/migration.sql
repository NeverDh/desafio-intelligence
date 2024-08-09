-- CreateTable
CREATE TABLE "online-leads" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "online-leads_pkey" PRIMARY KEY ("id")
);
