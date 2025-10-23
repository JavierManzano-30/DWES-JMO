const chalk = require('chalk');

const args = process.argv.slice(2);
const color = args[0];
const text = args.slice(1).join(' ');

if (!color || !text) {
  console.error('Uso: npm run imprime:azul -- "texto"');
  process.exit(1);
}

const map = {
  azul: 'blue',
  rojo: 'red',
  verde: 'green'
};

const fnName = map[color];
if (!fnName || typeof chalk[fnName] !== 'function') {
  console.error('Color no soportado. Usa: azul, rojo o verde');
  process.exit(1);
}

console.log(chalk[fnName](text));