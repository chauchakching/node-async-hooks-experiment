const axios = require('axios')

const names = [
  'john', 
  'mary', 
  'peter', 
  // 'alice', 
  // 'bob', 
  // 'ella',
]

async function start () {
  const responses = await Promise.all(
    // [
    //   axios.get('http://localhost:3333/name/john'),
    //   axios.get('http://localhost:3333/name/mary'),
    //   axios.get('http://localhost:3333/name/peter')
    // ]
    names.map(name => axios.get(`http://localhost:3333/name/${name}`))
  )
  console.log(responses.map(r => r.data))
}

start()
