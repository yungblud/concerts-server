import Fastify from 'fastify'
import apiV1Routes from './routers/v1.0/routes'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.register(apiV1Routes, {'prefix': '/v1.0'})

// Run the server!
try {
  fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}