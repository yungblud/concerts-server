import { RouteHandler } from "fastify"
import { RegisterAccountBody, RegisterAccountReply } from "./types"
import { createUser, getUserByEmail } from "../../../database/user"
import encryptPassword from "../../../lib/encryptPassword"

export const register: RouteHandler<{
    Body: RegisterAccountBody
    Reply: RegisterAccountReply
  }> = async (req, rep) => {
    const { email, password, connected_sns } = req.body

    try {
      // check existing user by email
      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        return rep.status(409).send({
          error: 'already existing account'
        })
      }

      // generate encrypted password
      const encryptedPassword = !!password ? encryptPassword({
        plain: password,
        originalSalt: undefined
      }) : undefined

      const user = await createUser({
          email,
          password: encryptedPassword?.encrypted,
          connected_sns,
          password_salt: encryptedPassword?.salt
      })

      const serialized = user?.serialize()

      if (!serialized) {
          return rep.status(500).send({
              error: 'serialize failed',
          })
      }

      return rep.status(201).send({
          'id': serialized.id,
          'email': serialized.email,
      })
    } catch (e) {
      console.log(e)
      return rep.status(500).send({
        error: 'internal server error',
      })
    }
  }