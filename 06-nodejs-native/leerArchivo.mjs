
const fs = require("fs");

const archivo = process.argv[2];

if (!archivo) {
  console.log("❌ Debes indicar un archivo. Ejemplo: node leerArchivo.js archivo.txt");
  process.exit();
}

fs.readFile(archivo, "utf8", (err, data) => {
  if (err) {
    console.log("❌ Error al leer el archivo:", err.message);
    return;
  }
  console.log("📄 Contenido del archivo:");
  console.log(data);
});
