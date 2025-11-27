# REST vs OData vs GraphQL

## Resumen rápido
- **REST**: contrato por recursos y verbos HTTP. Sencillo, buen cache, pero las respuestas pueden ser verbosas o incompletas según el cliente.
- **OData**: estándar sobre HTTP con convenciones para filtrar, paginar, proyectar y relacionar recursos mediante parámetros como `$filter` o `$select`.
- **GraphQL**: contrato tipado por esquema, un único endpoint y el cliente pide exactamente los campos que necesita.

## Comparativa
| Criterio | REST | OData | GraphQL |
| --- | --- | --- | --- |
| Contrato | URIs + verbos HTTP | REST + vocabulario ($filter, $top, $expand) | Esquema tipado (SDL) |
| Over/under-fetching | Posible, requiere endpoints específicos | Mitigado con `$select`, `$expand`, `$top` | Controlado por el cliente (selección de campos) |
| Filtrado/paginado nativo | No; se implementa ad hoc | Sí, convenciones estándar | Sí, pero requiere diseñar args y resolvers |
| Versionado | Por rutas/headers | Igual que REST | Romper esquema implica versiones o deprecaciones |
| Cache HTTP | Muy bien soportado | Igual que REST | Requiere estrategias propias o persistencia de caché |
| Curva de aprendizaje | Baja | Baja-media (vocabulario OData) | Media-alta (esquema, resolvers, tooling) |
| Herramientas | Postman, OpenAPI, proxies | Postman, libs OData, generators | Apollo/URQL, GraphiQL, codegen |

## ¿Cuándo elegir cada uno?
- REST: servicios simples, muchos clientes cacheando con HTTP, equipos con experiencia dispar.
- OData: APIs de datos tabulares con necesidad fuerte de filtrado, orden, selección de campos y paginado sin crear endpoints a medida.
- GraphQL: frontends con iteraciones rápidas, agregación de múltiples orígenes y necesidad de pedir solo los campos necesarios.

---

## Proyecto: mini API OData-like en Node.js (estructura MVC)
Se replica la estructura de `17-code-structure` con Express, controladores, servicios y tests.

### Estructura
```
18-rest-api/
├─ index.js
├─ src/
│  ├─ app.js
│  ├─ config.js
│  ├─ loaders/
│  ├─ routes/
│  ├─ controllers/
│  └─ services/
└─ test/
```

### Ejecutar
```bash
cd 18-rest-api
npm install
npm run dev   # o npm start
```
El servidor escucha en `http://localhost:3000`.

### Endpoints
- `GET /` → mensaje y ejemplo de uso.
- `GET /odata/books` → soporta `$filter`, `$select`, `$orderby`, `$top`, `$skip`.

Ejemplos:
- `curl "http://localhost:3000/odata/books"`
- `curl "http://localhost:3000/odata/books?$filter=author eq Asimov&$select=title,author"`
- `curl "http://localhost:3000/odata/books?$orderby=rating desc&$top=3&$skip=1"`
- `curl "http://localhost:3000/odata/books?$filter=title contains foundation"`

### Tests
```bash
npm test
```
Se incluyen pruebas de controlador y servicio (`supertest` + `jest`).
