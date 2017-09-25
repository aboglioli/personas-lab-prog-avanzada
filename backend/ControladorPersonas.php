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

        $statement = $this->ejecutarSentencia(SentenciasDb::BUSCAR_PERSONAS);

        $arrayPersonas = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $arrayPersonas;
    }

    public function getPersona($id) {
      $statement = $this->ejecutarSentencia(SentenciasDb::BUSCAR_PERSONA,array($id));
      $persona = $statement->fetch();
      if (!$persona) {
        return new ApiError("No se encontrO la persona");
      }
      return $persona;
    }

    public function guardar(){

        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $dni = $_POST['dni'];
        $id = $_POST['id'];

        
        $parametros = array($nombre,$apellido,$dni);

        $resultado = null;
        if ($id == 0) {
            $resultado = $this->ejecutarSentencia(SentenciasDb::INSERTAR_PERSONA, $parametros);

//          if(!$resultado){
//            return new ApiError("Error al crear Persona");
//          }

            $id = $this->getUltimoId();
        } else {
            $parametros[3] = $id;

            $resultado = $this->ejecutarSentencia(SentenciasDb::ACTUALIZAR_PERSONA, $parametros);
          
        }
        
        
        return $this->getPersona($id);
    }

    
    
    
    
    public function eliminar() {
        $id = $_GET['id'];

        $parametros = array($id);

        return $this->ejecutarSentencia(SentenciasDb::BORRAR_PERSONA,$parametros);
    }

}
