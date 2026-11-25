const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

let students = []
let nextId = 1

const html = (body) => `<!DOCTYPE html>
<html><head><title>Student Management</title>
<link rel="stylesheet" href="/style.css"></head>
<body>${body}</body></html>`

app.get('/', (req, res) => {
  const rows = students.map(s => `
    <tr>
      <td>${s.id}</td><td>${s.name}</td><td>${s.roll}</td><td>${s.course}</td><td>${s.email}</td>
      <td>
        <form method="POST" action="/delete/${s.id}" style="display:inline">
          <button class="btn-del">Delete</button>
        </form>
        <a href="/edit/${s.id}"><button class="btn-edit">Edit</button></a>
      </td>
    </tr>`).join('')

  res.send(html(`
    <h1>Student Management</h1>
    <form method="POST" action="/add">
      <input name="name" placeholder="Name" required>
      <input name="roll" placeholder="Roll Number" required>
      <input name="course" placeholder="Course" required>
      <input name="email" type="email" placeholder="Email" required>
      <button type="submit">Add Student</button>
    </form>
    <table>
      <thead><tr><th>ID</th><th>Name</th><th>Roll</th><th>Course</th><th>Email</th><th>Actions</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`))
})

app.post('/add', (req, res) => {
  const { name, roll, course, email } = req.body
  if (!name || !roll || !course || !email) return res.send(html('<p class="error">All fields required. <a href="/">Go back</a></p>'))
  students.push({ id: nextId++, name, roll, course, email })
  res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
  const s = students.find(s => s.id === parseInt(req.params.id))
  if (!s) return res.redirect('/')
  res.send(html(`
    <h1>Edit Student</h1>
    <form method="POST" action="/update/${s.id}">
      <input name="name" value="${s.name}" required>
      <input name="roll" value="${s.roll}" required>
      <input name="course" value="${s.course}" required>
      <input name="email" type="email" value="${s.email}" required>
      <button type="submit">Update</button>
      <a href="/"><button type="button">Cancel</button></a>
    </form>`))
})

app.post('/update/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name, roll, course, email } = req.body
  students = students.map(s => s.id === id ? { ...s, name, roll, course, email } : s)
  res.redirect('/')
})

app.post('/delete/:id', (req, res) => {
  students = students.filter(s => s.id !== parseInt(req.params.id))
  res.redirect('/')
})

app.listen(3001, () => console.log('Server running at http://localhost:3001'))
