// ─── Imports y constantes globales ──────────────────────────────────────────
import { ListaProveedores } from "../listaProveedores.js";
import { filters } from "../filters.js"

const section = document.getElementById("productos");

// Agregar productos

const agregar = document.createElement("section");
agregar.className = "agregar";
section.appendChild(agregar);

// Filters Tab
const filterdata = {
    table: "productos",
    items: {
        idProducto: "number",
        nombre: "text",
        descripcion: "text",
        precio: "number",
        imagen: "text",
        "productos.idProveedor": "idProveedor",
        nombreProveedor: "text"
    },
}

const filterTab = new filters(
    filterdata,
    where => {
        productosContainer.innerHTML = "";
        load(false, "idProducto", where);
    }
);

section.appendChild(
    filterTab.clone()
);

// Productos

const productosContainer = document.createElement("div");
productosContainer.id = "productos-container";

section.appendChild(productosContainer);

// ─── Inicializaciones ────────────────────────────────────────────────────────

const lista = new ListaProveedores();
await lista.load();

await load();

// ─── Cargar y renderizar productos ───────────────────────────────────────────
async function load(desc = false, order = "idProducto", where = "") {

    fetch("./php/get.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            table: "productos",
            items: "idProducto, nombre, descripcion, precio, imagen, productos.idProveedor, nombreProveedor",
            join: "proveedores",
            on: "productos.idProveedor = proveedores.idProveedor",
            order: order,
            where: where,
            desc: desc
        })
    })
        //Recojedor de errores
        .then(async r => {
            const text = await r.text();

            try {
                return JSON.parse(text);
            } catch {
                console.error("Respuesta no JSON:", text);
            }
        })
        .then(data => {
            console.log(data);
            data.forEach(producto => {

                const div = document.createElement("div");
                div.className = "producto";
                div.dataset.id = producto.idProducto;
                div.dataset.proveedor = producto.idProveedor;

                div.innerHTML = `
                <p class="id">#${producto.idProducto}</p>

                <div class="imagen-container">
                    <input type="file" class="imagen-input" accept="image/*">
                    <img class="imagen-preview" name="imagen" src="${producto.imagen}" alt="${producto.nombre}">
                </div>

                <div class="campo">
                    <p class="label">Nombre</p>
                    <input type="text" class="nombre-Upd" name="nombre" value="${producto.nombre}">
                </div>

                <div class="campo">
                    <p class="label">Descripción</p>
                    <input type="text" class="descripcion-Upd" name="descripcion" value="${producto.descripcion}">
                </div>

                <div class="campo">
                    <p class="label">Precio</p>
                    <input type="number" class="precio-Upd" name="precio" value="${producto.precio}">
                </div>

                <div class="campo">
                    <p class="label">Proveedor</p>
                    <div class="proveedor-container"></div>
                </div>

                <div class="campo">
                    <button class="update">Actualizar</button>
                    <button class="delete">Eliminar</button>
                </div>
            `;

                productosContainer.appendChild(div);

                // Clonar la lista de proveedores para este producto y preseleccionar
                const select = lista.clone();
                select.value = producto.idProveedor;
                div.querySelector(".proveedor-container").appendChild(select);
            });
        });
}

// ─── Delegación de clicks (update / delete) ──────────────────────────────────

section.addEventListener("click", e => {
    const card = e.target.closest(".producto");
    if (!card) return;

    const id = card.dataset.id;

    if (e.target.classList.contains("update")) actualizarProducto(id);
    if (e.target.classList.contains("delete")) eliminarProducto(id);
});

// ─── Preview de imagen en tarjetas existentes ────────────────────────────────

section.addEventListener("change", e => {
    if (!e.target.classList.contains("imagen-input")) return;

    const card = e.target.closest(".producto");
    const file = e.target.files[0];
    if (!file) return;

    card.querySelector(".imagen-preview").src = URL.createObjectURL(file);
});

// ─── Actualizar producto ──────────────────────────────────────────────────────

