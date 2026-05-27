<?php

require_once("conexion.php");

// Verificar que se recibió una solicitud POST
if ($_POST) {
    // Verificar el tipo de acción a realizar
    switch ($_POST["action"]) {
        case "producto":
            $nombre = $_POST["nombre"];
            $descripcion = $_POST["descripcion"];
            $precio = $_POST["precio"];
            $proveedor = $_POST["proveedor"];

            $imagen = copyImage($_FILES['imagen'], $nombre);

            $sql =
                "INSERT INTO  productos (nombre, descripcion, precio, imagen, idProveedor) 
                VALUES ('$nombre', '$descripcion', '$precio', '$imagen', '$proveedor')";

            break;
        case "proveedor":
            $nombre = $_POST["nombre"];
            $telefono = $_POST["telefono"];
            $correo = $_POST["correo"];
            $direccion = $_POST["direccion"];

            $sql =
                "INSERT INTO  proveedores (nombreProveedor, telefono, correo, direccion) 
                VALUES ('$nombre', '$telefono', '$correo', '$direccion')";
            break;
    }

    // Ejecutar la consulta SQL
    if (mysqli_query($conn, $sql)) {
        echo "Registro agregado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

mysqli_close($conn);

function copyImage($archivo, $nombre)
{
    $carpeta = "C:/xampp/htdocs/PFSM4/img/productos/";

    // Verificar que no hubo errores al subir el archivo
    if ($archivo['error'] === 0) {

        $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);

        $nuevoNombre = $nombre . "." . $extension;

        $rutaFinal = $carpeta . $nuevoNombre;

        // Mover archivo
        if (move_uploaded_file($archivo['tmp_name'], $rutaFinal)) {
            // Retornar ruta relativa para guardar en la base de datos
            return "img/productos/$nuevoNombre";
        } else {
            return false;
        }

    } else {
        return false;
    }
}