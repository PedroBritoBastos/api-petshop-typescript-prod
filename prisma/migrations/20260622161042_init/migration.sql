-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "cpf" TEXT,
    "password" TEXT NOT NULL,
    "imageUrl" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "isAdopted" BOOLEAN NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "adoptionClientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetshopService" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "executionDate" TIMESTAMP(3) NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetshopService_pkey" PRIMARY KEY ("id")
);