function actualizarProducto(id) {
    const card = document.querySelector(`.producto[data-id="${id}"]`);

    const imagen = card.querySelector(".imagen-input").files[0];
    const formData = new FormData();

    formData.append("id", id);
    formData.append("nombre", card.querySelector(".nombre-Upd").value);
    formData.append("descripcion", card.querySelector(".descripcion-Upd").value);
    formData.append("precio", card.querySelector(".precio-Upd").value);
    formData.append("proveedor", card.querySelector(".lista-proveedores").value);
    formData.append("table", "productos");

    if (imagen) formData.append("imagen", imagen);

    fetch("./php/update.php", { method: "POST", body: formData })
        .then(r => r.text())
        .then(response => alert(response));
}

// ─── Eliminar producto ────────────────────────────────────────────────────────

function eliminarProducto(id) {
    if (!confirm("¿Eliminar producto?")) return;

    fetch("./php/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            where: `idProducto = ${id}`,
            table: "productos"
        })
    })
        .then(r => r.text())
        .then(response => {
            alert(response);
            document.querySelector(`.producto[data-id="${id}"]`).remove();
        });
}

// ─── Sección "Agregar Producto" ───────────────────────────────────────────────

agregar.innerHTML = `
    <div class="productos-form">
        <h2>Agregar Producto</h2>

        <div class="imagen-container">
            <input type="file" class="imagen-input-agregar" accept="image/*">
            <img class="imagen-preview-agregar" name="imagen" style="display:block;">
        </div>

        <div class="campo">
            <p class="label">Nombre</p>
            <input type="text" class="nombre-nuevo" name="nombre" placeholder="Nombre del producto">
        </div>

        <div class="campo">
            <p class="label">Descripción</p>
            <input type="text" class="descripcion-nueva" name="descripcion" placeholder="Descripción del producto">
        </div>

        <div class="campo">
            <p class="label">Precio</p>
            <input type="number" class="precio-nuevo" name="precio" placeholder="Precio del producto">
        </div>

        <div class="campo">
            <p class="label">Proveedor</p>
            <div class="proveedor-container-nuevo"></div>
        </div>

        <div class="campo">
            <button class="btn-agregar">Agregar</button>
        </div>
    </div>
`;

// Clonar lista de proveedores para el form de agregar
const selectNuevo = lista.clone();
agregar.querySelector(".proveedor-container-nuevo").appendChild(selectNuevo);

// Preview de imagen en el form de agregar
agregar.querySelector(".imagen-input-agregar").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const img = agregar.querySelector(".imagen-preview-agregar");
    img.src = URL.createObjectURL(file);
    img.style.display = "block";
});

// Enviar nuevo producto
agregar.querySelector(".btn-agregar").addEventListener("click", () => {
    const nombre = agregar.querySelector(".nombre-nuevo").value.trim();
    const descripcion = agregar.querySelector(".descripcion-nueva").value.trim();
    const precio = agregar.querySelector(".precio-nuevo").value;
    const proveedor = agregar.querySelector(".lista-proveedores").value;
    const imagen = agregar.querySelector(".imagen-input-agregar").files[0];

    if (!nombre || !descripcion || !precio || !imagen || !proveedor) {
        let message = "Por favor completa todos los campos. \n";
        if (!nombre) message += "Por favor ingresa el nombre del producto. \n";
        if (!descripcion) message += "Por favor ingresa la descripción del producto. \n";
        if (!precio) message += "Por favor ingresa el precio del producto. \n";
        if (!imagen) message += "Por favor selecciona una imagen para el producto. \n";
        if (!proveedor) message += "Por favor selecciona un proveedor para el producto. \n";
        alert(message);
        return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("proveedor", proveedor);
    formData.append("imagen", imagen);
    formData.append("table", "productos");

    fetch("./php/insert.php", { method: "POST", body: formData })
        .then(r => r.text())
        .then(response => {
            alert(response);
            location.reload();
        })
        .catch(error => {
            console.error(error);
            alert("Error al agregar producto");
        });
});
