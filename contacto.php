<!DOCTYPE html>
<html>

<head>
    <title>Cafeteria</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image/webp" href="img/ui/icon.webp">
</head>

<body>
    <header>
        <h1>Contacto</h1>
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

    </main>

    <footer>

    </footer>

    <script src="js/edit.js"></script>
</body>

</html>