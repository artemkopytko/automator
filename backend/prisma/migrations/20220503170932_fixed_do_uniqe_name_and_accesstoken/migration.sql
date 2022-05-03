/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `DigitalOceanAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accessToken]` on the table `DigitalOceanAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DigitalOceanAccount_name_key` ON `DigitalOceanAccount`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `DigitalOceanAccount_accessToken_key` ON `DigitalOceanAccount`(`accessToken`);
