/*
  Warnings:

  - You are about to drop the column `githubId` on the `users` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_githubId_key";

-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "githubId";
