import { FastifyPluginCallback } from 'fastify'
import accountRoutes from './account/routes'
import concertRoutes from './concert/routes'

// api/v1
const apiV1Routes: FastifyPluginCallback = (instance, opts, done) => {
  // account route
  instance.register(accountRoutes, { 'prefix': "/account" })
  // concert route
  instance.register(concertRoutes, { prefix: '/concert' })
  done()
}

export default apiV1Routes