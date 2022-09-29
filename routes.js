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
  
  server.post('/post-info', (req, reply) => {
    const obj = JSON.parse(req.body)
    const { name, email } = obj
    reply.code(200).send(`name is: ${name}, email is: ${email}`)
  })

  done()
}

module.exports = routes