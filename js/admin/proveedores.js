
const section = document.getElementById("proveedores");

fetch("./php/get.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        table: "proveedores",
        items: "idProveedor, nombreProveedor, telefono, correo, direccion",
        order: "idProveedor",
    })
})
    .then(r => r.json())
    .then(data => {
        console.log(data);
        data.forEach(proveedor => {

            section.innerHTML += `
    <div class="proveedor" data-id="${proveedor.idProveedor}">
        <p class="id">#${proveedor.idProveedor}</p>

        <div class="campo">
            <p class="nombre">Nombre</p>
            <input type="text" class="nombre-Upd" value="${proveedor.nombreProveedor}">
        </div>

        <div class="campo">
            <p class="telefono">Teléfono</p>
            <input type="text" class="telefono-Upd" value="${proveedor.telefono}">
        </div>

        <div class="campo">
            <p class="correo">Correo</p>
            <input type="email" class="correo-Upd" value="${proveedor.correo}">
        </div>

        <div class="campo">
            <p class="direccion">Dirección</p>
            <input type="text" class="direccion-Upd" value="${proveedor.direccion}">
        </div>

        <div class="campo">
            <button class="update">
                Actualizar
            </button>

            <button class="delete">
                Eliminar
            </button>
        </div>
    </div>
    `;
        });
    });