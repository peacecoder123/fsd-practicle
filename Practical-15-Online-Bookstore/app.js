const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const books = [
  { id: 1, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', price: 499 },
  { id: 2, title: 'You Don\'t Know JS', author: 'Kyle Simpson', price: 599 },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin', price: 799 },
  { id: 4, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', price: 899 },
  { id: 5, title: 'CSS: The Definitive Guide', author: 'Eric Meyer', price: 549 },
  { id: 6, title: 'Node.js Design Patterns', author: 'Mario Casciaro', price: 749 }
]

let cart = []

const layout = (body) => `<!DOCTYPE html>
<html><head><title>Online Bookstore</title>
<link rel="stylesheet" href="/style.css"></head>
<body>${body}</body></html>`

app.get('/', (req, res) => {
  const bookCards = books.map(b => `
    <div class="book-card">
      <h3>${b.title}</h3>
      <p>${b.author}</p>
      <p class="price">₹${b.price}</p>
      <form method="POST" action="/cart/add">
        <input type="hidden" name="id" value="${b.id}">
        <button>Add to Cart</button>
      </form>
    </div>`).join('')

  const cartRows = cart.map(item => `
    <tr>
      <td>${item.title}</td><td>${item.author}</td><td>₹${item.price}</td>
      <td>
        <form method="POST" action="/cart/remove" style="display:inline">
          <input type="hidden" name="id" value="${item.cartId}">
          <button class="btn-remove">Remove</button>
        </form>
      </td>
    </tr>`).join('')

  const total = cart.reduce((s, i) => s + i.price, 0)

  res.send(layout(`
    <h1>Online Bookstore</h1>
    <div class="books-grid">${bookCards}</div>
    <div class="cart">
      <h2>Cart (${cart.length} item${cart.length !== 1 ? 's' : ''})</h2>
      ${cart.length === 0 ? '<p>Your cart is empty.</p>' : `
        <table>
          <thead><tr><th>Title</th><th>Author</th><th>Price</th><th></th></tr></thead>
          <tbody>${cartRows}</tbody>
        </table>
        <p class="total">Total: ₹${total}</p>
        <form method="POST" action="/checkout">
          <button class="btn-checkout">Checkout</button>
        </form>`}
    </div>`))
})

app.post('/cart/add', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.body.id))
  if (book) cart.push({ ...book, cartId: Date.now() })
  res.redirect('/')
})

app.post('/cart/remove', (req, res) => {
  cart = cart.filter(i => i.cartId !== parseInt(req.body.id))
  res.redirect('/')
})

app.post('/checkout', (req, res) => {
  const total = cart.reduce((s, i) => s + i.price, 0)
  const count = cart.length
  cart = []
  res.send(layout(`
    <div class="success">
      <h2>Order Confirmed!</h2>
      <p>${count} book(s) purchased. Total paid: ₹${total}</p>
      <br><a href="/"><button>Continue Shopping</button></a>
    </div>`))
})

app.listen(3002, () => console.log('Bookstore running at http://localhost:3002'))
