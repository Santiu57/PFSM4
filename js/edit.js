
function edit() {
    const distribiudora = document.getElementById("distribuidora").value;
    const juego = document.getElementById("juego").value;
    const precio = document.getElementById("precio").value;

    fetch("php/insert.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            distribuidora: distribiudora,
            juego: juego,
            precio: precio
        })
    })
}