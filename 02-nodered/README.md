# Piedra, Papel o Tijeras en Node-RED ✊📄✂️

Este proyecto implementa el clásico juego **Piedra, Papel o Tijeras** utilizando **Node-RED**. Permite jugar tanto desde inyecciones manuales (botones) como mediante peticiones HTTP.

---

## 🎯 Objetivo

Aprender a usar:

* **Nodos `inject`** para enviar valores.
* **Nodos `function`** para programar la lógica del juego en JavaScript.
* **Nodos `http in` / `http response`** para crear una API sencilla.
* **Nodos `debug`** para inspeccionar los resultados.

---

## ⚙️ Estructura del Flow

### 1. Inyección manual

* Tres nodos **Inject**: `Piedra`, `Papel` y `Tijeras`.
* Conectados a un nodo **Function** (`function 1`) que contiene la lógica del juego.
* Resultado mostrado en un nodo **Debug** (`Resultado`).

### 2. API HTTP

* Tres nodos **HTTP IN** que responden a:

  * `GET /v2/piedra`
  * `GET /v2/papel`
  * `GET /v2/tijeras`
* Cada uno conecta a un nodo **Template** que establece el `msg.payload`.
* Todos llegan a un nodo **Function** (`Jugar`).
* El resultado se devuelve en un nodo **HTTP Response** y también se muestra en Debug.

---

## 🧠 Lógica del juego

La lógica se implementa en nodos `function` usando JavaScript. Ejemplo del nodo **Jugar**:

```javascript
var user = (msg.payload || '').toString().toLowerCase();
var choices = ['piedra','papel','tijeras'];
var cpu = choices[Math.floor(Math.random()*3)];
var result = '';

if (user === cpu) {
    result = 'Empate! Ambos eligieron ' + user;
} else if (
    (user === 'piedra' && cpu === 'tijeras') ||
    (user === 'papel' && cpu === 'piedra') ||
    (user === 'tijeras' && cpu === 'papel')
) {
    result = 'Has ganado! CPU eligió ' + cpu;
} else {
    result = 'Has perdido. CPU eligió ' + cpu;
}

msg.payload = { user: user, cpu: cpu, result: result };
return msg;
```

---

## 🚀 Cómo probar

### 1. Desde Node-RED (botones Inject)

* Haz clic en los botones **Piedra**, **Papel** o **Tijeras**.
* Mira el resultado en la pestaña **Debug**.

### 2. Desde navegador o curl (API REST)

* Abre en navegador:

  * `http://localhost:1880/v2/piedra`
  * `http://localhost:1880/v2/papel`
  * `http://localhost:1880/v2/tijeras`
* O usa `curl`:

```bash
curl http://localhost:1880/v2/papel
```

---

## 📦 Archivos

* `flow.json`: definición completa del flujo para importar en Node-RED.
* `README.md`: este documento con explicación y pasos de uso.

---

## 🔧 Mejoras posibles

* Añadir **Node-RED Dashboard** para botones y resultados visuales.
* Guardar estadísticas (victorias/derrotas/empates) con `flow.set()` y `flow.get()`.
* Crear una página web sencilla que consuma la API.

---

✍️ Hecho en clase como ejercicio práctico de **Node-RED y programación con funciones**.
