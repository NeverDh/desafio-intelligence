-- CreateEnum
CREATE TYPE "User" AS ENUM ('zoox');

-- CreateEnum
CREATE TYPE "Password" AS ENUM ('zoox123');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" "User" NOT NULL DEFAULT 'zoox',
    "senha" "Password" NOT NULL DEFAULT 'zoox123',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
