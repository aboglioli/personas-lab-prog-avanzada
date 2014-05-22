<?php
require './ControladorGeneral.php';
require './SentenciasDb.php';
/**
 * Description of ControladorPersonas
 *
 * @author ieltxu
 */
class ControladorPersonas extends ControladorGeneral implements SentenciasDb{
    
    public function listar() {
        
        $statement = $this->ejecutarSentencia(null, SentenciasDb::BUSCAR_PERSONAS);

        $arrayPersonas = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $arrayPersonas;
      
    }
    
    public function guardar(){
        
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $dni = $_POST['dni'];
        $id = $_POST['id'];
        if($nombre == "") {
            return "Hay que completar el nombre";
        }
        $parametros = array($nombre,$apellido,$dni);
        if($id == 0) {
            
        return $statement = $this->ejecutarSentencia($parametros, SentenciasDb::AGREGAR_PERSONA);
        
        } else {
        $parametros[3] = $id;
        return $statement = $this->ejecutarSentencia($parametros, SentenciasDb::MODIFICAR_PERSONA);

        }
        
    }
    
    public function eliminar() {
        $id = $_GET['id'];
        
        $parametros = array($id);
        
        return $statement = $this->ejecutarSentencia($parametros, SentenciasDb::BORRAR_PERSONA);
    }

}
