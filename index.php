<?php
include("php/conexion.php");

$sql = "SELECT * FROM juegos";
$resultado = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Juegos</title>
</head>
<body>

<table border="1" id = "content-table">
    <tr>
        <th>ID</th>
        <th>Distribuidora</th>
        <th>Juego</th>
        <th>Precio</th>
    </tr>

    <?php
while($fila = mysqli_fetch_assoc($resultado)) {

    echo "<tr>";
    echo "<form action='php/update.php' method='post'>";

    echo "<td>".$fila['id']."
            <input type='hidden' name='id' value='".$fila['id']."'>
          </td>";

    echo "<td>
            <input type='text' name='Distribuidora'
            value='".$fila['Distribuidora']."'>
          </td>";

    echo "<td>
            <input type='text' name='Juego'
            value='".$fila['Juego']."'>
          </td>";

    echo "<td>
            <input type='text' name='Precio'
            value='".$fila['Precio']."'>
          </td>";

    echo "<td>
            <button type='submit' name='accion' value='guardar'>
                Save
            </button>
          </td>";

    echo "<td>
            <button type='submit' name='accion' value='eliminar'>
                Delete
            </button>
          </td>";

    echo "</form>";
    echo "</tr>";
}
?>

    <tr id = "new-row">
        <td>X</td>
        <form action="php/insert.php" method="post">
        <td><input type="text" name="distribuidora" id="distribuidora"></td>
        <td><input type="text" name="juego" id="juego"></td>
        <td><input type="text" name="precio" id="precio"></td>
        <td><button type="submit">Agregar</button></td>
        </form>
    </tr>

</table>

<script src="js/edit.js"></script>
</body>
</html>