<?php

/**
 * Interface donde defino las querys que se utilizarán en la aplicación
 *
 * @author ieltxu
 */
Interface SentenciasDb {

    const BUSCAR_PERSONAS = "SELECT * FROM persona";
    const INSERTAR_PERSONA = "INSERT INTO persona (nombre, apellido, dni) VALUES (?,?,?)";
    const ACTUALIZAR_PERSONA = "UPDATE persona SET nombre = ?, apellido = ?, dni = ? WHERE id = ?";
    const BORRAR_PERSONA = "DELETE from persona WHERE id = ?";
    const BUSCAR_PERSONA = "SELECT * FROM persona WHERE id = ?";
}
