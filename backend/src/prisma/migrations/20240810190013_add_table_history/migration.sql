-- CreateTable
CREATE TABLE "history-leads" (
    "id" TEXT NOT NULL,
    "idLead" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history-leads_pkey" PRIMARY KEY ("id")
);
