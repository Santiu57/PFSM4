export class ListaProveedores {

    constructor() {
        this.options = "";
        this.clones = [];

        window.addEventListener(
            "updateProveedores",
            () => this.update()
        );
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

        this.options = `
            <option value="">
                Selecciona un proveedor
            </option>
        `;

        data.forEach(p => {
            this.options += `
                <option value="${p.idProveedor}">
                    ${p.nombreProveedor}
                </option>
            `;
        });

        // actualizar todos los clones
        this.clones.forEach(select => {
            const value = select.value;
            select.innerHTML = this.options;
            select.value = value;
        });
    }

    async update() {
        await this.load();
    }

    clone() {

        const select =
            document.createElement("select");

        select.className =
            "lista-proveedores";

        select.name =
            "idProveedor";

        select.innerHTML =
            this.options;

        this.clones.push(select);

        return select;
    }
}