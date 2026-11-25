function calculate(op) {
  const a = parseFloat(document.getElementById('num1').value);
  const b = parseFloat(document.getElementById('num2').value);
  const res = document.getElementById('result');
  if (isNaN(a) || isNaN(b)) { res.textContent = 'Enter valid numbers'; return; }
  if (op === '/' && b === 0) { res.textContent = 'Cannot divide by zero'; return; }
  const ans = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b;
  res.textContent = 'Result: ' + ans;
}
