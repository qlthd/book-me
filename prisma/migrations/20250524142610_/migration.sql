/*
  Warnings:

  - You are about to drop the column `inviteeName` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `inviteeFirstName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inviteeLastName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "inviteeName",
ADD COLUMN     "inviteeFirstName" TEXT NOT NULL,
ADD COLUMN     "inviteeLastName" TEXT NOT NULL;
