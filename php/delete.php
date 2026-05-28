<?php

require_once("conexion.php");

if ($data = json_decode(file_get_contents("php://input"), true)) {
    $mysql_query = "DELETE FROM " . $data['table'] . " WHERE " . $data['where'];

    $ruta = "SELECT imagen FROM productos WHERE idProducto = " . $data['id'];

    if (mysqli_query($conn, $mysql_query)) {
        deleteImage($ruta);
        echo "Eliminado correctamente";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
} else {
    echo "JSON inválido";
}

function deleteImage($ruta)
{
    $rutaCompleta = "C:/xampp/htdocs/PFSM4/" . $ruta;

    if (file_exists($rutaCompleta)) {
        unlink($rutaCompleta);
    }
}