<?php
// Parámetros de conexión a la base de datos
$host = "localhost";    // Dirección del servidor de la base de datos
$usuario = "root";    // Nombre de usuario de la base de datos
$contrasena = "";    // Contraseña de la base de datos
$nombreBaseDatos = "bingoDB";    // Nombre de la base de datos

// Crear conexión
$conexion = new mysqli($host, $usuario, $contrasena, $nombreBaseDatos);

// Verificar conexión
if ($conexion->connect_error) {
    die("La conexión falló: " . $conexion->connect_error);
}
?>
