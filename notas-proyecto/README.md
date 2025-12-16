# Bloc de notas (proyecto npm)

Proyecto consolidado del bloc de notas, montado como app Express con filtros, orden y paginacion. Hereda la seguridad por token y roles de los temas previos.

## Requisitos
- Node.js LTS
- npm

## Instalacion
```bash
cd notas-proyecto
npm install
```

## Scripts
- `npm start`: arranca el servidor en modo normal.
- `npm run dev`: arranca con nodemon.
- `npm test`: ejecuta las pruebas (servicio y endpoint de notas, accesos y docs).

## Ejecutar
```bash
npm run dev
# Servidor en http://localhost:3000
```

## Endpoints
- `GET /notes`: lista notas con filtros, orden y paginacion.
- `GET /public`: acceso abierto.
- `GET /vip`: requiere token valido.
- `GET /admin`: requiere token valido y rol `admin`.
- `GET /docs`: Swagger UI con la especificacion.
- `GET /openapi.json`: especificacion en JSON (desde `openapi.yml`).

### Query params para /notes
- `sortBy`: `title` | `createdAt` | `updatedAt` | `size` (por defecto `updatedAt`).
- `sortDir`: `asc` | `desc` (por defecto `desc`).
- `titleContains`: texto a buscar en titulo.
- `contentContains`: texto a buscar en contenido.
- `category`: categoria exacta.
- `createdFrom` / `createdTo`: rango de creacion (ISO o YYYY-MM-DD).
- `updatedFrom` / `updatedTo`: rango de ultima actualizacion.
- `page`: numero de pagina (>=1).
- `pageSize`: tamano de pagina (por defecto 5 o `PAGE_SIZE` env).

### Ejemplos rapidos
```bash
# Generar token (hash bcrypt del mensaje exacto)
node -e "const bcrypt=require('bcrypt');bcrypt.hash('I know your secret.',10).then(console.log)"

# Por defecto (orden updatedAt desc, pagina 1)
curl 'http://localhost:3000/notes'

# Ordenar por titulo ascendente
curl 'http://localhost:3000/notes?sortBy=title&sortDir=asc'

# Filtrar por categoria y texto en contenido
curl 'http://localhost:3000/notes?category=work&contentContains=logs'

# Rango de creacion y paginado
curl 'http://localhost:3000/notes?createdFrom=2024-02-01&createdTo=2024-03-01&page=2&pageSize=2'

# Accesos protegidos
TOKEN=<hash_generado>
curl http://localhost:3000/public
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/vip
curl -H "Authorization: Bearer $TOKEN" -H "x-role: admin" http://localhost:3000/admin
```

## Notas de desarrollo
- Los datos se reinician en cada arranque a partir de `initialNotes` (ver `src/services/notes.js` y `resetNotes`).
- Al actualizar una nota, `updatedAt` siempre avanza (aunque la actualización ocurra en el mismo instante que la creación) para evitar timestamps iguales en pruebas y ordenación.
```
