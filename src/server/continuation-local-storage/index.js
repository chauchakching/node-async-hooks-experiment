const express = require('express')
const app = express()
const createNamespace = require('continuation-local-storage').createNamespace
const session = createNamespace('my session')
const log = require('./log')

app.get('/name/:name', async function (req, res) {
  const { name } = req.params

  console.log('got request from', name)

  session.run(async function () {
    session.set('user', name)
    const wait = t => new Promise(resolve => setTimeout(resolve, t))
    await wait(1000)
    console.log('session user after wait:', session.get('user'))

    log(name)

    res.send(name)
  })
})
app.listen(3333)

console.log('starting server 1 (continuation-local-storage)...')
