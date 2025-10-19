function esAnagrama(palabra1, palabra2) {
  // Convertir a minúsculas para evitar problemas de mayúsculas/minúsculas
  const p1 = palabra1.toLowerCase();
  const p2 = palabra2.toLowerCase();

  // Si son exactamente iguales, no es un anagrama
  if (p1 === p2) return false;

  // Ordenamos las letras y comparamos
  const ordenada1 = p1.split('').sort().join('');
  const ordenada2 = p2.split('').sort().join('');

  return ordenada1 === ordenada2;
}

// Ejemplos:
console.log(esAnagrama("roma", "amor"));    // true
console.log(esAnagrama("listen", "silent")); // true
console.log(esAnagrama("hola", "halo"));     // true
console.log(esAnagrama("hola", "hola"));     // false
console.log(esAnagrama("casa", "saco"));     // true
console.log(esAnagrama("raton", "torna"));   // true
