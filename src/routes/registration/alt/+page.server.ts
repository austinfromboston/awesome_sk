import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { randomUUID } from 'crypto';
import { superValidate } from 'sveltekit-superforms/server'
import { kidSchema, pptSchema, regSchema } from '$lib/zod/schema'
import { getEvent } from "$lib/services/events"

export const load = async (event) => {
    const eventId = Number(process.env.CURRENT_EVENT_ID)
    const registrationEvent = await getEvent(eventId);
    const form = await superValidate(event, regSchema)
    const baseAdult = await superValidate(event, pptSchema)
    const baseKid = await superValidate(event, kidSchema)
    form.data.arrivalTime = "Wednesday"
    return {form, registrationEvent, baseAdult, baseKid}
}

export const actions = {
    // 1.
    default: async (event) => {
        const form = await superValidate(event, regSchema)

        const {purchaserEmail, purchaserPhone, purchaserName} = form.data
        const { arrivalTime, cabinPrefs, awesomeContributions, otherComments } = form.data
        const eventId = Number(process.env.CURRENT_EVENT_ID)
        // const adultPriceCode = data.get("adult_price")
        const secureId = randomUUID();
        const adultPriceCode = "default";

        if (!form.valid) {
            console.log(form)
            return fail(400, {form})
        }

        const reg = await prisma.registration.create({
            data: {
                purchaserName,
                purchaserEmail,
                purchaserPhone,
                arrivalTime,
                cabinPrefs,
                awesomeContributions,
                otherComments,
                eventId,
                secureId,
                ticketCount: 1,
                pricePaid: 0,
                chargedAt: new Date(),
                createdAt: new Date(),
            },
        });
        if (form.data.participants) {
            for (let i = 0; i < form.data.participants.length; i++) {
                await prisma.participant.create({data: {
                        ...form.data.participants[i],
                        registrationId: reg.id,
                        priceCode: adultPriceCode
                    }})
            }
        }
        if (form.data.kids) {
            for (let i = 0; i < form.data.kids.length; i++) {
                await prisma.kidParticipant.create({
                    data: {
                        ...form.data.kids[i],
                        registrationId: reg.id,
                        priceCode: adultPriceCode
                    }
                })

            }
        }
        await prisma.participant.create({
            data: {
                name: purchaserName,
                email: purchaserEmail,
                registrationId: reg.id,
                priceCode: adultPriceCode
            },
        });


        throw redirect(303, `/registration/${secureId}`)
    }
} satisfies Actions;