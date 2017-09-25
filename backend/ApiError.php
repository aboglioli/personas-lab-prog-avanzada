<?php

/**
 * Clase Errores
 *
 * @author ieltxu
 */
class ApiError {
  private $_codigo;
  private $_mensaje;

  public function __construct($mensaje, $codigo = 503) {
    $this->_mensaje = $mensaje;
  }

  public function setMensaje($mensaje) {
    $this->_mensaje = $mensaje;
  }

  public function getMensaje() {
    return $this->_mensaje;
  }

}
