import { filters } from "../filters.js";

const section = document.getElementById("proveedores");

// ─── Sección "Agregar Proveedor" ────────────────────────────────────────────
const agregar = document.createElement("section");
agregar.className = "agregar";
agregar.id = "agregar-proveedor";
section.appendChild(agregar);

// ─── Filters Tab ────────────────────────────────────────────────────────────
const filterdata = {
    table: "proveedores",
    items: {
        idProveedor: { type: "number", label: "ID de Proveedor" },
        nombreProveedor: { type: "text", label: "Nombre" },
        telefono: { type: "text", label: "Telefono" },
        correo: { type: "text", label: "Correo" },
        direccion: { type: "text", label: "Dirección" },
    }
};

const filterTab = new filters(
    filterdata,
    (where, order, desc) => {
        load(desc, order, where);
    }
);

section.appendChild(
    filterTab.clone()
);

// ─── Contenedor de proveedores ──────────────────────────────────────────────
const proveedoresContainer = document.createElement("div");
proveedoresContainer.id = "proveedores-container";
section.appendChild(proveedoresContainer);

// ─── Inicializar ────────────────────────────────────────────────────────────
load();

// ─── Cargar y renderizar Proveedores ────────────────────────────────────────
async function load(desc = false, order = "idProveedor", where = "") {

    proveedoresContainer.innerHTML = "";

    const response = await fetch("./php/get.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            table: "proveedores",
            items: "idProveedor, nombreProveedor, telefono, correo, direccion",
            order,
            where,
            desc
        })
    });

    const text = await response.text();

    let data;
    try {
        data = JSON.parse(text);
    } catch {
        console.error("Respuesta no JSON:", text);
        return;
    }

    if (!data) return;
    proveedoresContainer.innerHTML = "";
    data.forEach(proveedor => {

        const div = document.createElement("div");
        div.className = "proveedor";
        div.dataset.id = proveedor.idProveedor;

        div.innerHTML = `
                    <p class="id">#${proveedor.idProveedor}</p>

                    <div class="campo">
                        <p class="label">Nombre</p>
                        <input
                            type="text"
                            name="nombreProveedor"
                            class="nombre-Upd"
                            value="${proveedor.nombreProveedor}">
                    </div>

                    <div class="campo">
                        <p class="label">Teléfono</p>
                        <input
                            type="text"
                            name="telefono"
                            class="telefono-Upd"
                            value="${proveedor.telefono}">
                    </div>

                    <div class="campo">
                        <p class="label">Correo</p>
                        <input
                            type="email"
                            name="correo"
                            class="correo-Upd"
                            value="${proveedor.correo}">
                    </div>

                    <div class="campo">
                        <p class="label">Dirección</p>
                        <input
                            type="text"
                            name="direccion"
                            class="direccion-Upd"
                            value="${proveedor.direccion}">
                    </div>

                    <div class="campo">
                        <button class="update">Actualizar</button>
                        <button class="delete">Eliminar</button>
                    </div>
                `;

        proveedoresContainer.appendChild(div);
    });
}

// ─── Delegación de clicks (update / delete) ────────────────────────────────
section.addEventListener("click", e => {

    const card = e.target.closest(".proveedor");
    if (!card) return;

    const id = card.dataset.id;

    if (e.target.classList.contains("update"))
        actualizarProveedor(id);

    if (e.target.classList.contains("delete"))
        eliminarProveedor(id);
});

// ─── Actualizar proveedor ───────────────────────────────────────────────────
async function actualizarProveedor(id) {

    const card = document.querySelector(
        `.proveedor[data-id="${id}"]`
    );

    const formData = new FormData();

    formData.append("idProveedor", id);
    formData.append(
        "nombreProveedor",
        card.querySelector(".nombre-Upd").value
    );
    formData.append(
        "telefono",
        card.querySelector(".telefono-Upd").value
    );
    formData.append(
        "correo",
        card.querySelector(".correo-Upd").value
    );
    formData.append(
        "direccion",
        card.querySelector(".direccion-Upd").value
    );
    formData.append("table", "proveedores");

    const response = await fetch("./php/update.php", {
        method: "POST",
        body: formData
    });
    const text = await response.text();
    alert(text);
    dispatchEvent(
        new Event("updateProveedores")
    );
}

