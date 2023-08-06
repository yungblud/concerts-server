import { RouteHandler } from "fastify"
import { getUserByEmail } from "../../../database/user"
import { GenerateTokenBody, GenerateTokenReply } from "./types"
import encryptPassword from "../../../lib/encryptPassword"
import { generateAuthToken } from "../../../lib/authToken"

export const handleGenerateToken: RouteHandler<{
    Body: GenerateTokenBody
    Reply: GenerateTokenReply
  }> = async (req, rep) => {
    const { email, password } = req.body

    try {
        const user = await getUserByEmail(email)
        if (!user) {
          return rep.status(404).send({
            error: 'not existing account'
          })
        }

        const isSNSUser = user.isSNSUser()
        const userSalt = user.getPasswordSalt()
        const emailSignedUpUser = !isSNSUser && !!userSalt

        if (emailSignedUpUser && !password) {
          return rep.status(400).send({
            error: 'password is not provided'
          })
        }

        if (emailSignedUpUser && !userSalt) {
          return rep.status(403).send({
            error: 'not existing salt'
          })
        }

        if (!emailSignedUpUser) {
          // todo: sns
          return rep.status(501).send({
            error: 'sns signup is not implemented yet'
          })
        }

        const encryptedPassword = emailSignedUpUser && !!password ? encryptPassword({
          originalSalt: userSalt,
          plain: password
        }) : undefined

        // validate password
        const isCorrectPassword = encryptedPassword?.encrypted === user.getPassword()

        if (!isCorrectPassword) {
          return rep.status(404).send({
            error: 'account not existing'
          })
        }

        const authToken = generateAuthToken({
          email,
          id: user.getId()
        })

        return rep.status(200).send({
            authToken
        })
    } catch (e) {
      return rep.status(500).send({
        error: 'internal server error',
      })
    }
  }