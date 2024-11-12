/*
  Warnings:

  - You are about to drop the column `carId` on the `Iklan` table. All the data in the column will be lost.
  - You are about to drop the `_CarBlogs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[iklanId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Iklan" DROP CONSTRAINT "Iklan_carId_fkey";

-- DropForeignKey
ALTER TABLE "_CarBlogs" DROP CONSTRAINT "_CarBlogs_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarBlogs" DROP CONSTRAINT "_CarBlogs_B_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "iklanId" TEXT;

-- AlterTable
ALTER TABLE "Iklan" DROP COLUMN "carId";

-- DropTable
DROP TABLE "_CarBlogs";

-- CreateIndex
CREATE UNIQUE INDEX "Car_iklanId_key" ON "Car"("iklanId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_iklanId_fkey" FOREIGN KEY ("iklanId") REFERENCES "Iklan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
