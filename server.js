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

// const server = fastify({logger: true})
const server = fastify()

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
  const randKey = Object.keys(files)[randNum]

  console.log(randKey, files[randKey])

  reply.type(randKey).code(200)
  return reply.sendFile(files[randKey])
})

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})