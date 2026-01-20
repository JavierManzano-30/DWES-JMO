# Peticiones a Servicios Externos (Axios + Got)

Servidor Express simple que actua como puente hacia una API externa. Incluye ejemplos con Axios y Got, y soporte de filtros/paginado mediante query params.

## Requisitos
- Node.js LTS
- npm

## Instalacion
```bash
cd 27-api-services
npm install
```

## Configuracion
Variables de entorno opcionales:
- `PORT`: puerto del servidor (por defecto 3000)
- `API_BASE_URL`: base de la API externa (por defecto `https://jsonplaceholder.typicode.com`)
- `API_TIMEOUT_MS`: timeout de las peticiones (por defecto 8000)

## Ejecutar
```bash
npm run dev
# Servidor en http://localhost:3000
```

## Endpoints
- `GET /external/axios/posts`
- `POST /external/axios/posts`
- `GET /external/got/posts`
- `POST /external/got/posts`

### Query params para GET
- `page`: pagina (mapea a `_page`)
- `pageSize`: tamano de pagina (mapea a `_limit`)
- `userId`: filtra por usuario

### Ejemplos
```bash
# Axios GET con paginado
curl "http://localhost:3000/external/axios/posts?page=1&pageSize=5"

# Axios POST
curl -X POST "http://localhost:3000/external/axios/posts" \
  -H "Content-Type: application/json" \
  -d '{"title":"Nuevo Post","body":"Contenido","userId":1}'

# Got GET con filtro por usuario
curl "http://localhost:3000/external/got/posts?userId=1"

# Got POST
curl -X POST "http://localhost:3000/external/got/posts" \
  -H "Content-Type: application/json" \
  -d '{"title":"Otro Post","body":"Contenido","userId":2}'
```
