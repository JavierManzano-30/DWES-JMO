const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());

const status = {
  name: "despliegue-aplicacion",
  version: "1.0.0",
  status: "ok",
  time: () => new Date().toISOString()
};

const tareas = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.type("text").send("API activa. Usa /health o /tareas");
});

app.get("/health", (req, res) => {
  res.json({
    name: status.name,
    version: status.version,
    status: status.status,
    time: status.time()
  });
});

app.get("/tareas", (req, res) => {
  res.json(tareas);
});

app.post("/tareas", (req, res) => {
  const { titulo, descripcion } = req.body || {};
  if (!titulo || !descripcion) {
    return res.status(400).json({ error: "titulo y descripcion son obligatorios" });
  }
  const nueva = {
    id: nextId++,
    titulo: String(titulo).trim(),
    descripcion: String(descripcion).trim(),
    creadaEn: new Date().toISOString()
  };
  tareas.unshift(nueva);
  res.status(201).json(nueva);
});

app.delete("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id invalido" });
  }
  const index = tareas.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "tarea no encontrada" });
  }
  const [deleted] = tareas.splice(index, 1);
  res.json(deleted);
});

app.use((req, res) => {
  res.status(404).json({ error: "ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
