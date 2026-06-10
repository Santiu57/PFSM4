<?php

require_once("conexion.php");
include("backup.php");

/*
    Recibe datos de un formulario y los inserta en la tabla correspondiente.
    Para productos, también maneja la imagen.

    POST:
    - table: productos, proveedores o clientes
    - Otros campos según la tabla (ver switch)
*/

// Verificar que exista table
if (!isset($_POST["table"])) {
    die("No se recibió table");
}

switch ($_POST["table"]) {

    case "productos":

        /*
            Productos:
            - nombre
            - descripcion
            - precio
            - proveedor (idProveedor)
            - imagen (archivo)
        */

        $nombre = $_POST["nombre"] ?? "";
        $descripcion = $_POST["descripcion"] ?? "";
        $precio = $_POST["precio"] ?? "";
        $proveedor = $_POST["proveedor"] ?? "";

        // Esperar FormData con archivo
        if (!isset($_FILES["imagen"]) || $_FILES["imagen"]["error"] !== 0) {
            die("Imagen no recibida");
        }

        $imagen = copyImage($_FILES["imagen"], $nombre, $conn);

        if (!$imagen) {
            die("Error al guardar imagen");
        }

        $sql = "INSERT INTO productos ( nombre, descripcion, precio, imagen, idProveedor )
                VALUES ( '$nombre', '$descripcion', '$precio', '$imagen', '$proveedor' )";

        break;

    case "proveedores":

        /*
            Proveedores:
            - nombreProveedor
            - telefono
            - correo
            - direccion
        */

        $nombre = $_POST["nombreProveedor"] ?? "";
        $telefono = $_POST["telefono"] ?? "";
        $correo = $_POST["correo"] ?? "";
        $direccion = $_POST["direccion"] ?? "";

        $sql = "INSERT INTO proveedores ( nombreProveedor, telefono, correo, direccion )
                VALUES ( '$nombre', '$telefono', '$correo', '$direccion' )";

        break;

    case "clientes":
        /*
            Clientes:
            - nombre
            - telefono
            - correo
        */
        $nombre = $_POST["nombre"] ?? "";
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
    backupDatabase();
} else {
    echo mysqli_error($conn);
}

mysqli_close($conn);

/**
 * Copia una imagen subida a la carpeta de imágenes y devuelve la ruta.
 * @param mixed $archivo - El archivo de imagen (de $_FILES)
 * @param mixed $nombre - El nombre del producto para generar el nombre del archivo
 * @param mixed $conn - La conexión a la base de datos para obtener el último ID
 * @return string | bool
 */
function copyImage($archivo, $nombre, $conn)
{
    $carpeta = "C:/xampp/htdocs/PFSM4/img/productos/";

    if ($archivo["error"] === 0) {

        // Obtener último ID para nombrar la imagen con el formato ID_nombre.extensión
        $query = "SELECT MAX(idProducto) AS ultimo FROM productos";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);

        // Sumar 1 al último ID
        $nuevoId = ($row["ultimo"]) + 1;

        // Obtener extensión
        $extension = pathinfo($archivo["name"], PATHINFO_EXTENSION);

        // Limpiar nombre y agregar prefijo ID
        $nombreLimpio = preg_replace("/[^a-zA-Z0-9_-]/", "_", $nombre);
        $nuevoNombre = $nuevoId . "_" . $nombreLimpio . "." . $extension;

        $rutaFinal = $carpeta . $nuevoNombre;

        if (move_uploaded_file($archivo["tmp_name"], $rutaFinal)) {
            return "img/productos/$nuevoNombre";
        }
    }

    return false;
}