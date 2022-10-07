const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer((req, res) => {
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

  const filePath = path.join(__dirname, 'public', files[contentType])

  // fs.readFile(filePath, (err, content) => {
  //   res.writeHead(200, { "Content-type": contentType })
  //   res.end(content, 'utf8')
  // })

  fs.createReadStream.apply(filePath).pipe(res)

})

server.listen(3001, (err, address) => {
  if (err) throw err
})