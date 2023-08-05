import User from "../models/User"
import { UserConnectedSNSSchemaType } from "../schema/user"
import { appPrisma } from "./prismaInstance"

export const getUserById = async (id: string) => {
    const data = await appPrisma.user.findUnique({
        where: {
            id
        },
        'select': {
            'id': true,
            'email': true,
            'password': false,
            is_staff: true,
            connected_sns: true,
            created_at: true
        }
    })
    if (!data) return null
    const user = new User({
        'id': data.id,
        'email': data.email,
        'is_staff': data.is_staff,
        'password': null,
        'connected_sns': data.connected_sns as UserConnectedSNSSchemaType,
        'created_at': data.created_at
    })

    return user.serialize()
}

export const createUser = async (params: {email: string, password?: string, connected_sns: UserConnectedSNSSchemaType}) => {
    const {
        email,
        password,
        connected_sns
    } = params
    const data = await appPrisma.user.create({
        'data': {
            email,
            password,
            connected_sns,
            'is_staff': false,
        }
    })

    const user = new User({
        'id': data.id,
        'email': data.email,
        'is_staff': data.is_staff,
        'password': null,
        'connected_sns': data.connected_sns as UserConnectedSNSSchemaType,
        'created_at': data.created_at
    })

    return user.serialize()
}