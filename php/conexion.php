<?php

$servidor = "localhost";
$usuario = "root";
$password = "";
$bd = "cafeteria";

$conn = mysqli_connect($servidor, $usuario, $password, $bd);

if (!$conn) {
    die("Error de conexión: " . mysqli_connect_error());
}

?>