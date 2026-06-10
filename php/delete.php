<?php

require_once("conexion.php");
include("backup.php");

/*
    table: nombre de la tabla
    where: condición para eliminar (ejemplo: "idProducto = 5")
    id: id del producto (solo necesario si se va a eliminar una imagen)
*/

if ($data = json_decode(file_get_contents("php://input"), true)) {
    $mysql_query = "DELETE FROM " . $data['table'] . " WHERE " . $data['where'];

    if ($data['table'] === "productos") {
        $sqlruta = 'SELECT imagen FROM productos WHERE idProducto = ' . $data['id'];
        $resultado = mysqli_query($conn, $sqlruta);
        $row = mysqli_fetch_assoc($resultado);
        $ruta = $row['imagen'];
    }

    if (mysqli_query($conn, $mysql_query)) {
        echo "Eliminado correctamente";
        if ($data['table'] === "productos") {
            deleteImage($ruta);
        }
        backupDatabase();
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
        if (unlink($rutaCompleta)) {
            echo " ✅";
        } else {
            $error = error_get_last();
            echo "Error al eliminar: " . $error["message"];
        }
    }
}