function adivinaNumero() {
  const numeroSecreto = Math.floor(Math.random() * 100) + 1;
  let intento;
  while (intento !== numeroSecreto) {
    intento = parseInt(prompt("Adivina el número (1-100): "));
    if (intento < numeroSecreto) console.log("Más alto");
    else if (intento > numeroSecreto) console.log("Más bajo");
    else console.log("¡Correcto!");
  }
}
