const section = document.getElementById("catalogo");

fetch("./php/get.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        table: "productos",
        items: "nombre, descripcion, precio, imagen, nombreProveedor",
        join: "proveedores",
        on: "productos.idProveedor = proveedores.idProveedor",
        order: "nombre",
        desc: false
    })
})
    .then(r => r.json())
    .then(data => {

        let html = "";

        data.forEach(producto => {
            html += `
                <div class="producto">
                    <img src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="catalogo-imagen">

                    <h3 class="nombre">${producto.nombre}</h3>

                    <div class="descripcion-container">
                        <p class="descripcion">${producto.descripcion}</p>
                        <button class="expandir-desc">⌄</button>
                    </div>

                    <p class="precio">$${producto.precio}</p>
                    <p class="proveedor">${producto.nombreProveedor}</p>
                </div>
            `;
        });

        section.innerHTML = html;

        // Doble rAF: el primero encola el paint, el segundo se ejecuta
        // después de que el navegador ya calculó las alturas reales
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                iniciarDescripciones();
            });
        });
    });

function iniciarDescripciones() {
    document
        .querySelectorAll("#catalogo .descripcion-container")
        .forEach(container => {

            const desc = container.querySelector(".descripcion");
            const btn = container.querySelector(".expandir-desc");
            btn.style.display = "block";
            btn.textContent = "▼   ";

            // Si el texto cabe completo, quitar el botón
            if (desc.scrollHeight <= desc.clientHeight + 2) {
                btn.remove();
                return;
            }

            container.classList.add("fade");

            btn.addEventListener("click", () => {
                const expandida = container.classList.toggle("expandida");
                container.classList.toggle("fade", !expandida);
            });
        });
}