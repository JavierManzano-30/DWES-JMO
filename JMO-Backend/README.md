# 🖥 Backend — SnapNation (Sprint 5)

El backend de **SnapNation** es una API REST desarrollada en **Node.js + Express**, que gestiona la autenticación, publicación y votación de fotos, moderación de contenido y administración de temas semanales. Persiste los datos en **PostgreSQL** y en esta implementación base almacena imágenes en local con **Multer** (Cloudinary puede añadirse más adelante).

En este sprint el objetivo no es desarrollar nuevas funcionalidades, sino **documentar el diseño completo del backend y su relación con el frontend**, a través de diagramas UML realizados con PlantUML.

---

## ✅ Estado actual (implementación base)

Actualmente el backend incluye:

- Conexión a PostgreSQL mediante `pg` y scripts SQL (`sql/schema.sql` + `sql/seed.sql`)
- Endpoints base según `docs/api/openapi.yaml`
- Documentación Swagger en `GET /docs` y `GET /openapi.json`
- Autenticación JWT (registro/login y rutas protegidas)
- Subida de imágenes con `multer` y almacenamiento local en `/uploads`
- Respuestas y errores siguiendo las convenciones de `docs/api/convenciones.md`

> Nota: Cloudinary queda pendiente de integrar si se desea en producción.

---

## 🧠 Controladores y lógica

Para dejar **claro dónde vive la lógica**, los endpoints están separados en:

- **Routes (capa delgada)**: solo definen rutas y middlewares.
- **Controllers (lógica real)**: validaciones, reglas de negocio y acceso a datos.
- **Models (acceso a datos)**: consultas SQL encapsuladas por dominio.

Controladores principales:

- `src/controllers/authController.js` → registro y login (validaciones, hash, JWT).
- `src/controllers/usersController.js` → perfil del usuario (`/users/me`).
- `src/controllers/photosController.js` → listado, detalle, subida y borrado.
- `src/controllers/themesController.js` → listado y creación de temas.
- `src/controllers/communitiesController.js` → listado y detalle de comunidades.
- `src/controllers/categoriesController.js` → listado de categorías.
- `src/controllers/votesController.js` → votar y quitar voto.

Así el profesor puede ver fácilmente que la lógica está centralizada en controladores.

---

## 🧩 Relación con los diagramas del Sprint 5

### 🎭 Casos de Uso (Backend como proveedor de funcionalidades)

El backend da soporte directo a los casos de uso del sistema:

- Registrar usuario
- Iniciar sesión
- Subir foto
- Votar foto
- Eliminar foto (usuario)
- Crear tema semanal (admin)
- Moderar fotos (admin)
- Calcular y mostrar ganadores

📍 Diagrama disponible en: `docs/sprint5/usecase/`

---

### 🔁 Diagramas de Actividad (Flujos que el backend valida)

Los diagramas representan la lógica real que el backend debe validar:

- Subida y eliminación de fotos:  
  Control de autenticación, límite temporal y propiedad.
- Votar foto:  
  Control de voto único por usuario y autenticación.
- Moderación de fotos (admin):  
  Eliminar o advertir contenido.
- Crear tema semanal:  
  Validación de fechas y desactivación del tema anterior.
- Ver Perfil:  
  Carga de estadísticas y datos del usuario.

📍 Diagramas: `docs/sprint5/activities/`

---

### ⏱ Diagramas de Secuencia (API REST documentada)

Establecen exactamente cómo el backend debe procesar cada solicitud del frontend:

| Proceso | Acción del backend |
|---------|-------------------|
| Subir Foto | Valida JWT → Envia imagen a Cloudinary → Guarda datos en BD |
| Votar Foto | Verifica autenticación → Comprueba si ya votó → Registra voto |
| Ver Ganadores | Consulta estadísticas y devuelve los ganadores |

📍 Ubicación: `docs/sprint5/sequence/`

---

### 📦 Diagramas JSON (Contratos de API)

Los JSON definieron los contratos de datos entre Frontend y Backend, incluyendo:

- Estructura de respuesta al subir foto (con URL, metadatos y autor)
- Estructura de respuesta para ganadores semanales (con votos, autor, foto, tema)

📍 Diagramas: `docs/sprint5/json/`

Estos contratos permiten construir controladores, validaciones y DTOs en el backend.

---

### 🗄 Modelo IE — Modelo de Datos Relacional

El modelo entidad–relación (IE) define las tablas que el backend debe implementar:

