const express = require('express')
const path = require('path')
const AsyncHooks = require('async_hooks')
const { exec, spawn } = require('child_process')
const { wait, logSync, clearLogSync, last, prettyJson} = require('../../util')
const log = require('./log')
const storage = require('./storage')

const app = express()

const context = {}
let indent = 0

function server() {
  app.get('/name/:name', async function (req, res) {
    const { name } = req.params
    logSync('-------------------------------')
    logSync(`--- got request from ${name} ---`)
    logSync('-------------------------------')

    asyncHook.enable()

    logSync(`execution: ${AsyncHooks.executionAsyncId()}`)

    storage.set(AsyncHooks.executionAsyncId(), name)
    // session.set('user', name)
    // logSync(`request ${name} : before wait()`)
    // asyncHook.disable()

    // await wait(100)

    setTimeout(() => {
      log(name)

      logSync(`request ${name} : before res.send()`)
      res.send(name)
      logSync(`request ${name} : after res.send()`)


      logSync('-------------------------------')
      logSync(`--- end request for ${name} ---`)
      logSync('-------------------------------')

      logSync('storage linkages', prettyJson(storage.asyncLinkage))
      logSync('storage context', prettyJson(storage.context))
    }, 100)

    asyncHook.disable()


    // asyncHook.enable()
    // logSync(`request ${name} : triggerAsyncId ${AsyncHooks.triggerAsyncId()}`)
    // logSync(`request ${name} : after wait()`)

  })
}

// asyncHook.disable()

const init = requestId => (id, type, triggerAsyncId, resource) => {
  // logSync(`request ${requestId} : init(${id}, ${type}, ${triggerAsyncId}, ${resource})`)
  const indentStr = ' '.repeat(indent)
  logSync(`${indentStr}request ${requestId} : ${type}(${id}): trigger: ${triggerAsyncId} execution: ${AsyncHooks.executionAsyncId()}`)
  // logSync(`set storage linkage ${id}:${triggerAsyncId}`)
  storage.setParent(id, triggerAsyncId)
}
const before = requestId => (id) => {
  const indentStr = ' '.repeat(indent)
  logSync(`${indentStr}request ${requestId} : before(${id})`)
  indent += 2
}
const after = requestId => (id) => {
  // indent -= 2
  indent = Math.max(0, indent-2)
  const indentStr = ' '.repeat(indent)
  logSync(`${indentStr}request ${requestId} : after(${id})`)
}
const destroy = requestId => (id) => {
  logSync(`request ${requestId} : destroy(${id})`)
}
const promiseResolve = requestId => (id) => {
  logSync(`request ${requestId} : promiseResolve(${id})`)
}

const asyncHook = AsyncHooks.createHook({
  init: init(''),
  before: before(''),
  after: after(''),
  // destroy: destroy(name),
  promiseResolve: promiseResolve(''),
})

server()

clearLogSync()
app.listen(3333)

// console.log('starting server (node 14)...')

// run client
exec(`node ${path.join(__dirname, '..', '..', 'client')}`)
