import { getReg } from '$lib/services/registrations'
import { getEvent } from '$lib/services/events'
import {calculateSpots} from "$lib/services/registrations";

export const load = async ({ params } : {params:{slug: string}} ) => {
    const reg = await getReg(params.slug)
    const event = await getEvent(reg.eventId)
    const totalSpots =  await calculateSpots(reg)
    return {reg, totalSpots, event}
}
