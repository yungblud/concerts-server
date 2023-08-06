
export interface GenerateTokenBody {
    email: string
    password?: string
}

export type GenerateTokenReply = {
    authToken: string
} | {
    error: string
}