function fibonacci(n) {
  if (n < 0) return null;
  if (n <= 1) return n;

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i += 1) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}

module.exports = { fibonacci };
