<?php

namespace Drupal\aviones\Controller;

use Drupal\Core\Controller\ControllerBase;

class AvionHelpController extends ControllerBase {

  public function help() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('
        <h2>Gestión de Aviones</h2>
        <p>Este módulo permite gestionar una flota de aviones, incluyendo:</p>
        <ul>
          <li>Datos básicos del avión (matrícula, fabricante, modelo…)</li>
          <li>Fotos múltiples almacenadas en privado</li>
          <li>Archivos adjuntos privados</li>
          <li>Listado administrativo con columnas personalizadas</li>
          <li>Formularios de creación, edición y eliminación</li>
        </ul>

        <h3>¿Dónde encontrarlo?</h3>
        <p>Menú: <strong>Contenido → Aviones</strong></p>

        <h3>¿Cómo añadir un avión?</h3>
        <p>Haz clic en el botón <strong>Añadir avión</strong> en la parte superior del listado.</p>

        <h3>¿Qué permisos existen?</h3>
        <p>El módulo define el permiso <strong>Administrar aviones</strong>, necesario para acceder al listado y formularios.</p>
      '),
    ];
  }

}
