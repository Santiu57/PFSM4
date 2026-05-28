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

    <main id="content">
        <h2>Productos</h2>
        <section id="productos">

        </section>
        <script src="js/admin/productos.js" type="module"></script>
        <h2>Proveedores</h2>
        <section id="proveedores">

        </section>
        <script src="js/admin/proveedores.js" type="module"></script>
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
</body>

</html>