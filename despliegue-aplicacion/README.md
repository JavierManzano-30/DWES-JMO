# Despliegue Aplicacion (Render)

API REST sencilla en Node + Express, sin base de datos. Usa memoria en proceso.

## Rutas
- `GET /` -> texto simple
- `GET /health` -> estado y hora
- `GET /tareas` -> lista de tareas
- `POST /tareas` -> crea tarea `{ "titulo": "", "descripcion": "" }`
- `DELETE /tareas/:id` -> elimina por id

## Ejecucion local
```bash
npm install
npm run dev
```

## Despliegue en Render
1. Crear un nuevo servicio `Web Service`.
2. Conectar el repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Render usa `PORT`, ya esta soportado.

## Notas
- Al ser memoria, los datos se pierden en cada reinicio.
