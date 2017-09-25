<?php

require './ConexionDb.php';

$db = new ConexionDb();

$conexion = $db->getConexion();

$query= "SELECT * FROM persona";

$statement = $conexion->prepare($query);

$statement->execute();

$arrayPersonas = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($arrayPersonas);