function objetosIguales(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
    return false;
  }

  const claves1 = Object.keys(obj1);
  const claves2 = Object.keys(obj2);

  if (claves1.length !== claves2.length) return false;

  for (let clave of claves1) {
    if (!claves2.includes(clave) || !objetosIguales(obj1[clave], obj2[clave])) {
      return false;
    }
  }
  return true;
}

// Ejemplos:
console.log(objetosIguales({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(objetosIguales({ a: 1 }, { a: 2 })); // false
