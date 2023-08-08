import prisma from '$lib/prisma'
import { error } from '@sveltejs/kit'

export async function getReg(slug: string) {
    const reg = await prisma.registration.findUnique({
        where: {secureId: slug},
        select: {
            secureId: true,
            createdAt: true,
            purchaserEmail: true
        },
    })

    if (!reg) {
        throw error(400, `Could not find “${slug}”`)
    }

    return reg
}
