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
        on: "productos.idProveedor = proveedores.idProveedor"
    })
})
    .then(r => r.json())
    .then(data => {

        data.forEach(producto => {

            section.innerHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
                <p>${producto.nombreProveedor}</p>
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
        `;
        });

    });