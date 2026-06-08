<!DOCTYPE html>
<html>

<head>
    <title>Cafeteria Kokomilk</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image/webp" href="img/ui/icon.webp">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <header>
        <h1>Home</h1>
    </header>
    <nav>
        <!-- Obtiene la pagina actual sin necesidad de javascritp y le añade la clase active para que mantenga el estilo hover y señalar que es la pagina actual -->
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
        <h2>Bienvenido</h2>
        <section class="tarjetas">
            <article class="tarjeta">
                <p class="up">¿Deseas ver nuestro catálogo?</p>
                <p class="middle">Aquí encontrarás todo lo que necesitas.</p>
                <a class="down" href="catalogo.php">Ver catálogo</a>
            </article>
            <article class="tarjeta">
                <p class="up">¿Deseas conocernos?</p>
                <p class="middle">Aqui encontrarás más información sobre nosotros.</p>
                <a class="down" href="nosotros.php">Conocenos</a>
            </article>
            <article class="tarjeta">
                <p class="up">¿Deseas contactarnos?</p>
                <p class="middle">Estamos aquí para ayudarte.</p>
                <a class="down" href="contacto.php">Contactanos</a>
            </article>
        </section>
    </main>

    <footer>
        <p>© Cafeteria Kokomilk</p>
    </footer>
</body>

</html>