import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="container">
      <h1>Basic React Application</h1>
      <p>This app demonstrates JSX, useState and event handling.</p>

      <div className="card">
        <h2>Counter</h2>
        <p>Count: <strong>{count}</strong></p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <div className="card">
        <h2>Greeting</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {name && <p>Hello, <strong>{name}</strong>! Welcome to React.</p>}
      </div>
    </div>
  )
}

export default App
