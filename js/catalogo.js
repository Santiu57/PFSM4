const section = document.getElementById("catalogo");

fetch("./php/get.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
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

        data.forEach(producto => {

            section.innerHTML += `
            <div class="producto">
                <h3 class="nombre">${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <p class="proveedor">${producto.nombreProveedor}</p>
                <img src="${producto.imagen}" alt="${producto.nombre}" class="catalogo-imagen">
            </div>
        `;
        });

    });