const AsyncHooks = require('async_hooks')
const { logSync, prettyJson } = require('../../util')
const storage = require('./storage')

module.exports = function(...args) {
  // const name = session.get('user')
  // logSync(`context`, prettyJson(storage.context))
  // logSync(`linkage`, prettyJson(storage.asyncLinkage))
  logSync(`log (${storage.get(AsyncHooks.executionAsyncId())})`, `execution: ${AsyncHooks.executionAsyncId()}`, ...args)
}