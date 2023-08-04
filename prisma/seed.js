import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    const party = await prisma.event.upsert({
        where: {testid: "awesome_2023"},
        update: {},
        create: {
            name: "Awesome 2023",
            registrationStartDate: "2023-07-24T00:00:00Z",
            startDate: "2023-09-13T14:00:00-07:00",
            endDate: "2023-09-17T12:00:00-07:00",
            maxAttendance: 150,
            testid: "awesome_2023"
        }
    })
    console.log(`Created event ${party.testid} with id: ${party.id}`)
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })