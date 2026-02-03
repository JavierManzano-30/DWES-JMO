<?php

namespace Drupal\aviones\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

class AvionForm extends ContentEntityForm {

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);

    return $form;
  }

  public function save(array $form, FormStateInterface $form_state) {
    $entity = $this->getEntity();
    $status = parent::save($form, $form_state);

    if ($status === SAVED_NEW) {
      $this->messenger()->addMessage(t('El avión ha sido creado.'));
    }
    else {
      $this->messenger()->addMessage(t('El avión ha sido actualizado.'));
    }

    $form_state->setRedirect('aviones.collection');
  }
}
