<?php

namespace Drupal\aviones;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;

class AvionListBuilder extends EntityListBuilder {

  public function buildHeader() {
    $header['id'] = $this->t('ID');
    $header['matricula'] = $this->t('Matrícula');
    $header['fabricante'] = $this->t('Fabricante');
    $header['modelo'] = $this->t('Modelo');
    $header['num_motores'] = $this->t('Motores');
    $header['num_pasajeros'] = $this->t('Pasajeros');
    return $header + parent::buildHeader();
  }

  public function buildRow(EntityInterface $entity) {
    /** @var \Drupal\aviones\Entity\Avion $entity */
    $row['id'] = $entity->id();
    $row['matricula'] = $entity->get('matricula')->value;
    $row['fabricante'] = $entity->get('fabricante')->entity?->label();
    $row['modelo'] = $entity->get('modelo')->value;
    $row['num_motores'] = $entity->get('num_motores')->value;
    $row['num_pasajeros'] = $entity->get('num_pasajeros')->value;
    return $row + parent::buildRow($entity);
  }
}
