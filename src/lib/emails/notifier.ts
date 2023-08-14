import { render } from 'svelte-email';
import NewRegistration from '$lib/emails/NewRegistration.svelte';
import { getEvent } from '$lib/services/events';
import {SES} from '@aws-sdk/client-ses';
import { getParticipants, getKidParticipants } from '$lib/services/participants'
import {calculateSpots} from "$lib/services/registrations";

const ORGANIZER_EMAIL="hello@f-ingawesome.com"
const ORGANIZER_TO_EMAIL="awesome.mendocino@gmail.com"

export async function sendRegNotification(reg) {
    const totalSpots = await calculateSpots(reg)
    const emailHtml = render({
        template: NewRegistration,
        props: {
            data: {
                reg,
                totalSpots,
                event: await getEvent(reg.eventId),
                participants: await getParticipants(reg.id),
                kidParticipants: await getKidParticipants(reg.id),
            }
        }
    });
    const params = {
        Destination: {
            ToAddresses: [
               ORGANIZER_TO_EMAIL
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: emailHtml
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Awesome Registration ${reg.purchaserName}`
            }
        },
        Source: ORGANIZER_EMAIL
    }

    return new SES({apiVersion: '2010-12-01'}).sendEmail(params)
}

