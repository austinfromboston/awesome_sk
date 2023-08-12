import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import * as reg from "$lib/services/registrations";
import { getEvent } from "$lib/services/events"

// initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY )

export async function load({ params } : {params:{slug: string}} ) {
    const info =  await reg.getReg(params.slug)
    const event = await getEvent(info.eventId)
    const totalPayment = info.totalDue * 100
    // create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPayment,
        // note, for some EU-only payment methods it must be EUR
        currency: 'usd',
        description: `${event.name} registration for ${info.purchaserName}`,
        automatic_payment_methods: {
            enabled: true
        },
        metadata: {
            regSecureId: params.slug
        }
    })
    await reg.updateReg(params.slug, {paymentIntentId: paymentIntent.id})

    // return the clientSecret to the client
    return {
        clientSecret: paymentIntent.client_secret,
        slug: params.slug,
        total: totalPayment
    }
}