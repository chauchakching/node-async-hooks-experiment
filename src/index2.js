const express = require('express')
const app = express()
const path = require('path')

app.get('/1', function (req, res) {
  res.cookie('a', '1')
  res.send('Hello World')
})
app.get('/payment/2', function (req, res) {
  res.header('Set-Cookie', 'a=2')
  res.send('Hello World')
})

app.get('/payment', function (req, res) {
  res.send('/payment')
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/form', function (req, res) {
  res.header('Set-Cookie', 'a=33')
  // res.cookie('a', '3', {
  //   expires: new Date(Date.now() + 60*60*24),
  //   sameSite: 'Lax',
  //   httpOnly: true,
  //   // secure: false,
  // })

  res.redirect(307, '/exit')
})

app.post('/exit', function (req, res) {
  console.log('cookies', req.cookies)
  res.send('exit')
})

app.get('/me', function(req, res) {
  res.send('server 2')
})

app.listen(3333)

console.log('starting server 2...')