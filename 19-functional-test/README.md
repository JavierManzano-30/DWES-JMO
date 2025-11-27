# 19-functional-test

Base reusable para pruebas funcionales. Replica la estructura Express del ejercicio anterior para poder escribir tests de extremo a extremo con `supertest`.

## Ejecutar
```bash
cd 19-functional-test
npm install
npm run dev   # o npm start
```

## Endpoints disponibles
- `GET /ping` → healthcheck simple.
- `GET /odata/books` → soporta `$filter`, `$select`, `$orderby`, `$top`, `$skip`.

## Tests
```bash
npm test
```
Incluye ejemplos de pruebas funcionales (`test/controllers/*.test.js`) y de servicios (`test/services/*.test.js`).
