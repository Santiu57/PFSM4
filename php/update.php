<?php

include("../php/conexion.php");

if ($data = json_decode(file_get_contents("php://input"), true)) {
    switch ($data["table"]) {
        case "productos":
            $sql =
                "UPDATE productos SET 
                nombre = '{$data['nombre']}',
                descripcion = '{$data['descripcion']}',
                precio = '{$data['precio']}',
                idProveedor = '{$data['proveedor']}'
                WHERE idProducto = {$data['id']}";
            break;
        case "proveedores":
            $sql =
                "UPDATE proveedores SET 
                nombre = '{$data['nombre']}'
                WHERE idProveedor = {$data['id']}";
            break;
    }

    if (mysqli_query($conn, $sql)) {
        echo "Registro actualizado correctamente";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
} else {
    echo "No se recibieron datos JSON";
}

mysqli_close($conn);