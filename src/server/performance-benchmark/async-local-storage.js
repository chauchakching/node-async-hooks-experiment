const { AsyncLocalStorage } = require('async_hooks')
const express = require('express')

const app = express()
const asyncLocalStorage = new AsyncLocalStorage()

const port = 3335

let idSeq = 0

function logWithIdInAsyncLocalStorage(msg) {
  const id = asyncLocalStorage.getStore()
  _logWithLog(id, msg)
}

function _logWithLog(id, msg) {
  // console.log(`id: ${id}, ${msg}`)
}

function server() {
  app.get('/async', function(req, res) {
    asyncLocalStorage.run(idSeq++, () => {
      logWithIdInAsyncLocalStorage('going to send pong')
      res.send('pong')
    })
  })
}

server()

app.listen(port)

console.log(`starting server (performance benchmark: async local storage) on port ${port} ...`)