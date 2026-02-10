# Explicacion completa de JMO-Backend

## 1) Que es este proyecto

`JMO-Backend` es una API REST hecha con `Node.js + Express` para el proyecto SnapNation.

Gestiona:
- autenticacion con JWT
- usuarios
- comunidades
- categorias
- temas
- fotos
- votos
- envio de correos SMTP de prueba
- notificaciones realtime al subir foto (WebSocket con Socket.IO)

La persistencia principal esta en PostgreSQL.

---

## 2) Arquitectura general (como esta unido)

Flujo base de una peticion:

1. Entra por `index.js` (crea servidor HTTP).
2. Se inicia Express desde `src/app.js`.
3. `src/loaders/express.js` configura middlewares globales, docs, health y rutas.
4. Las rutas en `src/routes/*.js` redirigen al controlador.
5. Middlewares (`auth`, `requireRole`, `upload`, etc.) validan antes del controlador.
6. El controlador (`src/controllers/*.js`) aplica logica de negocio.
7. El controlador usa:
- modelos SQL (`src/models/*.js`) o `pool` directo
- utilidades (`src/utils/*.js`)
- servicios externos (`src/services/email.js`)
- realtime (`src/realtime/socket.js`)
8. `errorHandler` unifica errores y formato de respuesta.

Resumen visual:

`Cliente -> Express Loader -> Router -> Middleware -> Controller -> Model/Service -> DB/SMTP/WebSocket -> Response`

---

## 3) Arranque de la aplicacion

Archivos clave:
- `index.js`: entrypoint principal.
- `server.js`: archivo de compatibilidad que importa `index.js`.
- `src/index.js`: entrypoint alternativo dentro de `src`.
- `src/app.js`: crea `app` de Express y llama a loaders.

`index.js` hace dos cosas importantes:
- levanta HTTP server con `http.createServer(app)`
- inicializa Socket.IO con `initSocket(...)`

Puerto de escucha:
- `config.app.port` (por defecto `3000`)

---

## 4) Configuracion (src/config.js)

Lee variables de entorno con `dotenv/config` y construye un objeto `config` central.

Bloques:
- `app.port`
- `db.connectionString`
- `jwt.secret`, `jwt.expiresIn`
- `cors.origins`, `cors.credentials`
- `http.bodyLimit`
- `upload` (limites defensivos de multipart)
- `smtp` (host/port/secure/user/pass/service/from + modo local inseguro controlado)

Detalles importantes:
- usa `toNumber` para parsear numeros
- usa `clamp` para limitar valores peligrosos
- genera `jwt.secret` aleatorio si no existe variable

---

## 5) Capa HTTP global (src/loaders/express.js)

Configura:
- CORS
- parser JSON/urlencoded con limite
- carpeta estatica `uploads`
- health checks:
  - `GET /health`
  - `GET /api/v1/health`
- Swagger:
  - `GET /docs`
  - `GET /openapi.json`
- API versionada:
  - base `GET/POST/... /api/v1/*`
- 404 JSON estandar
- `errorHandler` final

---

## 6) Rutas y endpoints

