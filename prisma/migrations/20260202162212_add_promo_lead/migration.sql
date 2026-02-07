-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "serviceLocation" TEXT NOT NULL,
    "squareMeters" DOUBLE PRECISION NOT NULL,
    "addressDetails" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoLead" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'PROMO',
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "PromoLead_pkey" PRIMARY KEY ("id")
);
