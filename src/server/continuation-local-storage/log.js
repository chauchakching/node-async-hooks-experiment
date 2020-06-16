
const getNamespace = require('continuation-local-storage').getNamespace
const session = getNamespace('my session')

module.exports = function(name) {
  const nameFromSession = session.get('user')
  console.log('session name: ', nameFromSession, ', req name: ', name)
}