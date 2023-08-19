import { FastifyPluginCallback } from 'fastify'
import { CreateConcertBodyType } from './types'
import { handleCreateConcert, handleOnRequestCreateConcert } from './handlers'

const concertRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Body: CreateConcertBodyType
  }>({
    'method': 'POST',
    'url': '/',
    onRequest: handleOnRequestCreateConcert,
    handler: handleCreateConcert,
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