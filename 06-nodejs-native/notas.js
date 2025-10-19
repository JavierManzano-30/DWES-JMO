const fs = require("fs");
const readline = require("readline");
const path = require("path");
const notasDir = "./notas";

if (!fs.existsSync(notasDir)) fs.mkdirSync(notasDir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log(`
📒 EDITOR DE NOTAS
1. Crear nueva nota
2. Editar nota existente
3. Eliminar nota
4. Salir`);
  rl.question("Selecciona una opción: ", (op) => {
    if (op === "1") crearNota();
    else if (op === "2") editarNota();
    else if (op === "3") eliminarNota();
    else if (op === "4") rl.close();
    else menu();
  });
}

function crearNota() {
  rl.question("Nombre de la nota: ", (nombre) => {
    const ruta = path.join(notasDir, `${nombre}.note`);
    escribirNota(ruta, "");
  });
}

function editarNota() {
  const notas = fs.readdirSync(notasDir).filter(f => f.endsWith(".note"));
  if (notas.length === 0) return console.log("No hay notas."), menu();

  console.log("📂 Notas disponibles:");
  notas.forEach((f, i) => console.log(`${i + 1}. ${f}`));

  rl.question("Selecciona número: ", (num) => {
    const index = num - 1;
    if (notas[index]) {
      const ruta = path.join(notasDir, notas[index]);
      const contenido = fs.readFileSync(ruta, "utf8");
      console.log("✏ Editando (doble Enter para terminar)\n", contenido);
      escribirNota(ruta, contenido);
    } else menu();
  });
}

function eliminarNota() {
  const notas = fs.readdirSync(notasDir);
  console.log("📂 Notas:");
  notas.forEach((f, i) => console.log(`${i + 1}. ${f}`));

  rl.question("Número de nota a eliminar: ", (num) => {
    const archivo = notas[num - 1];
    if (archivo) {
      fs.unlinkSync(path.join(notasDir, archivo));
      console.log("✅ Nota eliminada.");
    }
    menu();
  });
}

function escribirNota(ruta, contenidoInicial) {
  let contenido = contenidoInicial;
  let blancos = 0;

  rl.on("line", (linea) => {
    if (linea === "") blancos++;
    else blancos = 0;

    if (blancos === 2) {
      fs.writeFileSync(ruta, contenido);
      console.log("✅ Nota guardada.");
      rl.removeAllListeners("line");
      return menu();
    }
    contenido += linea + "\n";
  });
}

menu();
