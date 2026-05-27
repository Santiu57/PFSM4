import {
    ListaProveedores
} from "../listaProveedores.js";

const section = document.getElementById("productos");

const lista = new ListaProveedores();
await lista.load();
const select =
    lista.clone();

fetch("./php/get.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        table: "productos",
        items: "idProducto, nombre, descripcion, precio, imagen, productos.idProveedor, nombreProveedor",
        join: "proveedores",
        on: "productos.idProveedor = proveedores.idProveedor",
        order: "nombre",
        desc: false
    })
})
    .then(r => r.json())
    .then(data => {

        data.forEach(producto => {

            section.innerHTML += `
    <div class="producto" data-id="${producto.idProducto}">
        <p class="id">#${producto.idProducto}</p>

        <div class="imagen-container">
            <img class="imagen-Upd"
            src="${producto.imagen}"
            alt="${producto.nombre}">
        </div>

        <div class="campo">
            <p class="nombre">Nombre</p>
            <input type="text" class="nombre-Upd" value="${producto.nombre}">
        </div>

        <div class="campo">
            <p class="descripcion">Descripción</p>
            <input type="text" class="descripcion-Upd" value="${producto.descripcion}">
        </div>

        <div class="campo">
            <p class="precio">Precio</p>
            <input type="number" class="precio-Upd" value="${producto.precio}">
        </div>

        <div class="campo">
            <p class="proveedor">Proveedor</p>
            <div class="proveedor-container"></div>
        </div>

        <div class="campo">
            <button class="update"
                onclick="actualizarProducto(${producto.idProducto})">
                Actualizar
            </button>

            <button class="delete"
                onclick="eliminarProducto(${producto.idProducto})">
                Eliminar
            </button>
        </div>
    </div>
    `;

            // CLONAR un select nuevo
            const select =
                lista.clone();

            // seleccionar proveedor actual
            select.value =
                producto.idProveedor;

            document
                .querySelector(
                    `.producto[data-id="${producto.idProducto}"] .proveedor-container`
                )
                .appendChild(select);
        });
    });

section.addEventListener("click", e => {

    const card =
        e.target.closest(".producto");

    if (!card) return;

    const id =
        card.dataset.id;

    if (
        e.target.classList.contains(
            "update"
        )
    ) {
        actualizarProducto(id);
    }

    if (
        e.target.classList.contains(
            "delete"
        )
    ) {
        eliminarProducto(id);
    }
});

function actualizarProducto(id) {

    const card =
        document.querySelector(
            `.producto[data-id="${id}"]`
        );

    const producto = {
        id: id,
        nombre: card.querySelector(".nombre-Upd").value,
        descripcion: card.querySelector(".descripcion-Upd").value,
        precio: card.querySelector(".precio-Upd").value,
        proveedor: card.querySelector(".lista-proveedores").value,
        table: "productos"
    };

    fetch("./php/update.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    })
        .then(r => r.text())
        .then(response => {
            alert(response);
        });
}

function eliminarProducto(id) {

    if (!confirm("¿Eliminar producto?")) return;

    fetch("./php/delete.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(r => r.text())
        .then(response => {

            alert(response);

            document
                .querySelector(
                    `.producto[data-id="${id}"]`
                )
                .remove();
        });
}