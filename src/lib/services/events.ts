import prisma from '$lib/prisma'
import { error } from '@sveltejs/kit'

export async function getEvent(id: number) {
    const event = await prisma.event.findUnique({
        where: {id},
        select: {
            name: true,
            registrationStartDate: true,
            startDate: true,
            endDate: true,
        },
    })

    if (!event) {
        throw error(400, `Could not find event ${id}`)
    }

    return event
}
