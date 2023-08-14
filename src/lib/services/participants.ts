import prisma from '$lib/prisma'

export function getParticipants(registrationId: number) {
    return prisma.participant.findMany({
        where: {registrationId},
        select: {
            name: true,
            email: true,
        },
    })
}

export function getKidParticipants(registrationId: number) {
    return prisma.kidParticipant.findMany({
        where: {registrationId},
        select: {
            name: true,
            age: true,
        },
    })
}