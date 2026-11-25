import { useState } from 'react'

const empty = { name: '', email: '', message: '', rating: '5' }

function App() {
  const [feedbacks, setFeedbacks] = useState([])
  const [form, setForm] = useState(empty)

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = e => {
    e.preventDefault()
    setFeedbacks([...feedbacks, { ...form, rating: parseInt(form.rating), id: Date.now() }])
    setForm(empty)
  }

  const del = id => setFeedbacks(feedbacks.filter(f => f.id !== id))

  const avg = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : 0

  return (
    <div className="container">
      <h1>Feedback Collection</h1>

      <form onSubmit={submit} className="card">
        <input name="name" placeholder="Your Name" value={form.name} onChange={change} required />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={change} required />
        <textarea name="message" placeholder="Your Feedback" value={form.message} onChange={change} required rows="3" />
        <div className="rating-row">
          <label>Rating:</label>
          <select name="rating" value={form.rating} onChange={change}>
            {[1,2,3,4,5].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>

      {feedbacks.length > 0 && (
        <div className="avg">Average Rating: {avg} / 5 ({feedbacks.length} review{feedbacks.length > 1 ? 's' : ''})</div>
      )}

      {feedbacks.map(f => (
        <div className="feedback-card" key={f.id}>
          <div className="fb-header">
            <strong>{f.name}</strong>
            <span className="stars">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span>
            <button className="btn-del" onClick={() => del(f.id)}>Delete</button>
          </div>
          <p className="email">{f.email}</p>
          <p>{f.message}</p>
        </div>
      ))}

      {feedbacks.length === 0 && <p className="empty">No feedback submitted yet.</p>}
    </div>
  )
}

export default App
