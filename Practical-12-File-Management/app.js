const fs = require('fs')
const path = require('path')

const file = 'sample.txt'
const renamed = 'renamed.txt'

console.log('=== File Management Application ===\n')

fs.writeFileSync(file, 'Hello, Node.js!')
console.log('1. Created and wrote file:', file)

const content = fs.readFileSync(file, 'utf8')
console.log('2. Read file content:', content)

fs.appendFileSync(file, '\nAppended line.')
console.log('3. Appended content to file.')

console.log('4. Updated content:', fs.readFileSync(file, 'utf8'))

fs.renameSync(file, renamed)
console.log('5. Renamed to:', renamed)

const files = fs.readdirSync('.')
console.log('6. Files in directory:', files.filter(f => f.endsWith('.txt') || f.endsWith('.js') || f.endsWith('.json')))

fs.unlinkSync(renamed)
console.log('7. Deleted:', renamed)

console.log('\nAll file operations completed successfully.')
