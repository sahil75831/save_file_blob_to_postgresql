-- CreateTable
CREATE TABLE "FileBlob" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "blobData" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileBlob_pkey" PRIMARY KEY ("id")
);
