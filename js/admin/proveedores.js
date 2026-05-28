
const section = document.getElementById("proveedores");

// ─── Cargar y renderizar Proveedores ───────────────────────────────────────────

fetch("./php/get.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        table: "proveedores",
        items: "idProveedor, nombreProveedor, telefono, correo, direccion",
        order: "idProveedor",
    })
})
    .then(r => r.json())
    .then(data => {
        data.forEach(proveedor => {
            const div = document.createElement("div");
            div.className = "proveedor";
            div.dataset.id = proveedor.idProveedor;

            div.innerHTML = `
                <p class="id">#${proveedor.idProveedor}</p>

                <div class="campo">
                    <p class="label">Nombre</p>
                    <input type="text" class="nombre-Upd" value="${proveedor.nombreProveedor}">
                </div>

                <div class="campo">
                    <p class="label">Teléfono</p>
                    <input type="text" class="telefono-Upd" value="${proveedor.telefono}">
                </div>

                <div class="campo">
                    <p class="label">Correo</p>
                    <input type="email" class="correo-Upd" value="${proveedor.correo}">
                </div>

                <div class="campo">
                    <p class="label">Dirección</p>
                    <input type="text" class="direccion-Upd" value="${proveedor.direccion}">
                </div>

                <div class="campo">
                    <button class="update">Actualizar</button>
                    <button class="delete">Eliminar</button>
                </div>
            `;

            section.appendChild(div);
        });
    });

// ─── Delegación de clicks (update / delete) ──────────────────────────────────

section.addEventListener("click", e => {
    const card = e.target.closest(".proveedor");
    if (!card) return;

    const id = card.dataset.id;

    if (e.target.classList.contains("update")) actualizarProveedor(id);
    if (e.target.classList.contains("delete")) eliminarProveedor(id);
});

// ─── Preview de imagen en tarjetas existentes ────────────────────────────────

section.addEventListener("change", e => {
    if (!e.target.classList.contains("imagen-input")) return;

    const card = e.target.closest(".proveedor");
    const file = e.target.files[0];
    if (!file) return;

    card.querySelector(".imagen-preview").src = URL.createObjectURL(file);
});

// ─── Actualizar proveedor ──────────────────────────────────────────────────────

function actualizarProveedor(id) {
    const card = document.querySelector(`.proveedor[data-id="${id}"]`);

    const formData = new FormData();

    formData.append("idProveedor", id);
    formData.append("nombreProveedor", card.querySelector(".nombre-Upd").value);
    formData.append("telefono", card.querySelector(".telefono-Upd").value);
    formData.append("correo", card.querySelector(".correo-Upd").value);
    formData.append("direccion", card.querySelector(".direccion-Upd").value);
    formData.append("table", "proveedores");

    fetch("./php/update.php", { method: "POST", body: formData })
        .then(r => r.text())
        .then(response => alert(response));
}

// ─── Eliminar proveedor ────────────────────────────────────────────────────────

function eliminarProveedor(id) {
    if (!confirm("¿Eliminar proveedor?")) return;

    fetch("./php/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            where: `idProveedor = ${id}`,
            table: "proveedores"
        })
    })
        .then(r => r.text())
        .then(response => {
            alert(response);
            document.querySelector(`.proveedor[data-id="${id}"]`).remove();
        });
}

// ─── Sección "Agregar Proveedor" ───────────────────────────────────────────────

const agregar = document.createElement("section");
agregar.className = "agregar";
agregar.id = "agregar-proveedor";
section.appendChild(agregar);

agregar.innerHTML = `
    <div class="proveedores-form">
        <h2>Agregar Proveedor</h2>

        <div class="campo">
            <p class="label">Nombre</p>
            <input type="text" class="nombre-nuevo" placeholder="Nombre del proveedor">
        </div>

        <div class="campo">
            <p class="label">Teléfono</p>
            <input type="text" class="telefono-nuevo" placeholder="Teléfono del proveedor">
        </div>

        <div class="campo">
            <p class="label">Correo</p>
            <input type="email" class="correo-nuevo" placeholder="Correo del proveedor">
        </div>

        <div class="campo">
            <p class="label">Dirección</p>
            <input type="text" class="direccion-nueva" placeholder="Dirección del proveedor">
        </div>

        <div class="campo">
            <button class="btn-agregar">Agregar</button>
        </div>
    </div>
`;

// Enviar nuevo proveedor
agregar.querySelector(".btn-agregar").addEventListener("click", () => {
    const nombre = agregar.querySelector(".nombre-nuevo").value.trim();
    const telefono = agregar.querySelector(".telefono-nuevo").value.trim();
    const correo = agregar.querySelector(".correo-nuevo").value.trim();
    const direccion = agregar.querySelector(".direccion-nueva").value.trim();

    if (!nombre || !telefono || !correo || !direccion) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("telefono", telefono);
    formData.append("correo", correo);
    formData.append("direccion", direccion);
    formData.append("table", "proveedores");

    fetch("./php/insert.php", { method: "POST", body: formData })
        .then(r => r.text())
        .then(response => {
            alert(response);
            location.reload();
        })
        .catch(error => {
            console.error(error);
            alert("Error al agregar proveedor");
        });
});