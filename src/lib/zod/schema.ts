import { z } from 'zod'

export const pptSchema = z.object({
    name: z.string().nonempty({message: 'Missing name'}),
    email: z.string().regex(/^[\-\w.]+@([\w\-]+\.)+\w{2,10}$/, 'email must be functional'),
})

export const kidSchema = z.object({
    name: z.string().nonempty({message: 'Missing name'}),
    age: z.string()
})
export const regSchema = z.object({
    purchaserName: z.string().nonempty({message: 'Missing name'}),
    purchaserEmail: z.string().nonempty({message: 'Missing email'}).regex(/^[\-\w.]+@([\w\-]+\.)+\w{2,10}$/, 'email must be functional'),
    purchaserPhone: z.string().nonempty({message: 'Missing phone'}),
    arrivalTime: z.string().nonempty({message: 'Missing arrival time'}),
    awesomeContributions: z.string().nonempty({ message: 'The party requires awesome ideas' }),
    otherComments: z.string().optional(),
    cabinPrefs: z.string().optional(),
    participants: pptSchema.array().optional(),
    kids: kidSchema.array().optional()
})
