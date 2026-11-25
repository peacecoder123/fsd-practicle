const questions = [
  { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language","High Text Machine Language","Hyper Tool Multi Language","None"], ans: 0 },
  { q: "Which language is used for styling web pages?", opts: ["HTML","JavaScript","CSS","Python"], ans: 2 },
  { q: "Which tag is used for the largest heading?", opts: ["<h6>","<h1>","<head>","<title>"], ans: 1 },
  { q: "What does CSS stand for?", opts: ["Colorful Style Sheets","Creative Style Sheets","Cascading Style Sheets","Computer Style Sheets"], ans: 2 },
  { q: "Which company developed JavaScript?", opts: ["Microsoft","Google","Netscape","Apple"], ans: 2 }
];

let current = 0, score = 0, answered = false;

function load() {
  answered = false;
  document.getElementById('progress').textContent = `Question ${current + 1} / ${questions.length}`;
  document.getElementById('question').textContent = questions[current].q;
  const opts = document.getElementById('options');
  opts.innerHTML = '';
  questions[current].opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => select(btn, i);
    opts.appendChild(btn);
  });
  document.getElementById('next-btn').style.display = 'none';
}

function select(btn, i) {
  if (answered) return;
  answered = true;
  const correct = questions[current].ans;
  document.querySelectorAll('.options button').forEach((b, idx) => {
    b.disabled = true;
    if (idx === correct) b.className = 'correct';
  });
  if (i === correct) { btn.className = 'correct'; score++; }
  else { btn.className = 'wrong'; }
  document.getElementById('next-btn').style.display = 'block';
}

function next() {
  current++;
  if (current < questions.length) { load(); }
  else {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result-box').style.display = 'block';
    document.getElementById('score-text').textContent = `You scored ${score} out of ${questions.length}`;
  }
}

function restart() {
  current = 0; score = 0;
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('result-box').style.display = 'none';
  load();
}

load();
