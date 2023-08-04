-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "kid" BOOLEAN NOT NULL DEFAULT false,
    "age" INTEGER,
    "priceCode" TEXT NOT NULL,
    "registrationId" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registrationStartDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "maxAttendance" INTEGER NOT NULL,
    "testid" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "ticketCount" INTEGER NOT NULL,
    "pricePaid" INTEGER NOT NULL,
    "cabinPrefs" TEXT,
    "awesomeContributions" TEXT NOT NULL,
    "otherComments" TEXT,
    "stripeToken" TEXT,
    "chargedAt" TIMESTAMP(3) NOT NULL,
    "secureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "purchaserName" TEXT NOT NULL,
    "purchaserEmail" TEXT NOT NULL,
    "purchaserPhone" TEXT NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_testid_key" ON "Event"("testid");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_secureId_key" ON "Registration"("secureId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
