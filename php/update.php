<?php

include("../php/conexion.php");

if ($_POST) {
    $id = $_POST['id'];
    $distribuidora = $_POST['Distribuidora'];
    $juego = $_POST['Juego'];
    $precio = $_POST['Precio'];

    $accion = $_POST['accion'];

    if($accion == "guardar") {
        $sql = "UPDATE juegos SET distribuidora='$distribuidora', juego='$juego', precio='$precio' WHERE id=$id";
    }

    if($accion == "eliminar") {
        $sql = "DELETE FROM juegos WHERE id=$id";
    }

    if (mysqli_query($conn, $sql)) {
        echo "Registro actualizado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>