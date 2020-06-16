const axios = require('axios')

async function start () {
  console.log('run client 2...')
  const responses = await Promise.all([
    axios.get('http://localhost:3333/john'),
    axios.get('http://localhost:3333/mary'),
    axios.get('http://localhost:3333/peter')
  ])
  console.log(responses.map(r => r.data))
}

start()
