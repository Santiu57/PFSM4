<!DOCTYPE html>
<html>

<head>
    <title>Cafeteria</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image/webp" href="img/ui/icon.webp">
</head>

<body>
    <header>
        <h1>Admin</h1>
    </header>
    <nav>
        <a href="index.php">Home</a>
        <a href="nosotros.php">Nosotros</a>
        <a href="catalogo.php">Catalogo</a>
        <a href="contacto.php">Contacto</a>
        <a href="admin.php">Admin</a>
    </nav>

    <main>
        <h2>Agregar Producto</h2>
        <form method="POST" action="php/insert.php" enctype="multipart/form-data">
            <input type="text" name="nombre" id="nombre" placeholder="Nombre">
            <input type="text" name="descripcion" id="descripcion" placeholder="Descripcion">
            <input type="number" name="precio" id="precio" placeholder="Precio">
            <input type="text" name="proveedor" id="idProveedor" placeholder="Proveedores">
            <input type="file" name="imagen" id="imagen" accept="image/*">
            <input type="hidden" name="action" value="producto">
            <button type="submit">Agregar</button>
        </form>
        <h2>Agregar Proveedores</h2>
        <form method="POST" action="php/insert.php">
            <input type="text" name="nombre" id="nombre" placeholder="Nombre">
            <input type="text" name="telefono" id="telefono" placeholder="Telefono">
            <input type="email" name="correo" id="correo" placeholder="Correo Electrónico">
            <input type="text" name="direccion" id="direccion" placeholder="Direccion">
            <input type="hidden" name="action" value="proveedor">
            <button type="submit">Agregar</button>
    </main>
    <footer>

    </footer>
    <script src="js/edit.js"></script>
</body>

</html>