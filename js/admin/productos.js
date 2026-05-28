import {
    ListaProveedores
} from "../listaProveedores.js";

const section = document.getElementById("productos");

const lista = new ListaProveedores();
await lista.load();

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
        order: "idProducto",
    })
})
    .then(r => r.json())
    .then(data => {
        console.log(data);
        data.forEach(producto => {

            section.innerHTML += `
    <div class="producto" data-id="${producto.idProducto}">
        <p class="id">#${producto.idProducto}</p>

        <div class="imagen-container">
            <input type="file" class="imagen-input" accept="image/*">

            <img class="imagen-preview" src="${producto.imagen}" alt="${producto.nombre}">
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
            <button class="update">
                Actualizar
            </button>

            <button class="delete">
                Eliminar
            </button>
        </div>
    </div>
    `;
            // Clonar la lista de proveedores para cada producto
            const select = lista.clone();

            // Establecer el proveedor seleccionado según el producto
            select.value = producto.idProveedor;

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

    if (e.target.classList.contains("update")) {
        actualizarProducto(id);
    }

    if (e.target.classList.contains("delete")) {
        eliminarProducto(id);
    }
});

// preview imagen
section.addEventListener("change", e => {

    if (!e.target.classList.contains("imagen-input"))
        return;

    const card =
        e.target.closest(".producto");

    const file =
        e.target.files[0];

    if (!file) return;

    const img =
        card.querySelector(".imagen-preview");

    img.src =
        URL.createObjectURL(file);
});

function actualizarProducto(id) {

    const card =
        document.querySelector(
            `.producto[data-id="${id}"]`
        );

    const imagen =
        card.querySelector(
            ".imagen-input"
        ).files[0];

    const formData =
        new FormData();

    formData.append(
        "id",
        id
    );

    formData.append(
        "nombre",
        card.querySelector(".nombre-Upd").value
    );

    formData.append(
        "descripcion",
        card.querySelector(".descripcion-Upd").value
    );

    formData.append(
        "precio",
        card.querySelector(".precio-Upd").value
    );

    formData.append(
        "proveedor",
        card.querySelector(".lista-proveedores").value
    );

    formData.append(
        "table",
        "productos"
    );

    // solo enviar si cambiaron imagen
    if (imagen) {
        formData.append(
            "imagen",
            imagen
        );
    }

    fetch("./php/update.php", {
        method: "POST",
        body: formData
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
            id: id,
            where: `idProducto = ${id}`,
            table: "productos"
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

//Agregar Producto
const main = document.getElementById("content");
const title = document.createElement("h2");
const div = document.createElement("div");

section.className = "agregar";

title.innerHTML = "Agregar Producto";
title.className = "title";

section.appendChild(title);
section.appendChild(div);

div.className = "productos-form";

div.innerHTML = `
    <input type="text" id="producto-nombre" placeholder="Nombre">
    <input type="text" id="producto-descripcion" placeholder="Descripcion">
    <input type="number" id="producto-precio" placeholder="Precio">
    <div class="proveedor-container"></div>
    <input type="file" id="producto-imagen" accept="image/*">
    <button id="agregar-producto">
        Agregar
    </button>
`;

const select = lista.clone();
select.value = -1;

document
    .querySelector(
        `.productos-form .proveedor-container`
    )
    .appendChild(select);

// Fetch agregar producto
document
    .getElementById("agregar-producto")
    .addEventListener("click", () => {

        const nombre =
            document.getElementById("producto-nombre").value;

        const descripcion =
            document.getElementById("producto-descripcion").value;

        const precio =
            document.getElementById("producto-precio").value;

        const proveedor =
            document.querySelector(
                ".productos-form .lista-proveedores"
            ).value;

        const imagen =
            document.getElementById("producto-imagen").files[0];

        const formData = new FormData();

        formData.append(
            "nombre",
            nombre
        );

        formData.append(
            "descripcion",
            descripcion
        );

        formData.append(
            "precio",
            precio
        );

        formData.append(
            "proveedor",
            proveedor
        );

        formData.append(
            "imagen",
            imagen
        );

        formData.append(
            "table",
            "productos"
        );

        fetch("./php/insert.php", {
            method: "POST",
            body: formData
        })
            .then(r => r.text())
            .then(response => {

                alert(response);

                // limpiar inputs
                document.getElementById("producto-nombre").value = "";
                document.getElementById("producto-descripcion").value = "";
                document.getElementById("producto-precio").value = "";
                document.getElementById("producto-imagen").value = "";
                select.value = -1;

                // recargar lista
                location.reload();
            })
            .catch(error => {
                console.error(error);
                alert("Error al agregar producto");
            });
    });