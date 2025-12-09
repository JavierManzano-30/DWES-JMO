# 20-api-security

Ejercicio de seguridad básica en Express usando middleware de token y roles. Reutiliza la estructura del bloc de notas: `app` + `loaders` + `routes` + `controllers`.

## Ejecutar
```bash
cd 20-api-security
npm install
npm run dev   # o npm start
```

## Token esperado
El middleware considera válido cualquier token que sea el hash **bcrypt** de este mensaje exacto:
```
I know your secret.
```
Puedes generar uno rápido con Node:
```bash
node -e "const bcrypt=require('bcrypt');bcrypt.hash('I know your secret.',10).then(console.log)"
```
Envía el hash en `Authorization: Bearer <token>` (o `x-access-token` / `?token=`). Opcionalmente indica el rol con `x-role` o `?role=`.

## Rutas
- `GET /public` → Acceso abierto sin token.
- `GET /vip` → Requiere token válido (rol por defecto: `vip`).
- `GET /admin` → Requiere token válido **y** rol `admin`.

## Ejemplos rápidos
```bash
# Usando una variable con el hash
TOKEN=$(node -e "const bcrypt=require('bcrypt');bcrypt.hash('I know your secret.',10).then(t=>console.log(t))")

curl http://localhost:3000/public
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/vip
curl -H "Authorization: Bearer $TOKEN" -H "x-role: admin" http://localhost:3000/admin
```
