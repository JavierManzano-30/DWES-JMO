function cuadrado(lado) {
  let figura = "";
  for (let i = 0; i < lado; i++) {
    figura += "* ".repeat(lado) + "\n";
  }
  console.log(figura);
}

function triangulo(n) {
  let figura = "";
  for (let i = 1; i <= n; i++) {
    figura += "* ".repeat(i) + "\n";
  }
  console.log(figura);
}

cuadrado(4);
triangulo(5);
