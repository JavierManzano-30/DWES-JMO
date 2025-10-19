function objetoAClavesYValores(obj) {
  return [Object.keys(obj), Object.values(obj)];
}

// Ejemplo:
console.log(objetoAClavesYValores({ a: 1, b: 2, c: 3 }));
// ➝ [["a", "b", "c"], [1, 2, 3]]
