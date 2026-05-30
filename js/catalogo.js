import { filters } from "./filters.js";

const section = document.getElementById("catalogo");

// ─── Filters Tab ────────────────────────────────────────────────────────────
const filterdata = {
    table: "productos",
    items: {
        nombre: "text",
        descripcion: "text",
        precio: "number",
        nombreProveedor: "text"
    }
};

const filterTab = new filters(
    filterdata,
    (where, order, desc) => {
        loadCatalogo(desc, order, where);
    }
);

// Insertar filtros antes del catálogo
section.parentNode.insertBefore(
    filterTab.clone(),
    section
);

// ─── Inicializar catálogo ───────────────────────────────────────────────────
loadCatalogo();

// ─── Cargar catálogo ────────────────────────────────────────────────────────
function loadCatalogo(desc = false, order = "nombre", where = "") {

    fetch("./php/get.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            table: "productos",
            items: "nombre, descripcion, precio, imagen, nombreProveedor, telefono, correo, direccion",
            join: "proveedores",
            on: "productos.idProveedor = proveedores.idProveedor",
            order,
            where,
            desc
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

                        <div class="proveedor-wrapper">
                            <p class="proveedor">${producto.nombreProveedor}</p>

                            <div class="proveedor-info">
                                <p class="telefono">${producto.telefono}</p>
                                <p class="correo">${producto.correo}</p>
                                <p class="direccion">${producto.direccion}</p>
                            </div>
                        </div>
                    </div>
                `;
            });

            section.innerHTML = html;

            // Esperar render para calcular alturas reales
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    iniciarDescripciones();
                });
            });
        });
}

function iniciarDescripciones() {
    document
        .querySelectorAll("#catalogo .descripcion-container")
        .forEach(container => {

            const desc = container.querySelector(".descripcion");
            const btn = container.querySelector(".expandir-desc");
            btn.style.display = "block";
            btn.textContent = "▼";

            if (desc.scrollHeight <= desc.clientHeight + 2) {
                btn.remove();
                return;
            }

            container.classList.add("fade");

            btn.addEventListener("click", () => {
                const expandida = container.classList.toggle("expandida");
                container.classList.toggle("fade", !expandida);
                btn.textContent = expandida ? "▲" : "▼";
            });
        });
}