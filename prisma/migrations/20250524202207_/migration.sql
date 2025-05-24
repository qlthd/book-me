/*
  Warnings:

  - You are about to drop the column `isBooked` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "isBooked",
ADD COLUMN     "bookingId" TEXT;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- CreateIndex
CREATE UNIQUE INDEX "Availability_bookingId_key" ON "Availability"("bookingId");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
