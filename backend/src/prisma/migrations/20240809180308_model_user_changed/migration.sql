/*
  Warnings:

  - Changed the type of `nome` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `senha` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "nome",
ADD COLUMN     "nome" TEXT NOT NULL,
DROP COLUMN "senha",
ADD COLUMN     "senha" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Password";

-- DropEnum
DROP TYPE "User";
