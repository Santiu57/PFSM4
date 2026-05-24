<?php

include("conexion.php");

if ($_POST) {
    $distribuidora = $_POST['distribuidora'];
    $juego = $_POST['juego'];
    $precio = $_POST['precio'];

    $sql = "INSERT INTO juegos (distribuidora, juego, precio) VALUES ('$distribuidora', '$juego', '$precio')";

    if (mysqli_query($conn, $sql)) {
        echo "Registro agregado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

if ($data = json_decode(file_get_contents("php://input"), true)) {
    $distribuidora = $data['distribuidora'];
    $juego = $data['juego'];
    $precio = $data['precio'];

    $sql = "INSERT INTO juegos (distribuidora, juego, precio) VALUES ('$distribuidora', '$juego', '$precio')";

    if (mysqli_query($conn, $sql)) {
        echo "Registro agregado correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>