const fastify = require('fastify')
const app = fastify({
  logger: true
})

const server = fastify({logger: true})

app.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'app' }
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})

server.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'server' }
})

server.listen({ port: 5000 }, (err, address) => {
  if (err) throw err
})