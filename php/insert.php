<?php

require_once("conexion.php");

// Verificar que exista table
if (!isset($_POST["table"])) {
    die("No se recibió table");
}

switch ($_POST["table"]) {

    case "productos":

        $nombre = $_POST["nombre"] ?? "";
        $descripcion = $_POST["descripcion"] ?? "";
        $precio = $_POST["precio"] ?? "";
        $proveedor = $_POST["proveedor"] ?? "";

        // Esperar FormData con archivo
        if (!isset($_FILES["imagen"]) || $_FILES["imagen"]["error"] !== 0) {
            die("Imagen no recibida");
        }

        $imagen = copyImage($_FILES["imagen"], $nombre);

        if (!$imagen) {
            die("Error al guardar imagen");
        }

        $sql = "INSERT INTO productos ( nombre, descripcion, precio, imagen, idProveedor )
                VALUES ( '$nombre', '$descripcion', '$precio', '$imagen', '$proveedor' )";

        break;

    case "proveedores":

        $nombre = $_POST["nombre"] ?? "nombre";
        $telefono = $_POST["telefono"] ?? "";
        $correo = $_POST["correo"] ?? "";
        $direccion = $_POST["direccion"] ?? "";

        $sql = "INSERT INTO proveedores ( nombreProveedor, telefono, correo, direccion )
                VALUES ( '$nombre', '$telefono', '$correo', '$direccion' )";

        break;

    case "clientes":
        $nombre = $_POST["nombre"] ?? "nombre";
        $telefono = $_POST["telefono"] ?? "";
        $correo = $_POST["correo"] ?? "";

        $sql = "INSERT INTO clientes ( nombre, telefono, correo )
                VALUES ( '$nombre', '$telefono', '$correo' )";

        break;

    default:
        die("Tabla inválida");
}

// Ejecutar SQL
if (mysqli_query($conn, $sql)) {
    echo "Registro agregado correctamente";
} else {
    echo mysqli_error($conn);
}

mysqli_close($conn);

function copyImage($archivo, $nombre)
{
    $carpeta = "C:/xampp/htdocs/PFSM4/img/productos/";

    if ($archivo["error"] === 0) {

        $extension = pathinfo($archivo["name"], PATHINFO_EXTENSION);
        $nuevoNombre = preg_replace("/[^a-zA-Z0-9_-]/", "_", $nombre) . "." . $extension;
        $rutaFinal = $carpeta . $nuevoNombre;

        if (move_uploaded_file($archivo["tmp_name"], $rutaFinal)) {
            return "img/productos/$nuevoNombre";
        }
    }

    return false;
}