function jugar(usuario) {
  const opciones = ["piedra", "papel", "tijeras"];
  const maquina = opciones[Math.floor(Math.random() * 3)];

  console.log("Tú:", usuario);
  console.log("Máquina:", maquina);

  if (usuario === maquina) return "Empate";
  if (
    (usuario === "piedra" && maquina === "tijeras") ||
    (usuario === "papel" && maquina === "piedra") ||
    (usuario === "tijeras" && maquina === "papel")
  ) {
    return "Ganaste";
  }
  return "Perdiste";
}

console.log(jugar("piedra"));
