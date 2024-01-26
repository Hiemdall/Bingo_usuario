<?php
include 'conexion.php';

if (isset($_POST['celdaId'])) {
    $numeroId = (int) $_POST['celdaId'];

    $query = "UPDATE celdas SET estado = NOT estado WHERE id = $numeroId";
    $resultado = mysqli_query($conexion, $query);

    if ($resultado) {
        echo "Estado actualizado para celda: $numeroId";
    } else {
        echo "Error al actualizar: " . mysqli_error($conexion);
    }
} else {
    echo "No se recibió celdaId";
}
?>
