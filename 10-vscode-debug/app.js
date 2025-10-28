function greet(name) {
  const now = new Date();
  const timestamp = now.toLocaleString();
  return `Hola, ${name}! Son las ${timestamp}`;
}

function add(a, b) {
  return a + b;
}

module.exports = {
  greet,
  add,
};


