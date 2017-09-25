<?php

/**
 * Esta clase se encarga de conectar con la base de datos
 *
 * @author ieltxu
 */
class ConexionDb {
    
    private $_conexion = null;
    private $_usuario = 'root';
    private $_clave = '';
    public function __construct() {
        $this->_conexion = new PDO("mysql:dbname=tutorial;host=localhost", $this->_usuario, $this->_clave);
    }
    
    

    /**
     * 
     * @return PDO
     */
    public function getConexion() { 
        return $this->_conexion;
    }
    
}
