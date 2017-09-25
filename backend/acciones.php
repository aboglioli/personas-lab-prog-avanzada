<?php
require './ControladorPersonas.php';


$accion = $_GET['accion'];

$cP = new ControladorPersonas();

$resultado = "";

switch ($accion) {
    case 'buscar':
        $resultado = $cP->listar();
        break;
    case 'guardar':
        $resultado = $cP->guardar();
        
        break;
    case 'eliminar':
        $resultado = $cP->eliminar();
        break;
    default:
        $resultado = 'No se encontro la accion requerida';
}

echo json_encode($resultado);
