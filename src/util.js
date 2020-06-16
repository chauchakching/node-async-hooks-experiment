const fs = require('fs')
const path = require('path')

const logFilePath = path.join(__dirname, 'log.output')

module.exports = {
  wait: t => new Promise(resolve => setTimeout(resolve, t)),
  clearLogSync: () => fs.writeFileSync(logFilePath, ''),
  logSync: (...args) => {
    fs.appendFileSync(logFilePath, args.map(String).join(' ') + '\n')
  },
  last: arr => arr[arr.length - 1],
  prettyJson: x => JSON.stringify(x, null, '  ')
}
