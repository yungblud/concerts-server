import { RouteHandler } from "fastify"
import { RegisterAccountBody, RegisterAccountReply } from "./types"
import { createUser } from "../../../database/user"

export const register: RouteHandler<{
    Body: RegisterAccountBody
    Reply: RegisterAccountReply
  }> = async (req, rep) => {
    const { email, password, connected_sns } = req.body

    try {
        const user = await createUser({
            email,
            password,
            connected_sns
        })

        const serialized = user?.serialize()

        if (!serialized) {
            return rep.status(500).send({
                error: 'serialize failed',
            })
        }

        return rep.status(200).send({
            'id': serialized.id,
            'email': serialized.email,
        })
    } catch (e) {
      return rep.status(500).send({
        error: 'internal server error',
      })
    }
  }