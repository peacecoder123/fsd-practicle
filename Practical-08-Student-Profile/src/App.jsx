import { useState } from 'react'

const empty = { name: '', roll: '', course: '', email: '' }

function App() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = e => {
    e.preventDefault()
    if (editId !== null) {
      setStudents(students.map((s, i) => i === editId ? form : s))
      setEditId(null)
    } else {
      setStudents([...students, form])
    }
    setForm(empty)
  }

  const del = i => setStudents(students.filter((_, idx) => idx !== i))

  const startEdit = i => { setForm(students[i]); setEditId(i) }

  return (
    <div className="container">
      <h1>Student Profile Management</h1>
      <form onSubmit={submit} className="card">
        <input name="name" placeholder="Name" value={form.name} onChange={change} required />
        <input name="roll" placeholder="Roll Number" value={form.roll} onChange={change} required />
        <input name="course" placeholder="Course" value={form.course} onChange={change} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
        <button type="submit">{editId !== null ? 'Update' : 'Add Student'}</button>
        {editId !== null && <button type="button" onClick={() => { setEditId(null); setForm(empty) }}>Cancel</button>}
      </form>

      {students.length === 0 ? <p className="empty">No students added yet.</p> : (
        <table>
          <thead>
            <tr><th>Name</th><th>Roll</th><th>Course</th><th>Email</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td><td>{s.roll}</td><td>{s.course}</td><td>{s.email}</td>
                <td>
                  <button className="btn-edit" onClick={() => startEdit(i)}>Edit</button>
                  <button className="btn-del" onClick={() => del(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
