let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function render() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    li.innerHTML = `
      <span>${t.text}</span>
      <button class="btn-done" onclick="toggle(${i})">${t.done ? 'Undo' : 'Done'}</button>
      <button class="btn-edit" onclick="edit(${i})">Edit</button>
      <button class="btn-del" onclick="remove(${i})">Delete</button>
    `;
    list.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function add() {
  const inp = document.getElementById('task-input');
  const text = inp.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  inp.value = '';
  render();
}

function toggle(i) { tasks[i].done = !tasks[i].done; render(); }

function edit(i) {
  const text = prompt('Edit task:', tasks[i].text);
  if (text && text.trim()) { tasks[i].text = text.trim(); render(); }
}

function remove(i) { tasks.splice(i, 1); render(); }

render();
