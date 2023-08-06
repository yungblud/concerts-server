import { RouteHandler } from "fastify"
import { createUser, getUserByEmail } from "../../../database/user"
import { GenerateTokenBody } from "./types"

export const handleGenerateToken: RouteHandler<{
    Body: GenerateTokenBody
  }> = async (req, rep) => {
    const { email, password } = req.body

    try {
        // todo: validate user with email and password
        const user = await getUserByEmail(email)

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