import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../../../.svelte-kit/types/src/routes';
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
    // form.data.arrivalTime = "Wednesday"
    // form.data.adultPriceCode = "default"
    return {form, registrationEvent, baseAdult, baseKid}
}

export const actions = {
    // 1.
    default: async (event) => {
        const form = await superValidate(event, regSchema)

        const {purchaserEmail, purchaserPhone, purchaserName} = form.data
        const { arrivalTime, cabinPrefs, awesomeContributions, otherComments } = form.data
        const { kidPaymentCount, kidPriceCode, adultPriceCode } = form.data
        const eventId = Number(process.env.CURRENT_EVENT_ID)
        const registrationEvent = await getEvent(eventId);
        let kidTotal = 0

        // const adultPriceCode = data.get("adult_price")
        const secureId = randomUUID();

        if (!form.valid) {
            console.log(form)
            return fail(400, {form})
        }

        if (form.data.kids) {
            kidTotal = (kidPaymentCount as number) * registrationEvent.prices.public[kidPriceCode]
        }
        const pptCount = form.data.participants ? form.data.participants.length + 1 : 1
        const totalDue = kidTotal + (registrationEvent.prices.public[adultPriceCode] * pptCount)

        await prisma.$transaction(async (tx) => {

            const reg = await tx.registration.create({
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
                    totalDue,
                    kidPaymentCount,
                    createdAt: new Date(),
                },
            });
            if (form.data.participants) {
                for (let i = 0; i < form.data.participants.length; i++) {
                    await tx.participant.create({
                        data: {
                            ...form.data.participants[i],
                            registrationId: reg.id,
                            priceCode: adultPriceCode
                        }
                    })
                }
            }
            if (form.data.kids) {
                for (let i = 0; i < form.data.kids.length; i++) {
                    await tx.kidParticipant.create({
                        data: {
                            ...form.data.kids[i],
                            registrationId: reg.id,
                            priceCode: kidPriceCode as string
                        }
                    })

                }
            }
            await tx.participant.create({
                data: {
                    name: purchaserName,
                    email: purchaserEmail,
                    registrationId: reg.id,
                    priceCode: adultPriceCode
                },
            });
        });


        throw redirect(303, `/payment/${secureId}`)
    }
} satisfies Actions;