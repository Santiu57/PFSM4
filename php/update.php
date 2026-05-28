<?php

include("../php/conexion.php");

if ($_POST) {

    switch ($_POST["table"]) {

        case "productos":

            $id =
                $_POST["id"];

            $nombre =
                $_POST["nombre"];

            $descripcion =
                $_POST["descripcion"];

            $precio =
                $_POST["precio"];

            $proveedor =
                $_POST["proveedor"];

            // Obtener imagen actual
            $query = mysqli_query(
                $conn,
                "SELECT imagen
                FROM productos
                WHERE idProducto = $id"
            );

            $row = mysqli_fetch_assoc($query);

            $imagenActual =
                $row["imagen"];

            $rutaActual =
                "C:/xampp/htdocs/PFSM4/" .
                $imagenActual;

            $imagenFinal =
                $imagenActual;

            // nombre limpio
            $nombreLimpio =
                preg_replace(
                    "/[^a-zA-Z0-9_-]/",
                    "_",
                    $nombre
                );

            // SI CAMBIÓ IMAGEN
            if (
                isset($_FILES["imagen"]) &&
                $_FILES["imagen"]["error"] == 0
            ) {

                // borrar anterior
                if (
                    file_exists(
                        $rutaActual
                    )
                ) {
                    unlink(
                        $rutaActual
                    );
                }

                // guardar nueva
                $imagenNueva =
                    copyImage(
                        $_FILES["imagen"],
                        $nombre
                    );

                if (!$imagenNueva) {
                    die(
                        "Error al guardar imagen"
                    );
                }

                $imagenFinal =
                    $imagenNueva;
            }

            // SI NO CAMBIÓ IMAGEN
            // pero cambió nombre -> renombrar archivo
            else {

                if (
                    file_exists(
                        $rutaActual
                    )
                ) {

                    $extension =
                        pathinfo(
                            $rutaActual,
                            PATHINFO_EXTENSION
                        );

                    $nuevoArchivo =
                        "img/productos/" .
                        $nombreLimpio .
                        "." .
                        $extension;

                    $rutaNueva =
                        "C:/xampp/htdocs/PFSM4/" .
                        $nuevoArchivo;

                    if (
                        $imagenActual !=
                        $nuevoArchivo
                    ) {

                        rename(
                            $rutaActual,
                            $rutaNueva
                        );

                        $imagenFinal =
                            $nuevoArchivo;
                    }
                }
            }

            $sql =
                "UPDATE productos SET
        nombre = '" .
                mysqli_real_escape_string(
                    $conn,
                    $nombre
                ) .
                "',
        descripcion = '" .
                mysqli_real_escape_string(
                    $conn,
                    $descripcion
                ) .
                "',
        precio = '" .
                mysqli_real_escape_string(
                    $conn,
                    $precio
                ) .
                "',
        idProveedor = '" .
                mysqli_real_escape_string(
                    $conn,
                    $proveedor
                ) .
                "',
        imagen = '" .
                mysqli_real_escape_string(
                    $conn,
                    $imagenFinal
                ) .
                "'
        WHERE idProducto = $id";

            break;

        case "proveedores":

            $id = $_POST["id"];
            $nombreProveedor = $_POST["nombreProveedor"];
            $telefono = $_POST["telefono"];
            $correo = $_POST["correo"];
            $direccion = $_POST["direccion"];

            $sql =
                "UPDATE proveedores SET
                nombreProveedor = '" . mysqli_real_escape_string($conn, $nombreProveedor) . "',
                telefono = '" . mysqli_real_escape_string($conn, $telefono) . "',
                correo = '" . mysqli_real_escape_string($conn, $correo) . "',
                direccion = '" . mysqli_real_escape_string($conn, $direccion) . "'
                WHERE idProveedor = $id";

            break;
    }

    if (mysqli_query($conn, $sql)) {
        echo "Registro actualizado correctamente";
    } else {
        echo "Error: " . mysqli_error($conn);
    }

} else {
    echo "No se recibieron datos";
}

mysqli_close($conn);

function copyImage(
    $archivo,
    $nombre
) {

    $carpeta =
        "C:/xampp/htdocs/PFSM4/img/productos/";

    if (
        $archivo["error"] === 0
    ) {

        $extension =
            pathinfo(
                $archivo["name"],
                PATHINFO_EXTENSION
            );

        $nuevoNombre =
            preg_replace(
                "/[^a-zA-Z0-9_-]/",
                "_",
                $nombre
            ) .
            "." .
            $extension;

        $rutaFinal =
            $carpeta .
            $nuevoNombre;

        if (
            move_uploaded_file(
                $archivo["tmp_name"],
                $rutaFinal
            )
        ) {
            return
                "img/productos/" .
                $nuevoNombre;
        }
    }

    return false;
}