/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MOBILE', 'REAL_ESTATE', 'VEHICLE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DEACTIVE');

-- CreateEnum
CREATE TYPE "Gearbox" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "allImages" JSONB,
ADD COLUMN     "area" INTEGER,
ADD COLUMN     "batteryHealth" INTEGER,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "floor" INTEGER,
ADD COLUMN     "fuelType" "FuelType",
ADD COLUMN     "gearbox" "Gearbox",
ADD COLUMN     "hasElevator" BOOLEAN,
ADD COLUMN     "hasParking" BOOLEAN,
ADD COLUMN     "hasWarehouse" BOOLEAN,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "mileage" INTEGER,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "ram" INTEGER,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "storage" INTEGER,
ADD COLUMN     "totalFloors" INTEGER,
ADD COLUMN     "vehicleYear" INTEGER,
ADD COLUMN     "warranty" BOOLEAN,
ADD COLUMN     "yearBuilt" INTEGER;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_postId_key" ON "Like"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
