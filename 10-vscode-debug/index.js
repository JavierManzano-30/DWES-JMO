const { greet, add } = require('./app');

function main() {
  const args = process.argv.slice(2);
  const name = args[0] || 'Mundo';
  const a = Number(args[1] || 2);
  const b = Number(args[2] || 3);

  const message = greet(name);
  console.log(message);

  const sum = add(a, b);
  console.log(`Suma: ${a} + ${b} = ${sum}`);
}

if (require.main === module) {
  main();
}

module.exports = { main };


