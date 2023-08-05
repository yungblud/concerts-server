import { FastifyPluginCallback } from 'fastify'
import { RegisterAccountBody, RegisterAccountReply } from './types'
import { register } from './handlers'

const accountRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.post<{
    Body: RegisterAccountBody
    Reply: RegisterAccountReply
  }>(
    '/register',
    register
  )
  done()
}

export default accountRoutes