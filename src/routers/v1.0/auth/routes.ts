import { FastifyPluginCallback } from 'fastify'
import { GenerateTokenBody } from './types'

const authRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.post<{
    Body: GenerateTokenBody
  }>(
    '/token',
    () => {}
  )
  done()
}

export default authRoutes