# 22-api-files

Servidor Express para subir y descargar ficheros usando una carpeta `files/`.

## Requisitos
- Node.js LTS
- npm

## Instalacion
```bash
cd 22-api-files
npm install
```

## Scripts
- `npm start`: arranca el servidor.
- `npm run dev`: arranca con nodemon (recarga en cambios).

## Endpoints
- `POST /upload` — formulario multipart (campo `file`). Guarda en `files/` y devuelve metadatos.
- `GET /files` — lista los ficheros guardados con url de descarga.
- `GET /files/:name` — sirve el fichero como estatico.
- `GET /download/:name` — fuerza descarga (`Content-Disposition: attachment`).

## Configuracion
- `PORT` (por defecto `3000`)
- `FILES_DIR` (por defecto `<repo>/22-api-files/files`)
- `MAX_FILE_SIZE` (bytes; por defecto 5 MB)

## Uso rapido
```bash
npm run dev
# Subir un fichero
curl -F "file=@./README.md" http://localhost:3000/upload
# Listar
curl http://localhost:3000/files
# Descargar
curl -OJ http://localhost:3000/download/<nombre_guardado>
```