Base API: `/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Users
- `GET /users/me` (auth)
- `PATCH /users/me` (auth + `upload.single('avatar')`)

### Photos
- `GET /photos`
- `POST /photos` (auth + `upload.single('image')`)
- `GET /photos/:id` (optional auth)
- `DELETE /photos/:id` (auth)

### Themes
- `GET /themes`
- `POST /themes` (auth + rol admin)
- `GET /themes/:id`

### Communities
- `GET /communities`
- `GET /communities/:id`

### Categories
- `GET /categories`

### Votes
- `POST /votes` (auth)
- `DELETE /votes` (auth)

### Email
- `POST /email/test`

---

## 7) Controladores (logica de negocio)

### authController
- valida email/username/password
- comprueba usuario existente
- opcionalmente valida `community_id`
- hash de password con `bcryptjs`
- login con comparacion hash
- emite JWT con `signToken`

### usersController
- `getMe`: devuelve perfil del usuario autenticado
- `updateMe`: actualiza `display_name` y/o `avatar_url`

### photosController
- listado con filtros (`community_id`, `theme_id`, `category_id`, `user_id`)
- ordenacion (`created_at`, `votes`)
- creacion con validaciones de tema/categoria/duplicado
- genera URL publica del fichero subido
- detalle con datos anidados de usuario/tema/categoria
- borrado logico (`is_deleted = true`) solo por propietario
- emision realtime `photo:created` al crear foto

### themesController
- listado paginado y filtrable (`is_active`, `community_id`)
- creacion (solo admin por ruta)
- detalle por id

### communitiesController
- listado paginado
- detalle por id

### categoriesController
- listado ordenado de categorias

### votesController
- crea voto (evita voto duplicado)
- elimina voto

### emailController
- valida body minimo (`to`, `subject`, `text|html`)
- envia correo via servicio SMTP

---

## 8) Modelos, SQL y base de datos

### Modelos usados
- `src/models/authModel.js`
- `src/models/categoriesModel.js`
- `src/models/communitiesModel.js`

Algunos controladores usan `pool.query(...)` directo para consultas mas complejas.

### Conexion DB
- `src/db/pool.js` crea `Pool` de `pg`.
- `src/db/setup.js` ejecuta `sql/schema.sql` y `sql/seed.sql`.

### Esquema principal (sql/schema.sql)
Tablas:
- `communities`
- `categories`
- `users`
- `themes`
- `photos`
- `votes`
- `moderation`
- `winners`

Relaciones clave:
- `users.community_id -> communities.id`
- `themes.community_id -> communities.id`
- `photos.user_id -> users.id`
- `photos.theme_id -> themes.id`
- `photos.category_id -> categories.id`
- `votes.photo_id -> photos.id`
- `votes.user_id -> users.id`

Restricciones clave:
- usuario unico por `email` y `username`
- foto unica por pareja `(user_id, theme_id)`
- voto unico por pareja `(user_id, photo_id)`

---

## 9) Middlewares y utilidades

### Middlewares
- `auth.js`:
  - `authenticate`: JWT obligatorio
  - `optionalAuth`: JWT opcional
- `requireRole.js`:
  - exige rol exacto (ejemplo: `admin`)
- `errorHandler.js`:
  - adapta errores de Multer (`LIMIT_FILE_SIZE -> 413`)
  - devuelve payload uniforme

### Utils
- `errors.js`: `createError` + `errorPayload`
- `auth.js`: `signToken`
- `asyncHandler.js`: evita repetir `try/catch` en rutas async
- `pagination.js`: parseo seguro de `page/limit` + meta
- `upload.js`:
  - storage de Multer en `/uploads`
  - nombre aleatorio criptografico (`randomBytes`)
  - limite de tamano/numero de campos
  - permite solo `jpeg/jpg/png`

---

## 10) Servicios externos

### SMTP (src/services/email.js)
- usa `nodemailer`
- construye opciones seguras (TLS >= 1.2 por defecto)
- permite modo local inseguro controlado para MailHog (`SMTP_ALLOW_INSECURE_LOCAL=true`)
- `sendEmail(...)` aplica `from` por defecto si falta

### Realtime (src/realtime/socket.js)
- usa `socket.io`
- se inicializa en arranque con CORS alineado a config
- evento emitido al crear foto:
  - `photo:created` (global)
  - `photo:created` en room `community:<id>` si hay comunidad
- suscripcion opcional desde cliente:
  - evento entrante `subscribe:community`

---

## 11) Testing y calidad

Framework:
- `Jest` + `Supertest`

Configuracion:
- `jest.config.js`
- umbral minimo de lineas global: `80%`

Suites por capas:
- `test/controllers/*`
- `test/middleware/*`
- `test/services/*`
- `test/utils/*`
- `test/realtime/*`
- `test/m2m/*`
- `test/access.test.js`

Scripts utiles:
- `npm test` (coverage)
- `npm run test:fast`
- `npm run test:unit`
- `npm run test:m2m`

Sonar:
- `sonar-project.properties`
- usa `coverage/lcov.info`
- exclusiones definidas para tests, loaders, routes, etc.
- script `npm run sonar`

---

## 12) Infra local con Docker

### docker-compose.yml
Levanta:
- `db` (Postgres 16, puerto host `5433`)
- `mailhog` (SMTP `1025`, UI `8025`)

### docker-compose.sonarqube.yml
Levanta:
- `sonarqube-db` (Postgres para Sonar)
- `sonarqube` en `http://localhost:9000`

---

## 13) Flujo real de casos importantes

### Registro/Login
1. Cliente envia credenciales.
2. Controller valida formato.
3. Consulta DB para existencia.
4. Register hashea password y guarda usuario.
5. Login compara hash.
6. Se firma JWT y se devuelve `{ token, user }`.

### Subir foto
1. Ruta exige JWT + multipart con `image`.
2. Multer guarda fichero en `uploads`.
3. Controller valida tema activo y duplicados.
4. Inserta en DB.
5. Devuelve `201` con foto creada.
6. Emite `photo:created` por WebSocket.

### Votar foto
1. JWT obligatorio.
2. Valida `photo_id`.
3. Comprueba que foto existe.
4. Comprueba no voto previo.
5. Inserta voto o devuelve error de negocio.

### Email de prueba
1. `POST /api/v1/email/test`.
2. Valida campos minimos.
3. `sendEmail(...)` usa Nodemailer.
4. MailHog captura correo en local (si se configura).

---

## 14) Archivos de apoyo y documentacion

- `README.md`: guia de uso principal del backend.
- `api.http`: coleccion manual de requests.
- `docs/api/openapi.yaml`: contrato OpenAPI.
- `docs/uml/*`: diagramas de componentes, BD y JSON de respuesta.
- `docs/backend-tecnologias.md`: stack y notas tecnicas.

---

## 15) Resumen final

El proyecto esta organizado por capas claras:
- transporte HTTP (Express + rutas)
- seguridad/middlewares
- logica de negocio (controladores)
- acceso a datos (modelos/pool)
- integraciones externas (SMTP y WebSocket)

Eso permite:
- mantener el codigo entendible
- testear por capas
- cumplir cobertura y analisis de calidad
- ampliar funcionalidades sin romper la estructura.
