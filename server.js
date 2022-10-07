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

// const server = fastify({
//   logger: {
//     transport: {
//       target: 'pino-pretty'
//     }
//   }
// })
const server = fastify()

server.register(require('@fastify/cors'), { origin: 'http://localhost:5173' })

server.register(require('@fastify/formbody'))

// load the plugin
server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public')
})

server.register(require("@fastify/view"), {
  root: path.join(__dirname, "views"),
  engine: {
    handlebars: require("handlebars"),
  },
  layout: 'layouts/index.hbs',
  options: {
    partials: {
      header: 'partials/header.hbs',
      footer: 'partials/footer.hbs'
    }
  } 
})

// routes get loaded as plugins
server.register(require('./routes'))

server.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
})