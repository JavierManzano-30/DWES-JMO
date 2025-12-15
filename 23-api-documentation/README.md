# 23-api-documentation

Servidor Express para subir y descargar ficheros usando una carpeta `files/`, ahora con documentación OpenAPI servida en `/docs`.

## Requisitos
- Node.js LTS
- npm

## Instalación
```bash
cd 23-api-documentation
npm install
```

## Scripts
- `npm start`: arranca el servidor.
- `npm run dev`: arranca con nodemon (recarga en cambios).

## Endpoints principales
- `POST /upload` → formulario multipart (campo `file`). Guarda en `files/` y devuelve metadatos.
- `GET /files` → lista los ficheros guardados con url de descarga.
- `GET /files/:name` → sirve el fichero como estático.
- `GET /download/:name` → fuerza descarga (`Content-Disposition: attachment`).
- `GET /docs` → Swagger UI con la especificación.
- `GET /openapi.json` → especificación en JSON (parseada desde `openapi.yml`).

## Configuración
- `PORT` (por defecto `3000`)
- `FILES_DIR` (por defecto `<repo>/23-api-documentation/files`)
- `MAX_FILE_SIZE` (bytes; por defecto 5 MB)

## Documentación OpenAPI
- Archivo: `openapi.yml`. Describe `/upload`, `/files`, `/files/{name}`, `/download/{name}`.
- Servida por `swagger-ui-express` en `/docs` y en JSON en `/openapi.json`.
- Para editarla rápidamente, ábrela en https://editor.swagger.io.

## Uso rápido
```bash
npm run dev
# Subir un fichero
curl -F "file=@./README.md" http://localhost:3000/upload
# Listar
curl http://localhost:3000/files
# Descargar
curl -OJ http://localhost:3000/download/<nombre_guardado>
# Ver documentación
open http://localhost:3000/docs
```
