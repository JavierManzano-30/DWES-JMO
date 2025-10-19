function mismoNumeroXO(texto) {
  const x = texto.match(/x/gi)?.length || 0;
  const o = texto.match(/o/gi)?.length || 0;
  return x === o;
}

console.log(mismoNumeroXO("xxoo")); // true
console.log(mismoNumeroXO("xooxx")); // false
