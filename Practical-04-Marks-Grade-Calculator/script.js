function calculate() {
  const name = document.getElementById('name').value.trim();
  const subjects = ['s1','s2','s3','s4','s5'].map(id => parseFloat(document.getElementById(id).value));
  const res = document.getElementById('result');

  if (!name) { res.innerHTML = '<p>Enter student name.</p>'; return; }
  if (subjects.some(m => isNaN(m) || m < 0 || m > 100)) {
    res.innerHTML = '<p style="color:red">All marks must be between 0 and 100.</p>'; return;
  }

  const total = subjects.reduce((a, b) => a + b, 0);
  const max = 500;
  const percentage = (total / max * 100).toFixed(2);
  const grade = percentage >= 90 ? 'O' : percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' :
                percentage >= 60 ? 'B+' : percentage >= 50 ? 'B' : percentage >= 40 ? 'C' : 'F';
  const passed = percentage >= 40 && subjects.every(m => m >= 35);

  res.innerHTML = `
    <p>Student: ${name}</p>
    <p>Total: ${total} / ${max}</p>
    <p>Percentage: ${percentage}%</p>
    <p>Grade: ${grade}</p>
    <p class="${passed ? 'pass' : 'fail'}">${passed ? 'PASS' : 'FAIL'}</p>
  `;
}
