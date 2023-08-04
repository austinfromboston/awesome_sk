import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

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
        const contributions = data.get("awesomeContributions")

        // 2.
        if (!purchaserEmail|| !purchaserName|| !purchaserPhone || !arrivalTime) {
            return fail(400, { purchaserName, purchaserEmail, purchaserPhone, arrivalTime, missing: true });
        }


        await prisma.registration.create({
            data: {
                eventId,
                purchaserName,
                purchaserEmail,
                purchaserPhone,
                contributions,
                otherComments,
                arrivalTime,
                cabinPrefs,
                ticketCount: 1,
                pricePaid: 0
            },
        });

        //5.
        throw redirect(303, `/`)
    }
} satisfies Actions;