const AsyncHooks = require('async_hooks')

const context = {}

const asyncLinkage = {}

const get = id => {
  const parentId = asyncLinkage[id]
  if (!parentId) return context[id]
  return get(parentId)
}

const set = (id, value) => {
  const parentId = asyncLinkage[id]
  if (parentId) {
    set(parentId, value)
  } else {
    context[id] = value
  }
}

module.exports = {
  get,
  set,
  setParent: (id, parentId) => {
    if (!parentId) return
    asyncLinkage[id] = String(parentId)
  },
  asyncLinkage,
  context,
}