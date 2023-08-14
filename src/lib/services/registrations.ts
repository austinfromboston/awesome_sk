import prisma from '$lib/prisma'
import { error } from '@sveltejs/kit'

type Registration = {
    secureId: string,
    eventId: number,
    createdAt: Date,
    purchaserEmail: string,
    purchaserName: string,
    totalDue: number,
    totalPaid: number,
    id: number,
}

export async function getReg(slug: string) {
    const reg = await prisma.registration.findUnique({
        where: {secureId: slug},
        select: {
            id: true,
            secureId: true,
            eventId: true,
            createdAt: true,
            purchaserEmail: true,
            purchaserPhone: true,
            purchaserName: true,
            arrivalTime: true,
            otherComments: true,
            awesomeContributions: true,
            cabinPrefs: true,
            totalDue: true,
            totalPaid: true,
        },
    })

    if (!reg) {
        throw error(400, `Could not find “${slug}”`)
    }

    return reg
}

export async function updateReg(id: string, data: unknown) {
    return prisma.registration.update({
        where: {secureId: id},
        data
    })
}

export async function calculateSpots(reg: Registration): Promise<number> {
    const adultCount = await prisma.participant.count({
        where: {registrationId: reg.id},
    })
    const kidCount = await prisma.kidParticipant.count({
        where: {registrationId: reg.id},
    })
    return adultCount + kidCount
}
