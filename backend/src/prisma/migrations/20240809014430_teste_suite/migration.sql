/*
  Warnings:

  - You are about to drop the `online-leads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "online-leads";

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
