const users = require('./users.json')
const { writeFile } = require('node:fs')
const { readFile } = require('node:fs/promises')
const { join } = require('node:path')
const { postInfoOpts, userIdOpts } = require('./schemas')

function routes (server, options, done) {
  
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
  
  server.post('/user', postInfoOpts, (req, reply) => {
    const { name, email } = req.body

    const user = {
      id: users.length + 1,
      name,
      email
    }

    users.push(user)

    writeFile(join(__dirname, 'users.json'), JSON.stringify(users), (error) => {
      if (error) {
        req.log.error(error)
      }
    })

    reply.redirect(302, `/user/${(users.length)}`)
  })

  server.get('/user/:id', userIdOpts, async (req, reply) => {
    const { id } = req.params
    const result = await readFile(join(__dirname, 'users.json'), 'utf8')
    const lastUser = JSON.parse(result)[id - 1]
    if (lastUser) {
      return reply.view('response.hbs', { user: lastUser })
    } else {
      return reply.code(404).view('error.hbs', { userNotFound: true, message: "User not found" } )
    }
  })

  server.get('/', (req, reply) => {
    reply.code(200).view('form.hbs')
  })

  server.get('/users', async (req, reply) => {
    const users = await readFile(join(__dirname, 'users.json'), 'utf8')
    const parsedUsers = JSON.parse(users)
    return reply.code(200).view('response.hbs', { users: parsedUsers })
  })

  // server.delete('/users/:id', (req, reply) => {
  //   const { id } = req.params
  //   const filteredUsers = users.filter(user => Number(id) !== user.id)

  //   writeFile(join(__dirname, 'users.json'), JSON.stringify(filteredUsers), (error) => {
  //     if (error) {
  //       req.log.error(error)
  //     }
  //   })
  
  //   reply.redirect(302, '/')
  // })

  // server.put('users/:id', (req, reply) => {
    
  // })

  server.setErrorHandler((error, req, reply) => {
    reply.code(error.statusCode).view('error.hbs', { code: error.statusCode, message: error.validation[0].message })
  })

  server.setNotFoundHandler((req, reply) => {
    reply.code(404).view('error.hbs', { pageNotFound: true })
  })

  done()
}

module.exports = routes