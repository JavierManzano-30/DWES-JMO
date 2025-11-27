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

## Retos habituales
- REST: proliferación de endpoints específicos para optimizar payloads.
- OData: curva ligera de sus operadores y limitaciones si se necesitan reglas de negocio complejas.
- GraphQL: costes de implementación (schema/resolvers), caching menos trivial y necesidad de observabilidad de resoluciones.

---

## Práctica: mini API OData-like en Node.js
Elegimos **OData** para la práctica porque permite demostrar consulta rica sobre HTTP sin dependencias externas. El servidor expone `/odata/books` y soporta:
- `$filter=campo op valor` con `eq`, `gt`, `lt`, `contains` (ej.: `$filter=pages gt 300`).
- `$select=campo1,campo2` para proyectar columnas.
- `$orderby=campo` o `campo desc` para ordenar.
- `$top` y `$skip` para paginar.
- Respuesta JSON con los resultados procesados.

### Ejecutar
```bash
cd 18-rest-api
node odata-server.js
```
El servidor escucha en `http://localhost:3000`.

### Probar consultas
- Todos los libros (limitados por defecto):  
  `curl "http://localhost:3000/odata/books"`
- Filtrado y proyección:  
  `curl "http://localhost:3000/odata/books?$filter=author eq Asimov&$select=title,author"`
- Orden y paginado:  
  `curl "http://localhost:3000/odata/books?$orderby=rating desc&$top=3&$skip=1"`
- Búsqueda por texto:  
  `curl "http://localhost:3000/odata/books?$filter=title contains foundation"`

### Extender
- Añadir `$expand` para relaciones (ej. autores) o `$count=true`.
- Exponer los metadatos del servicio (`$metadata`) para describir el modelo.
- Sustituir el array en memoria por una base de datos y validar tipos en las entradas.
