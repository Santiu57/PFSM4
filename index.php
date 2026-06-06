<!DOCTYPE html>
<html>

<head>
	<title>Cafeteria</title>
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
		<h2>bienvenido</h2>
		<section class="proveedor">
			<p>¿Quieres ordenar algo?</p>
			<p>Presiona el siguente boton para poder ordenar.</p>
			<a href="catalogo.php">ordena lo que mas se te antoje</a>
		</section>
		<section class="proveedor">
			<p>¿Deseas conocernos?</p>
			<p>Entoces presiona el siguente boton para culturizarte.</p>
			<a href="nosotros.php">conocenos</a>
		</section>
		<section class="proveedor">
			<p>¿Quieres que promocionemos tu marca o trabajar con nosotros?</p>
			<p>¡Entonces dale! contacta con nosotros para ponernos de acuerdo.</p>
			<a href="contacto.php">Contactanos</a>
		</section>
	</main>

	<footer>
		<p>© Cafeteria Kokomilk</p>
	</footer>

	<script src="js/edit.js"></script>
</body>

</html>