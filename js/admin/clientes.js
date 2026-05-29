
const section = document.getElementById("clientes");

// ─── Cargar y renderizar Clientes ───────────────────────────────────────────

fetch("./php/get.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        table: "clientes",
        items: "idCliente, nombre, telefono, correo",
        order: "idCliente",
    })
})
    .then(r => r.json())
    .then(data => {
        data.forEach(cliente => {
            const div = document.createElement("div");
            div.className = "cliente";
            div.dataset.id = cliente.idCliente;

            div.innerHTML = `
                <p class="id">#${cliente.idCliente}</p>

                <div class="campo">
                    <p class="label">Nombre</p>
                    <input type="text" name="nombre" class="nombre-Upd" value="${cliente.nombre}">
                </div>

                <div class="campo">
                    <p class="label">Teléfono</p>
                    <input type="text" name="telefono" class="telefono-Upd" value="${cliente.telefono}">
                </div>

                <div class="campo">
                    <p class="label">Correo</p>
                    <input type="email" name="correo" class="correo-Upd" value="${cliente.correo}">
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
    const card = e.target.closest(".cliente");
    if (!card) return;

    const id = card.dataset.id;

    if (e.target.classList.contains("update")) actualizarCliente(id);
    if (e.target.classList.contains("delete")) eliminarCliente(id);
});

// ─── Actualizar cliente ──────────────────────────────────────────────────────

function actualizarCliente(id) {
    const card = document.querySelector(`.cliente[data-id="${id}"]`);

    const formData = new FormData();

    formData.append("idCliente", id);
    formData.append("nombre", card.querySelector(".nombre-Upd").value);
    formData.append("telefono", card.querySelector(".telefono-Upd").value);
    formData.append("correo", card.querySelector(".correo-Upd").value);
    formData.append("table", "clientes");

    fetch("./php/update.php", { method: "POST", body: formData })
        .then(r => r.text())
        .then(response => {
            alert(response);
            dispatchEvent(new Event("updateClientes"));
        });
}

// ─── Eliminar cliente ────────────────────────────────────────────────────────

function eliminarCliente(id) {
    if (!confirm("¿Eliminar cliente?\nTodos los productos asociados también serán eliminados.")) return;

    fetch("./php/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            where: `idCliente = ${id}`,
            table: "clientes"
        })
    })
        .then(r => r.text())
        .then(response => {
            alert(response);

            document
                .querySelector(`.cliente[data-id="${id}"]`)
                ?.remove();
        });
}

// ─── Eliminar producto ─────────────────────────────────────────────────────────

function eliminarProducto(id) {
    fetch("./php/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            where: `idProducto = ${id}`,
            table: "productos"
        })
    })
        .then(r => r.text())
        .then(response => {
            console.log(response);
            document
                .querySelector(`.producto[data-id="${id}"]`)
                ?.remove();
        });
}

// ─── Sección "Agregar Cliente" ───────────────────────────────────────────────

const agregar = document.createElement("section");
agregar.className = "agregar";
agregar.id = "agregar-cliente";
section.appendChild(agregar);

agregar.innerHTML = `
    <div class="clientes-form">
        <h2>Agregar Cliente</h2>

        <div class="campo">
            <p class="label">Nombre</p>
            <input type="text" class="nombre-nuevo" name="nombreCliente" placeholder="Nombre del cliente">
        </div>

        <div class="campo">
            <p class="label">Teléfono</p>
            <input type="text" class="telefono-nuevo" name="telefono" placeholder="Teléfono del cliente">
        </div>

        <div class="campo">
            <p class="label">Correo</p>
            <input type="email" class="correo-nuevo" name="correo" placeholder="Correo del cliente">
        </div>

        <div class="campo">
            <p class="label">Dirección</p>
            <input type="text" class="direccion-nueva" name="direccion" placeholder="Dirección del cliente">
        </div>

        <div class="campo">
            <button class="btn-agregar">Agregar</button>
        </div>
    </div>
`;

// Enviar nuevo cliente
agregar.querySelector(".btn-agregar").addEventListener("click", () => {
    const nombre = agregar.querySelector(".nombre-nuevo").value.trim();
    const telefono = agregar.querySelector(".telefono-nuevo").value.trim();
    const correo = agregar.querySelector(".correo-nuevo").value.trim();

    if (!nombre || !telefono || !correo) {
        let message = "Por favor completa todos los campos. \n";
        if (!nombre) message += "Por favor ingresa el nombre del cliente. \n";
        if (!telefono) message += "Por favor ingresa el teléfono del cliente. \n";
        if (!correo) message += "Por favor ingresa el correo del cliente. \n";
        alert(message);
        return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("telefono", telefono);
    formData.append("correo", correo);
    formData.append("table", "clientes");

    fetch("./php/insert.php", { method: "POST", body: formData })
        .then(r => r.text())
        .then(response => {
            alert(response);
            location.reload();
            dispatchEvent(new Event("updateClientes"));
        })
        .catch(error => {
            console.error(error);
            alert("Error al agregar cliente");
        });
});

