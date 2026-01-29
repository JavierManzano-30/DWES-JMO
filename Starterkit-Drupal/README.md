# 💧 Drupal 11 en Docker

Este proyecto proporciona un entorno de desarrollo profesional para **Drupal 11** utilizando Docker, optimizado para trabajar con **VS Code Dev Containers**.

---

## 🚀 1. Inicio Rápido

1.  **Levantar el entorno**:
    ```bash
    docker compose up -d
    ```
2.  **Acceso a servicios**:
    *   🌍 **Drupal**: [http://localhost:8080](http://localhost:8080)
    *   🗄️ **phpMyAdmin**: [http://localhost:8081](http://localhost:8081)
        *   **Usuario**: `root` | **Contraseña**: `root`

### 📝 Configuración del Asistente (Wizard)
Al instalar Drupal, usa estos datos para la base de datos:

| Campo | Valor |
| :--- | :--- |
| **Tipo de base de datos** | MariaDB |
| **Nombre de la BD** | `drupal` |
| **Usuario** | `drupal` |
| **Contraseña** | `drupal` |
| **Host** | `db` |
| **Puerto** | `3306` |

---

## 💻 2. Entorno de Desarrollo (VS Code)

Para una experiencia óptima, trabaja **dentro** del contenedor:

1.  Instala la extensión [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
2.  `F1` o `Ctrl+Shift+P` -> **Dev Containers: Attach to Running Container...** -> Selecciona `drupal_app`.
3.  Abre la carpeta `/opt/drupal` (o `/var/www/html` según tu configuración de volumen).

## 🛠️ 3. Herramientas de Desarrollo

Ejecuta estos comandos dentro del contenedor para mejorar el flujo de trabajo:

```bash
# Calidad de código (Coder & PHPCS)
composer require --dev drupal/coder squizlabs/php_codesniffer
vendor/bin/phpcs --config-set installed_paths vendor/drupal/coder/coder_sniffer
vendor/bin/phpcs --config-set default_standard Drupal

# Soporte para el módulo Imagick
composer require 'drupal/imagick:^1.12'

# Instalar drush
composer require drush/drush
```

---

## 🔧 4. Configuración Post-Instalación

### 🛡️ Trusted Host Patterns
Para evitar advertencias de seguridad, edita `web/sites/default/settings.php`:
```php
$settings['trusted_host_patterns'] = [
  '^localhost$',
  '^127\.0\.0\.1$',
];
```

### 📁 Archivos Privados
Configura la ruta en Drupal para que apunte al volumen persistente:
1.  Ve a `/admin/config/media/file-system`.
2.  Establece la ruta privada como `../private` (relativa a la carpeta web).

---

## ⚙️ 5. Arquitectura y Configuración

### 📄 Dockerfile
El archivo `Dockerfile` personaliza la imagen `drupal:11-apache` añadiendo:
*   **APCu**: Caché de alto rendimiento para PHP.
*   **Imagick**: Procesamiento avanzado de imágenes.
*   **Uploadprogress**: Progreso real en subidas de archivos.
*   **Composer**: Instalado globalmente para gestión de dependencias.
*   **Memory Limit**: Aumentado a `512M` para Drupal.

### 🐋 Docker Compose
Define la orquestación de los servicios:
*   `drupal`: Servidor web y aplicación. Monta volúmenes persistentes para los archivos de Drupal y archivos privados.
*   `db`: Base de datos MariaDB 10.6.
*   `phpmyadmin`: Interfaz web para gestionar la base de datos de manera sencilla.

### 📦 Persistencia
*   `drupal_data`: Sincroniza el código de la aplicación.
*   `drupal_private`: Almacenamiento seguro de archivos privados.