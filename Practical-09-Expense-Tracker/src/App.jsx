import { useState } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Other']
const saved = JSON.parse(localStorage.getItem('expenses') || '[]')

function App() {
  const [expenses, setExpenses] = useState(saved)
  const [form, setForm] = useState({ name: '', amount: '', category: 'Food' })
  const [filter, setFilter] = useState('All')

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const add = e => {
    e.preventDefault()
    const updated = [...expenses, { ...form, amount: parseFloat(form.amount), id: Date.now() }]
    setExpenses(updated)
    localStorage.setItem('expenses', JSON.stringify(updated))
    setForm({ name: '', amount: '', category: 'Food' })
  }

  const del = id => {
    const updated = expenses.filter(e => e.id !== id)
    setExpenses(updated)
    localStorage.setItem('expenses', JSON.stringify(updated))
  }

  const filtered = filter === 'All' ? expenses : expenses.filter(e => e.category === filter)
  const total = expenses.reduce((s, e) => s + e.amount, 0)

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="total">Total: ₹{total.toFixed(2)}</div>

      <form onSubmit={add} className="card">
        <input name="name" placeholder="Expense name" value={form.name} onChange={change} required />
        <input name="amount" type="number" min="0.01" step="0.01" placeholder="Amount (₹)" value={form.amount} onChange={change} required />
        <select name="category" value={form.category} onChange={change}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <div className="filter">
        <label>Filter: </label>
        {['All', ...CATEGORIES].map(c => (
          <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? <p className="empty">No expenses found.</p> : (
        <table>
          <thead><tr><th>Name</th><th>Category</th><th>Amount</th><th></th></tr></thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td><td>{e.category}</td><td>₹{e.amount.toFixed(2)}</td>
                <td><button className="btn-del" onClick={() => del(e.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
