import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { randomUUID } from 'crypto';

export const actions = {
    // 1.
    default: async ({ request }) => {
        const data = await request.formData();

        const eventId = Number(process.env.CURRENT_EVENT_ID)
        const purchaserName = data.get("purchaser_name")
        const purchaserEmail = data.get("purchaser_email")
        const purchaserPhone = data.get("purchaser_phone")
        // const adultPriceCode = data.get("adult_price")
        const arrivalTime = data.get("arrival_time")
        const cabinPrefs = data.get("cabin_preferences")
        const otherComments = data.get("other_comments")
        const contributions = data.get("awesome_contributions")
        const secureId = randomUUID();

        if (!purchaserEmail|| !purchaserName|| !purchaserPhone || !arrivalTime || !contributions) {
            return fail(400, { purchaserName, purchaserEmail, purchaserPhone, arrivalTime, contributions, missing: true });
        }


        await prisma.registration.create({
            data: {
                eventId,
                purchaserName,
                purchaserEmail,
                purchaserPhone,
                awesomeContributions: contributions,
                otherComments,
                arrivalTime,
                cabinPrefs,
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