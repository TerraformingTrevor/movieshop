/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Author` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Director` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Director` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `authorId` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `directorId` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Director` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_directorId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Director" DROP CONSTRAINT "Director_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Director_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "authorId",
ADD COLUMN     "authorId" INTEGER,
DROP COLUMN "directorId",
ADD COLUMN     "directorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Director"("id") ON DELETE SET NULL ON UPDATE CASCADE;
