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
const path = require('path')

const config = {
  development: {
    transport: {
      target: 'pino-pretty'
    },
  },
  production: true,
  test: false,
}

const server = fastify({logger: config['development']})
// const server = fastify()

// load the plugin
server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public')
})

server.register(require('./routes'))

server.listen({ port: 3001 }, (err, address) => {
  if (err) throw err
})