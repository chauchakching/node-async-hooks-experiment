const express = require('express')

const app = express()

const port = 3333

let idSeq = 0

function logWithIdInReq(req, msg) {
  const {id} = req
  _logWithLog(id, msg)
}

function _logWithLog(id, msg) {
  // console.log(`id: ${id}, ${msg}`)
}

function server() {
  app.get('/req', function(req, res) {
    _logWithLog(idSeq++, 'going to send pong')
    res.send('pong')
  })

}

server()

app.listen(port)

console.log(`starting server (performance benchmark: simple) on port ${port} ...`)