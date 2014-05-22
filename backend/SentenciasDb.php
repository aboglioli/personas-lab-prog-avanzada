<?php

/**
 * Interfaz que contiene las querys de toda la aplicación
 * @author ieltxu
 */
interface SentenciasDb {
   
    const BUSCAR_PERSONAS = "SELECT * FROM persona";
    const AGREGAR_PERSONA = "INSERT INTO persona (nombre, apellido, dni) VALUES (?,?,?)";
    const MODIFICAR_PERSONA = "UPDATE persona SET nombre = ?, apellido = ?, dni = ? WHERE id = ?";
    const BORRAR_PERSONA = "DELETE persona WHERE id = ?";
    
}
