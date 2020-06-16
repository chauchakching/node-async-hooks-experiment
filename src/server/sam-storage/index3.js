const express = require('express')
const app = express()
const path = require('path')
// const xxxx = require('./xxxx')
// const createNamespace = require('continuation-local-storage').createNamespace
// const session = createNamespace('my session')
const storage = require('./storage')
const middle = require('./middle')

app.get('/:name', async function(req, res, next) {
  const {name} = req.params
  console.log(name)
  
  storage.setHaha('name', name)
  const wait = t => new Promise(resolve => setTimeout(resolve, t))
  await wait(200)


  console.log()
  next()
}, middle)
app.listen(3333)

console.log('starting server 3...')
