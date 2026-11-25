const fs = require('fs')

console.log('=== Async & Event Loop Demo ===\n')

console.log('1. START (synchronous)')

setTimeout(() => console.log('4. setTimeout callback (async - 0ms)'), 0)

console.log('2. After setTimeout registration (synchronous)')

function fetchData(callback) {
  setTimeout(() => callback(null, 'Data loaded!'), 500)
}

fetchData((err, data) => {
  if (err) console.log('Error:', err)
  else console.log('5. Callback result:', data)
})

const p = new Promise((resolve) => {
  setTimeout(() => resolve('Promise resolved!'), 300)
})

p.then(val => console.log('6. Promise .then():', val))

console.log('3. END of synchronous code (event loop will handle async)')

fs.writeFileSync('temp_async.txt', 'async file content')
fs.readFile('temp_async.txt', 'utf8', (err, data) => {
  if (!err) console.log('7. Async file read:', data)
  fs.unlinkSync('temp_async.txt')
})

async function demo() {
  const result = await new Promise(resolve => setTimeout(() => resolve('Async/Await done!'), 800))
  console.log('8. Async/Await result:', result)
  console.log('\n=== Execution Order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 ===')
}

demo()
