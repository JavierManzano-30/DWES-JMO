function invertirObjeto(obj) {
  const invertido = {};
  for (let clave in obj) {
    invertido[obj[clave]] = clave;
  }
  return invertido;
}

// Ejemplo:
console.log(invertirObjeto({ z: "q", w: "f" })); 
// ➝ { q: "z", f: "w" }
