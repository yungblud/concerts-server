import { UserConnectedSNSSchemaType, UserSchemaType } from "../../../schema/user"

export interface RegisterAccountBody {
    email: string
    password: string
    connected_sns: UserConnectedSNSSchemaType
}

export type RegisterAccountReply = Pick<UserSchemaType, 'id' | 'email'> | {
    error: string
}