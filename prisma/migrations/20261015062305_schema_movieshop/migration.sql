/*
  Warnings:

  - You are about to alter the column `runtime` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "directorId" TEXT,
ALTER COLUMN "runtime" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GenreToMovie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Director"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
