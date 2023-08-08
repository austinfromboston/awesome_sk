import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { randomUUID } from 'crypto';
import { superValidate } from 'sveltekit-superforms/server'
import { regSchema } from '$lib/zod/schema'

export const actions = {
    // 1.
    default: async (event) => {
        const form = await superValidate(event, regSchema)

        const eventId = Number(process.env.CURRENT_EVENT_ID)
        // const adultPriceCode = data.get("adult_price")
        const secureId = randomUUID();

        if (!form.valid) {
            return fail(400, form)
        }

        await prisma.registration.create({
            data: {
                ...form.data,
                eventId,
                secureId,
                ticketCount: 1,
                pricePaid: 0,
                chargedAt: new Date(),
                createdAt: new Date(),
            },
        });

        throw redirect(303, `/registration/${secureId}`)
    }
} satisfies Actions;