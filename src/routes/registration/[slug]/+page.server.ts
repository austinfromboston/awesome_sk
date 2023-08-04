import * as reg from '$lib/services/registrations'

export const load = async ({ params } : {params:{slug: string}} ) => {
    return {reg: await reg.getReg(params.slug)}
}
