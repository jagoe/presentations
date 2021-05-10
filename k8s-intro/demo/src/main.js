const http = require('http')

http
  .createServer((_req, res) => {
    res.write('Hello World!')
    res.end()
  })
  .listen(80)