| Entidad | Descripción |
|---------|-------------|
| `users` | Autenticación, roles y perfiles |
| `photos` | Fotos publicadas, URL y metadatos |
| `votes` | Registro de votos únicos por usuario y foto |
| `themes` | Temas semanales activos y anteriores |
| `moderation` | Historial de acciones de moderación |

📍 Diagrama: `docs/sprint5/database/`

Este modelo guía la creación del esquema en PostgreSQL y la lógica de negocio del backend.

---

### 🧱 Diagrama de Componentes (Arquitectura del Backend)

El backend se desglosa en módulos:

| Componente | Responsabilidad |
|------------|----------------|
| `AuthController` | Login, registro y gestión de JWT |
| `PhotoController` | Subida, listado, detalle, eliminación |
| `VoteController` | Registro de votos y restricciones |
| `ThemeController` | Creación y activación de temas |
| `ModerationController` | Acciones administrativas |
| `CloudinaryService` | Gestión de subida y borrado de imágenes |
| `DBService` | Acceso a PostgreSQL |

📍 Diagrama: `docs/sprint5/components/`

---

## 🚀 Puesta en marcha del Backend

Para ejecutar el backend:

1. Acceder a `JMO-Backend`
2. Levantar servicios de Docker: `docker compose up -d db mailhog`
3. Instalar dependencias con `npm install`
4. Crear el archivo `.env` a partir de `.env.example`
5. Aplicar esquema y seed: `npm run db:setup`
6. Ejecutar la API con `npm run dev`
7. Ejecutar tests + cobertura con `npm test` (mínimo 80% líneas)
8. Ejecutar tests sin cobertura con `npm run test:fast`
9. Ejecutar solo unitarios con `npm run test:unit`
10. Ejecutar M2M con `npm run test:m2m`
11. Ejecutar cobertura + análisis SonarQube con `npm run sonar` (ver sección SonarQube)

MailHog queda disponible en:

- SMTP: `127.0.0.1:1025`
- UI web: `http://localhost:8025`
- Para MailHog local sin TLS: `SMTP_ALLOW_INSECURE_LOCAL=true`

Endpoint de prueba de correo:

- `POST /api/v1/email/test`
- Body mínimo: `{ "to": "destino@correo.com", "subject": "Prueba", "text": "Hola" }`
- Requests de ejemplo en: `api.http`

---

## 📁 Estructura de carpetas

La estructura principal sigue el patrón de `notas-proyecto`:

- `index.js` (entrypoint)
- `src/app.js`
- `src/config.js`
- `src/loaders/`
- `src/routes/`
- `src/controllers/`
- `src/models/`
- `src/services/`
- `test/m2m/`
- `test/controllers/`
- `test/services/`

---

## 📈 SonarQube local

1. Levantar SonarQube:

   `docker compose -f docker-compose.sonarqube.yml up -d`

2. Abrir `http://localhost:9000` e iniciar sesión:

- Usuario: `admin`
- Password inicial: `admin` (te pedirá cambiarla)

3. Crear un token en SonarQube:

- `My Account` → `Security` → `Generate Tokens`

4. Exportar el token en terminal:

- PowerShell: `$env:SONAR_TOKEN="tu_token"`
- Bash: `export SONAR_TOKEN=tu_token`

5. Ejecutar el análisis:

   `npm run sonar`

Notas:

- Configuración del análisis: `sonar-project.properties`
- El análisis usa cobertura de Jest en `coverage/lcov.info`
- Umbral mínimo de cobertura en tests: 80% de líneas (`jest.config.js`)
- Se excluye `src/routes/**` del cálculo de duplicación (CPD) por ser capa boilerplate de wiring
- Límites defensivos de payload: `HTTP_BODY_LIMIT`, `UPLOAD_MAX_FILE_SIZE_BYTES`, `UPLOAD_MAX_FILES`, `UPLOAD_MAX_FIELDS`
- Para apagar SonarQube: `docker compose -f docker-compose.sonarqube.yml down`

---

## 🔐 Autenticación y Seguridad

- El backend genera JWT al iniciar sesión.
- Cada petición protegida requiere el token en encabezado `Authorization: Bearer`.
- Hay rutas restringidas a administradores.
- La validación de autenticación/roles está descrita en:
  - Diagramas de Secuencia
  - Diagramas de Actividad

---

## 🛠 Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| Node.js + Express | API REST |
| PostgreSQL | Persistencia de datos |
| JWT | Autenticación |
| Multer | Subida de imágenes (almacenamiento local) |
| Docker | Servicio de base de datos opcional |
| PlantUML | Documentación y modelado |

---

👨‍💻 Autor: **Javier Manzano Oliveros**  
📚 2º DAW — Proyecto Integrado — Sprint 5
