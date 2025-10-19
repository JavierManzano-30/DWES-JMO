function objetoAArray(obj) {
  return Object.entries(obj);
}

// Ejemplo:
console.log(objetoAArray({ a: 1, b: 2 })); 
// ➝ [["a", 1], ["b", 2]]
