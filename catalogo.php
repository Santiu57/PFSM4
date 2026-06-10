<?php

require_once("php/conexion.php");

?>

<!DOCTYPE html>
<html>

<head>
    <title>Catalogo</title>
    <link rel="icon" type="image/webp" href="img/ui/icon.webp">
    <link rel="stylesheet" href="css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <header>
        <h1>Catalogo</h1>
    </header>
    <nav>
        <a class="<?= basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : '' ?>" href="index.php">Home</a>
        <a class="<?= basename($_SERVER['PHP_SELF']) == 'nosotros.php' ? 'active' : '' ?>"
            href="nosotros.php">Nosotros</a>
        <a class="<?= basename($_SERVER['PHP_SELF']) == 'catalogo.php' ? 'active' : '' ?>"
            href="catalogo.php">Catálogo</a>
        <a class="<?= basename($_SERVER['PHP_SELF']) == 'contacto.php' ? 'active' : '' ?>"
            href="contacto.php">Contacto</a>
        <a class="<?= basename($_SERVER['PHP_SELF']) == 'admin.php' ? 'active' : '' ?>" href="admin.php">Admin</a>

        <div class="toggle-dark-mode">
            <input type="checkbox" id="darkModeToggle">
            <label for="darkModeToggle"></label>
        </div>
    </nav>

    <script src="js/darkMode.js"></script>

    <main>
        <section id="catalogo">

        </section>
    </main>

    <script src="js/catalogo.js" type="module"></script>

    <footer>
        <p>© Cafeteria Kokomilk</p>
        <p>CBTIS 4 Programación</p>
        <p>4° Semestre </p>
        <p>Eq006</p>
    </footer>

</body>

</html>