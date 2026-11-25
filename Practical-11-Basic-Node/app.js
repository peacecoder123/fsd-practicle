const os = require('os')
const path = require('path')

console.log('=== Basic Node.js Application ===')
console.log('Node.js Version:', process.version)
console.log('Platform:', process.platform)
console.log('Architecture:', process.arch)

console.log('\n--- OS Module ---')
console.log('OS Type:', os.type())
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024) + ' MB')
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024) + ' MB')
console.log('Home Directory:', os.homedir())

console.log('\n--- Path Module ---')
const filePath = '/user/projects/app.js'
console.log('File Path:', filePath)
console.log('Directory:', path.dirname(filePath))
console.log('Basename:', path.basename(filePath))
console.log('Extension:', path.extname(filePath))

console.log('\n--- Process Info ---')
console.log('Process ID:', process.pid)
console.log('Current Directory:', process.cwd())
console.log('Uptime:', process.uptime().toFixed(2) + 's')
