# 21-api-pagination

Ejercicio para listar notas con ordenación, filtrado y paginado reutilizando la estructura Express del bloc de notas.

## Ejecutar
```bash
cd 21-api-pagination
npm install
npm run dev   # o npm start
```

## Endpoint
`GET /notes` devuelve las notas con metadatos de paginado.

### Query params principales
- `sortBy`: `title` | `createdAt` | `updatedAt` | `size` (longitud del contenido). Por defecto `updatedAt`.
- `sortDir`: `asc` | `desc` (por defecto `desc`).
- `titleContains`: texto a buscar en el título.
- `contentContains`: texto a buscar en el contenido.
- `category`: categoría exacta (work, personal, ideas, ...).
- `createdFrom` / `createdTo`: filtra rango de creación (fecha ISO o `YYYY-MM-DD`).
- `updatedFrom` / `updatedTo`: filtra rango de última actualización.
- `page`: número de página (>=1). Por defecto 1.
- `pageSize`: tamaño de página; por defecto `PAGE_SIZE` (5 si no se define env).

### Respuesta
```json
{
  "value": [ { "id": 1, "title": "...", "size": 42, ... } ],
  "page": 1,
  "pageSize": 5,
  "totalItems": 8,
  "totalPages": 2,
  "applied": { "filters": { ... }, "sort": { ... }, "pagination": { ... } }
}
```

## Ejemplos rápidos
```bash
# Por defecto (ordenado por updatedAt desc, página 1)
curl 'http://localhost:3000/notes'

# Ordenar por título ascendente
curl 'http://localhost:3000/notes?sortBy=title&sortDir=asc'

# Filtrar por categoría y texto en contenido
curl 'http://localhost:3000/notes?category=work&contentContains=logs'

# Rango de creación y paginado
curl 'http://localhost:3000/notes?createdFrom=2024-02-01&createdTo=2024-03-01&page=2&pageSize=2'
```
