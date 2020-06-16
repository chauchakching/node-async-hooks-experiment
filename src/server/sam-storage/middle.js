const storage = require('./storage')

module.exports = (req, res, next) => {
  const name = storage.getHaha('name')
  console.log('name from req:', req.params.name, ', name from storage:', name)
  
  res.send({name})
}