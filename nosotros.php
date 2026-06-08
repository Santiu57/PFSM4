<!DOCTYPE html>
<html>

<head>
    <title>Cafeteria Kokomilk</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" type="image/webp" href="img/ui/icon.webp">
</head>

<body>
    <header>
        <h1>Nosotros</h1>
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
        <section class="tarjetas">
            <article class="tarjeta">
                <h2>¿Quiénes somos?</h2>
                <p>Somos una cafetería dedicada a ofrecer la mejor experiencia en café y productos relacionados al coco.
                </p>
                <p>
                    Nuestro
                    objetivo es brindar a nuestros clientes un ambiente acogedor y productos de alta calidad que
                    satisfagan
                    sus
                    gustos y necesidades.</p>
                <img id="imagen-nosotros" src="img/ui/icon.webp" alt="Imagen de la cafetería">
            </article>
            <article class="tarjeta">
                <h2>Nuestra historia</h2>
                <p>Fundada en 2020, nuestra cafetería nació de la pasión por el café y el coco. </p>
                <p> Desde entonces, hemos
                    crecido y nos hemos convertido
                    en un
                    lugar de referencia para los amantes del café y el coco en nuestra comunidad.</p>
            </article>
            <article class="tarjeta">
                <h2>Nuestros valores</h2>
                <ul>
                    <li><strong>Calidad:</strong> Nos esforzamos por ofrecer productos de la más alta calidad,
                        utilizando
                        granos
                        de café seleccionados y los mejores cocos importados.</li>
                    <li><strong>Servicio al cliente:</strong> Valoramos a nuestros clientes y nos comprometemos a
                        brindar un
                        servicio excepcional para garantizar su satisfacción.</li>
                    <li><strong>Sostenibilidad:</strong> Estamos comprometidos con prácticas sostenibles, desde la
                        selección
                        de
                        proveedores hasta la gestión de residuos, para minimizar nuestro impacto ambiental.</li>
                </ul>
            </article>
            <article class="tarjeta">
                <h2>Nuestro equipo</h2>
                <p>Contamos con un equipo apasionado y dedicado que trabaja arduamente para crear una experiencia única
                    para
                    nuestros clientes. </p>
                <p>Desde baristas expertos hasta personal amable, cada miembro del equipo contribuye
                    a
                    hacer
                    de nuestra cafetería un lugar especial.</p>
            </article>
        </section>
    </main>

    <footer>
        <p>© Cafeteria Kokomilk</p>
    </footer>
</body>

</html>