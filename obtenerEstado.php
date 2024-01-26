<?php
include 'conexion.php';

// Consulta para obtener el estado actual de todas las celdas
$query = "SELECT * FROM celdas";
$resultado = mysqli_query($conexion, $query);

$estadoCeldas = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $estadoCeldas[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($estadoCeldas);
?>
