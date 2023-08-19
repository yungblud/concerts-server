import { FastifyPluginCallback } from 'fastify'
import { decodeAuthToken } from '../../../lib/authToken'
import { getUserById } from '../../../database/user'
import { CreateConcertBodySchema, CreateConcertBodyType } from './types'
import { createConcert } from '../../../database/concert'

const concertRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Body: CreateConcertBodyType
  }>({
    'method': 'POST',
    'url': '/',
    onRequest: async (req, rep, done) => {
      const { authorization } = req.headers
      // check authorization header for token
      if (!authorization) {
        return rep.status(403).send({
          error: "not authorized"
        })
      }
      const authToken = authorization
      const decoded = decodeAuthToken(authToken)
      if (!decoded) {
        return rep.status(400).send({
          error: 'token decode error'
        })
      }
      const user = await getUserById(decoded.id)
      if (!user) {
        return rep.status(401).send({
          error: 'invalid token'
        })
      }
      const isStaff = user.isStaffUesr()
      if (!isStaff) {
        return rep.status(403).send({
          error: 'has no permission'
        })
      }
      done()
    },
    handler: async (req, rep) => {
      const validation = CreateConcertBodySchema.safeParse(req.body)
      if (!validation.success) {
        return rep.status(400).send({
          error: 'invalid data'
        })
      }
      const concert = await createConcert(req.body)
      return rep.send(concert.serialize())
    },
    schema: {
      'tags': ['concert'],
      body: {
        $ref: 'CreateConcertBody'
      }
    }
  })
  done()
}

export default concertRoutes