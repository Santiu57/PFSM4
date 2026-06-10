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
                <p>Cafetería Kokomilk es un espacio dedicado a ofrecer alimentos y bebidas de calidad a la comunidad
                    escolar. <br>
                    Nuestro compromiso es proporcionar un servicio eficiente y productos frescos, <br>
                    contribuyendo
                    al bienestar de estudiantes, docentes y personal administrativo durante su jornada escolar.
                </p>
                <p>Nuestro objetivo es brindar un servicio rápido, accesible y confiable, contribuyendo al bienestar de
                    la comunidad educativa durante sus actividades diarias.</p>
                <img id="imagen-nosotros" src="img/ui/icon.webp" alt="Imagen de la cafetería">
            </article>
            <article class="tarjeta">
                <h2>Horarios de atención</h2>

                <p>Nuestra cafetería está disponible para atender a estudiantes, docentes y personal administrativo
                    durante la jornada escolar.</p>

                <ul>
                    <li><strong>Lunes a Viernes:</strong> 7:00 AM - 4:00 PM</li>
                    <li><strong>Receso matutino:</strong> Atención continua</li>
                    <li><strong>Horario de comida:</strong> Atención continua</li>
                    <li><strong>Sábados, Domingos y días festivos:</strong> Cerrado</li>
                </ul>

                <p>Los horarios pueden variar durante periodos vacacionales, eventos institucionales o días
                    especiales.</p>
            </article>
            <article class="tarjeta">
                <h2>Nuestros valores</h2>
                <ul>
                    <li><strong>Atención:</strong> Buscamos brindar un servicio amable y eficiente a todos nuestros
                        clientes.</li>
                    <li><strong>Responsabilidad:</strong> Mantenemos altos estándares de higiene y organización en
                        nuestras operaciones diarias.</li>
                    <li><strong>Compromiso:</strong> Trabajamos para satisfacer las necesidades de la comunidad escolar
                        y mejorar continuamente nuestro servicio.</li>
                </ul>
            </article>
            <article class="tarjeta">
                <h2>Nuestro equipo</h2>
                <p>Cada integrante del equipo contribuye a ofrecer una experiencia agradable, asegurando una atención
                    eficiente y productos de calidad durante toda la jornada escolar.</p>
            </article>
        </section>
    </main>

    <footer>
        <p>© Cafeteria Kokomilk</p>
        <p>CBTIS 4 Programación</p>
        <p>4° Semestre </p>
        <p>Eq006</p>
    </footer>
</body>

</html>