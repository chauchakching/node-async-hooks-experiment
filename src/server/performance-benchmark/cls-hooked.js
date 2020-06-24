const express = require('express')
const {createNamespace} = require('cls-hooked')

const app = express()
const session = createNamespace('my-session')

const port = 3334

let idSeq = 0

function logWithId(msg) {
  const id = session.get('id')
  _logWithid(id, msg)
}

function _logWithid(id, msg) {
  // console.log(`id: ${id}, ${msg}`)
}

function server() {
  app.get('/cls', function(req, res) {
    session.run(() => {
      session.set('id', idSeq++)
      logWithId('going to send pong')
      res.send('pong')
    })
  })
}

server()

app.listen(port)

console.log(`starting server (performance benchmark: cls-hooked) on port ${port} ...`)