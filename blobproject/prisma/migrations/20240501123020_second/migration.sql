-- CreateTable
CREATE TABLE "File2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "blobData" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File2_pkey" PRIMARY KEY ("id")
);
