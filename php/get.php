<?php
require_once("conexion.php");

/*
filters = {
    items:  * | columnas separadas por coma - Obligatorio
    table: productos/proveedores/clientes - Obligatorio
    join: productos/proveedores/clientes - Opcional
    on: expresion de unión. Ex: productos.idProveedor = proveedores.idProveedor - Obligatorio si se especifica join
    where: expresion de filtro. Ex: precio > 100 - Opcional
    order: columna para ordenar - Opcional
    desc: true/false - Opcional
}
*/
if ($filters = json_decode(file_get_contents("php://input"), true)) {
    $mysql_query = "SELECT " . $filters['items'] .
        " FROM " . $filters['table'];

    if (!empty($filters['join'])) {
        $mysql_query .= " JOIN " . $filters['join'];
        $mysql_query .= " ON " . $filters['on'];
    }

    if (!empty($filters['where'])) {
        $mysql_query .= ' WHERE ' . $filters['where'];
    }

    if (!empty($filters['order'])) {
        $mysql_query .= ' ORDER BY ' . $filters['order'];
    }

    if (!empty($filters['desc'])) {
        $mysql_query .= ' DESC';
    }

    if (!empty($filters['asc'])) {
        $mysql_query .= ' ASC';
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