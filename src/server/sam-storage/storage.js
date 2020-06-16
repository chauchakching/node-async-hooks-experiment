const storage = {}

class Storage {
  constructor(namespace) {
    this.item = {}
  }

  get(key) {
    return this.item[key]
  }

  set(key, v) {
    this.item[key] = v

    return this.item[key]
  }
}

module.exports = (namespace) => {
  storageA = new Storage(namespace)
  
  return storageA
}