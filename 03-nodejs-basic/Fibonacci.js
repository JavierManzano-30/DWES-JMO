function fibonacci(limite) {
  let a = 0, b = 1;
  const serie = [a, b];
  while (b < limite) {
    let siguiente = a + b;
    if (siguiente > limite) break;
    serie.push(siguiente);
    a = b;
    b = siguiente;
  }
  return serie;
}

console.log(fibonacci(100));
