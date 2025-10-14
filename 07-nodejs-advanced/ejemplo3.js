const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, 'texto.txt');

// Creamos un archivo de prueba
fs.writeFileSync(ruta, 'Hola desde NodeJS!');

// --- Lectura SÍNCRONA ---
console.log("Lectura síncrona:");
const contenidoSync = fs.readFileSync(ruta, 'utf-8');
console.log(contenidoSync);

// --- Lectura ASÍNCRONA ---
console.log("\nLectura asíncrona:");
fs.readFile(ruta, 'utf-8', (err, contenidoAsync) => {
  if (err) throw err;
  console.log(contenidoAsync);
});
