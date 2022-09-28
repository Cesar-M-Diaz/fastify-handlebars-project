// to use esm
// 1st put this line in package.json
// {
//   "type": "module",
//   "dependencies": {
//     "fastify": "^4.6.0"
//   }
// }
// 2nd call modules with import
// import fastify from "fastify"

const fastify = require('fastify')
const fastifyStatic = require('@fastify/static')
const path = require('path')
const fs = require('fs')

const config = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const server = fastify({logger: config['development']})
// const server = fastify()

// load the plugin
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

server.get('/get-images', async (request, reply) => {
  const files = {
    'image/png': 'image.png',
    'image/gif': 'giffy.gif',
    'image/jpeg': 'fine.jpeg',
    'image/svg+xml': 'falcon.svg',
    'video/webm': 'planet.webm',
  }
  const randNum = Math.floor(Math.random() * 5)
  const contentType = Object.keys(files)[randNum]

  console.log(contentType, files[contentType])

  reply.type(contentType).code(200)
  return reply.sendFile(files[contentType])
})

server.post()

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})