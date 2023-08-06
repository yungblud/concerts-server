import { FastifyPluginCallback } from 'fastify'
import { GenerateTokenBody, GenerateTokenReply } from './types'
import { handleGenerateToken } from './handlers'

const authRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.post<{
    Body: GenerateTokenBody
    Reply: GenerateTokenReply
  }>(
    '/token',
    handleGenerateToken
  )
  done()
}

export default authRoutes