// ─── Eliminar proveedor ─────────────────────────────────────────────────────
async function eliminarProveedor(id) {

    if (!confirm(
        "¿Eliminar proveedor?\nTodos los productos asociados también serán eliminados."
    )) return;

    const response = await fetch("./php/delete.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            where: `idProveedor = ${id}`,
            table: "proveedores"
        })
    });
    const text = await response.text();

    alert(text);

    eliminarProductosAsociados(id);

    document
        .querySelector(
            `.proveedor[data-id="${id}"]`
        )
        ?.remove();

    dispatchEvent(
        new Event("updateProveedores")
    );
}

// ─── Eliminar productos asociados ───────────────────────────────────────────
function eliminarProductosAsociados(idProveedor) {

    const productos = document.querySelectorAll(
        `.producto[data-proveedor="${idProveedor}"]`
    );

    productos.forEach(producto => {

        const idProducto = producto.dataset.id;
        eliminarProducto(idProducto);
    });
}

// ─── Eliminar producto ──────────────────────────────────────────────────────
async function eliminarProducto(id) {

    const response = await fetch("./php/delete.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            where: `idProducto = ${id}`,
            table: "productos"
        })
    });
    const text = await response.text();

    console.log(text);

    document
        .querySelector(
            `.producto[data-id="${id}"]`
        )
        ?.remove();
}

// ─── Form Agregar Proveedor ─────────────────────────────────────────────────
agregar.innerHTML = `
    <div class="proveedores-form">
        <h2>Agregar Proveedor</h2>

        <div class="campo">
            <p class="label">Nombre</p>
            <input
                type="text"
                class="nombre-nuevo"
                name="nombre"
                placeholder="Nombre del proveedor">
        </div>

        <div class="campo">
            <p class="label">Teléfono</p>
            <input
                type="text"
                class="telefono-nuevo"
                name="telefono"
                placeholder="Teléfono del proveedor">
        </div>

        <div class="campo">
            <p class="label">Correo</p>
            <input
                type="email"
                class="correo-nuevo"
                name="correo"
                placeholder="Correo del proveedor">
        </div>

        <div class="campo">
            <p class="label">Dirección</p>
            <input
                type="text"
                class="direccion-nueva"
                name="direccion"
                placeholder="Dirección del proveedor">
        </div>

        <div class="campo">
            <button class="btn-agregar">
                Agregar
            </button>
        </div>
    </div>
`;

// ─── Enviar nuevo proveedor ─────────────────────────────────────────────────
agregar
    .querySelector(".btn-agregar")
    .addEventListener("click", async () => {

        const nombre = agregar
            .querySelector(".nombre-nuevo")
            .value.trim();

        const telefono = agregar
            .querySelector(".telefono-nuevo")
            .value.trim();

        const correo = agregar
            .querySelector(".correo-nuevo")
            .value.trim();

        const direccion = agregar
            .querySelector(".direccion-nueva")
            .value.trim();

        if (
            !nombre ||
            !telefono ||
            !correo ||
            !direccion
        ) {

            let message =
                "Por favor completa todos los campos.\n";

            if (!nombre)
                message +=
                    "Por favor ingresa el nombre del proveedor.\n";

            if (!telefono)
                message +=
                    "Por favor ingresa el teléfono del proveedor.\n";

            if (!correo)
                message +=
                    "Por favor ingresa el correo del proveedor.\n";

            if (!direccion)
                message +=
                    "Por favor ingresa la dirección del proveedor.\n";

            alert(message);
            return;
        }

        const formData = new FormData();

        formData.append(
            "nombreProveedor",
            nombre
        );

        formData.append(
            "telefono",
            telefono
        );

        formData.append(
            "correo",
            correo
        );

        formData.append(
            "direccion",
            direccion
        );

        formData.append(
            "table",
            "proveedores"
        );

        try {
            const response = await fetch("./php/insert.php", {
                method: "POST",
                body: formData
            });
            const text = await response.text();

            alert(text);

            proveedoresContainer.innerHTML = "";
            load(); // Actualizar sin reload
            limpiarCampos();
            dispatchEvent(
                new Event("updateProveedores")
            );
        } catch (error) {

            console.error(error);
            alert(
                "Error al agregar proveedor"
            );
        }
    });

// ─── Limpiar campos ──────────────────────────────────────────

function limpiarCampos() {
    agregar.querySelector(".nombre-nuevo").value = "";
    agregar.querySelector(".telefono-nuevo").value = "";
    agregar.querySelector(".correo-nuevo").value = "";
    agregar.querySelector(".direccion-nueva").value = "";
}