# Servicio SMTP (Nodemailer + Mailhog)

Servicio basico con Express para enviar emails usando Nodemailer. Incluye Mailhog como servidor SMTP local para pruebas y opcion de Gmail via variables de entorno.

## Requisitos
- Node.js LTS
- npm
- Docker (para Mailhog)

## Instalacion
```bash
cd 28-smtp-service
npm install
```

## Mailhog (SMTP local)
```bash
docker-compose up -d
# UI en http://localhost:8025
# SMTP en 127.0.0.1:1025
```

## Configuracion
Variables de entorno opcionales:
- `PORT`: puerto del servidor (por defecto 3000)
- `SMTP_HOST`: host SMTP (por defecto 127.0.0.1)
- `SMTP_PORT`: puerto SMTP (por defecto 1025)
- `SMTP_SECURE`: `true`/`false` (por defecto false)
- `SMTP_USER`: usuario SMTP (por defecto vacio)
- `SMTP_PASS`: password SMTP (por defecto vacio)
- `SMTP_SERVICE`: servicio SMTP (por ejemplo `gmail`)

### Gmail
Configura:
- `SMTP_SERVICE=gmail`
- `SMTP_USER=tu_correo@gmail.com`
- `SMTP_PASS=tu_password_o_app_password`

## Ejecutar
```bash
npm run dev
# Servidor en http://localhost:3000
```

## Endpoint
- `POST /email`

Payload minimo:
```json
{
  "to": "destino@correo.com",
  "subject": "Prueba",
  "text": "Hola"
}
```

Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/email \
  -H "Content-Type: application/json" \
  -d '{"to":"destino@correo.com","subject":"Prueba","text":"Hola"}'
```
