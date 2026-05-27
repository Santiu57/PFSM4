<?php
require_once("conexion.php");

if ($filters = json_decode(file_get_contents("php://input"), true)) {
    $mysql_query = "SELECT " . $filters['items'] .
        " FROM " . $filters['table'];

    if ($filters['join']) {
        $mysql_query .= " JOIN " . $filters['join'];
        $mysql_query .= " ON " . $filters['on'];
    }

    if ($resultado = mysqli_query($conn, $mysql_query)) {
        $productos = [];

        while ($fila = mysqli_fetch_assoc($resultado)) {
            $productos[] = $fila;
        }

        echo json_encode($productos);
    } else {
        echo "Error: " . mysqli_error($conn);
    }
} else {
    echo "JSON inválido";
}