import { z } from 'zod'

const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().nullish(),
    connected_sns: z.union([
        z.literal('apple'),
        z.literal('facebook'),
        z.literal('twitter'),
        z.literal('google'),
    ]).nullish(),
    is_staff: z.boolean(),
})

export type UserSchemaType = z.infer<typeof UserSchema>