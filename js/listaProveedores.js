export class ListaProveedores {

    constructor() {
        this.list = document.createElement("select");
        this.list.className = "lista-proveedores";
    }

    async load() {

        const r = await fetch("./php/get.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                table: "proveedores",
                items: "idProveedor, nombreProveedor"
            })
        });

        const data = await r.json();

        this.list.innerHTML = "";

        data.forEach(p => {

            this.list.add(
                new Option(
                    p.nombreProveedor,
                    p.idProveedor
                )
            );

        });
    }

    clone() {
        return this.list.cloneNode(true);
    }
}