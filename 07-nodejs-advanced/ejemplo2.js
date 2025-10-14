// --- Flujo síncrono ---
function sumaSync(a, b) {
  return a + b;
}

console.log("Suma síncrona:", sumaSync(2, 3));

// --- Flujo asíncrono con promesas ---
function sumaAsync(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 1000);
  });
}

sumaAsync(5, 7).then(resultado => {
  console.log("Suma asíncrona:", resultado);
});

console.log("Esperando resultado asíncrono...");
