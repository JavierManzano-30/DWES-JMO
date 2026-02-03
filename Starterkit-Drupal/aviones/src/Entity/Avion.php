<?php

namespace Drupal\aviones\Entity;

use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;

/**
 * @ContentEntityType(
 *   id = "avion",
 *   label = @Translation("Avión"),
 *   handlers = {
 *     "list_builder" = "Drupal\aviones\AvionListBuilder",
 *     "views_data" = "Drupal\views\EntityViewsData",
 *     "form" = {
 *       "add" = "Drupal\aviones\Form\AvionForm",
 *       "edit" = "Drupal\aviones\Form\AvionForm",
 *       "delete" = "Drupal\aviones\Form\AvionDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\Core\Entity\Routing\AdminHtmlRouteProvider"
 *     }
 *   },
 *   base_table = "avion",
 *   admin_permission = "administer aviones",
 *   entity_keys = {
 *     "id" = "id",
 *     "uuid" = "uuid",
 *     "label" = "matricula"
 *   },
 *   links = {
 *     "add-form" = "/admin/content/aviones/add",
 *     "edit-form" = "/admin/content/aviones/{avion}/edit",
 *     "delete-form" = "/admin/content/aviones/{avion}/delete",
 *     "collection" = "/admin/content/aviones"
 *   }
 * )
 */
class Avion extends ContentEntityBase {

  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    // ID
    $fields['id'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('ID'))
      ->setReadOnly(TRUE);

    // UUID
    $fields['uuid'] = BaseFieldDefinition::create('uuid')
      ->setLabel(t('UUID'))
      ->setReadOnly(TRUE);

    // Matrícula
    $fields['matricula'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Matrícula'))
      ->setRequired(TRUE)
      ->setSettings(['max_length' => 50])
      ->setDisplayOptions('form', ['type' => 'string_textfield', 'weight' => 0])
      ->setDisplayOptions('view', ['type' => 'string', 'weight' => 0]);

    // Fabricante (taxonomía)
    $fields['fabricante'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Fabricante'))
      ->setRequired(TRUE)
      ->setSetting('target_type', 'taxonomy_term')
      ->setSetting('handler_settings', [
        'target_bundles' => ['fabricantes' => 'fabricantes'],
      ])
      ->setDisplayOptions('form', ['type' => 'options_select', 'weight' => 1])
      ->setDisplayOptions('view', ['type' => 'entity_reference_label', 'weight' => 1]);

    // Año de construcción
    $fields['anio_construccion'] = BaseFieldDefinition::create('datetime')
      ->setLabel(t('Año de construcción'))
      ->setRequired(TRUE)
      ->setSetting('datetime_type', 'date')
      ->setDisplayOptions('form', ['type' => 'datetime_default', 'weight' => 2])
      ->setDisplayOptions('view', ['type' => 'datetime_default', 'weight' => 2]);

    // Modelo
    $fields['modelo'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Modelo'))
      ->setRequired(TRUE)
      ->setSettings(['max_length' => 100])
      ->setDisplayOptions('form', ['type' => 'string_textfield', 'weight' => 3])
      ->setDisplayOptions('view', ['type' => 'string', 'weight' => 3]);

    // Número de motores
    $fields['num_motores'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Número de motores'))
      ->setRequired(TRUE)
      ->setSetting('min', 1)
      ->setDisplayOptions('form', ['type' => 'number', 'weight' => 4])
      ->setDisplayOptions('view', ['type' => 'number_integer', 'weight' => 4]);

    // Capacidad de carga (toneladas)
    $fields['capacidad_carga'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Capacidad de carga (toneladas)'))
      ->setRequired(TRUE)
      ->setSetting('precision', 10)
      ->setSetting('scale', 2)
      ->setDisplayOptions('form', ['type' => 'number', 'weight' => 5])
      ->setDisplayOptions('view', ['type' => 'number_decimal', 'weight' => 5]);

    // Número de pasajeros
    $fields['num_pasajeros'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Número de pasajeros'))
      ->setRequired(TRUE)
      ->setSetting('min', 1)
      ->setDisplayOptions('form', ['type' => 'number', 'weight' => 6])
      ->setDisplayOptions('view', ['type' => 'number_integer', 'weight' => 6]);

    // Fecha de última revisión
    $fields['fecha_ultima_revision'] = BaseFieldDefinition::create('datetime')
      ->setLabel(t('Fecha de última revisión'))
      ->setRequired(TRUE)
      ->setSetting('datetime_type', 'date')
      ->setDisplayOptions('form', ['type' => 'datetime_default', 'weight' => 7])
      ->setDisplayOptions('view', ['type' => 'datetime_default', 'weight' => 7]);

    // Fotos del avión (múltiples, almacenamiento privado)
    $fields['fotos'] = BaseFieldDefinition::create('image')
    ->setLabel(t('Fotos'))
    ->setDescription(t('Imágenes del avión'))
    ->setSettings([
        'file_extensions' => 'png jpg jpeg',
        'alt_field' => TRUE,
        'alt_field_required' => FALSE,
        'file_directory' => 'aviones/fotos',
        'uri_scheme' => 'private',
    ])
    ->setCardinality(BaseFieldDefinition::CARDINALITY_UNLIMITED)
    ->setDisplayOptions('form', [
        'type' => 'image_image',
        'weight' => 8,
    ])
    ->setDisplayOptions('view', [
        'type' => 'image',
        'weight' => 8,
        'settings' => [
        'image_style' => 'thumbnail',
        'image_link' => 'file',
        ],
    ]);

    // Archivos adjuntos (múltiples, almacenamiento privado)
    $fields['adjuntos'] = BaseFieldDefinition::create('file')
    ->setLabel(t('Archivos adjuntos'))
    ->setDescription(t('Documentos relacionados con el avión'))
    ->setSettings([
        'file_extensions' => 'pdf doc docx txt xls xlsx zip',
        'file_directory' => 'aviones/adjuntos',
        'uri_scheme' => 'private',
    ])
    ->setCardinality(BaseFieldDefinition::CARDINALITY_UNLIMITED)
    ->setDisplayOptions('form', [
        'type' => 'file_generic',
        'weight' => 9,
    ])
    ->setDisplayOptions('view', [
        'type' => 'file_default',
        'weight' => 9,
    ]);

    return $fields;
  }
}
