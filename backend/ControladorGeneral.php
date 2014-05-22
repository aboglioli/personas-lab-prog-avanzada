<?php
require './ConexionDb.php';

/**
 * Description of ControladorGeneral
 *
 * @author ieltxu
 */
class ControladorGeneral {
    
    private $_conexion = null;
    
    function __construct() {
        $db = new ConexionDb();
        $this->_conexion = $db->getConexion();
    }
    
    public function ejecutarSentencia($parametros,$query) {
        try {
        $sentencia = $this->_conexion->prepare($query);
        
        
            foreach ($parametros as $i => $parametro) {
                $sentencia->bindValue($i+1, $parametro);
            }
            
        $sentencia->execute();
        // CERRAR CONEXION
        return $sentencia;
        } catch (Exception $e) {
            
        }
        
        // CERRAR CONEXION
    }
    
//    try {
//            PreparedStatement ps = conexion.prepareStatement(nroConsulta);
//
//            for (int i = 0; i < arregloDatosCampos.length; i++) {
//                ps.setObject(i + 1, arregloDatosCampos[i]);
//            }
//
//            ps.executeUpdate();
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }

}
