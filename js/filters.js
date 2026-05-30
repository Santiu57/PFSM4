export class filters {

    constructor(config, onFilter) {
        // Configuración de filtros:
        // {
        //     table: "tabla" -- Solo para el nombre en el header
        //     items: {
        //         nombre: "text",
        //         precio: "number"
        //     }
        // }
        this.config = config;

        // funcion que carga los items con el where final
        // El contenedor debe ser limpiado antes
        this.onFilter = onFilter;

        // Reservado para posibles filtros persistentes
        this.filters = [];
    }

    clone() {

        // Contenedor principal
        const tab = document.createElement("div");
        tab.className = "filters-tab";

        // Label titular
        const label = document.createElement("h2");
        label.innerHTML = `Filtros para ${this.config.table}`

        // ─── Order By ───────────────────────────────
        const orderRow = document.createElement("div");
        orderRow.className = "order-row";

        // Select campo 
        const orderCampo = document.createElement("select");
        orderCampo.name = "orden";

        Object.keys(this.config.items)
            .forEach(key => {
                orderCampo.innerHTML += `
            <option value="${key}">
                ${key}
            </option>
        `;
            });

        // Botón ASC / DESC
        const orderBtn = document.createElement("button");
        orderBtn.textContent = "▼";

        let desc = false;

        orderBtn.onclick = () => {
            desc = !desc;
            orderBtn.textContent =
                desc ? "▲" : "▼";

            this.apply(container, orderCampo.value, desc);
        };

        // Cambiar campo ORDER
        orderCampo.onchange = () =>
            this.apply(
                container,
                orderCampo.value,
                desc
            );

        orderRow.append(
            orderCampo,
            orderBtn
        );

        // Botón para agregar nuevas filas de filtro
        const addBtn = document.createElement("button");
        addBtn.textContent = "+ Filtro";

        // Contenedor de las filas de filtros
        const container = document.createElement("div");
        container.className = "filters-container";

        // Crear una fila nueva
        addBtn.onclick = () => {

            // Contenedor de la fila
            const row = document.createElement("div");
            row.className = "filter-row";

            // ─── Campo ───────────────────────────────
            // Select que permite elegir la propiedad a filtrar
            const campo = document.createElement("select");

            Object.keys(this.config.items)
                .forEach(key => {

                    campo.innerHTML += `
                        <option value="${key}">
                            ${key}
                        </option>
                    `;
                });

            // ─── Operador ────────────────────────────
            // Cambia dinámicamente según el tipo de dato
            const operador = document.createElement("select");

            // ─── Valor ───────────────────────────────
            // Input donde se escribe el criterio
            const valor = document.createElement("input");

            const updateOperator = () => {

                // Obtiene el tipo del campo seleccionado
                // desde la configuración original.
                const type =
                    this.config.items[campo.value];

                // Reinicia opciones anteriores para evitar
                // acumulación de operadores incompatibles.
                operador.innerHTML = "";

                if (type === "number") {

                    // Si es número:
                    // - input numérico
                    // - operadores matemáticos
                    valor.type = "number";

                    operador.innerHTML = `
                        <option value="<"><</option>
                        <option value="=">=</option>
                        <option value=">">></option>
                    `;
                }
                else if (type === "text") {

                    // Si es texto:
                    // - input texto
                    // - LIKE o igualdad exacta
                    valor.type = "text";

                    operador.innerHTML = `
                        <option value="LIKE">
                            Contiene
                        </option>
                        <option value="=">
                            Identico a
                        </option>
                    `;
                }
            };

            // Cuando cambia el campo seleccionado,
            // se recalculan automáticamente operadores y tipo input.
            campo.onchange = updateOperator;

            // Ejecutar inmediatamente para inicializar
            // el primer estado correcto del filtro.
            updateOperator();

            // ─── Botón eliminar ──────────────────────
            const remove = document.createElement("button");
            remove.textContent = "X";

            remove.onclick = () => {

                // Elimina visualmente la fila
                row.remove();

                // Recalcula el WHERE restante
                this.apply(
                    container,
                    orderCampo.value,
                    desc
                );
            };

            // ─── Eventos reactivos ───────────────────
            // Cualquier modificación en:
            // - campo
            // - operador
            // - valor
            // vuelve a generar el WHERE automáticamente.
            [campo, operador, valor].forEach(
                change => change.oninput =
                    () => this.apply(
                        container,
                        orderCampo.value,
                        desc
                    )
            );

            // Construcción de la fila
            row.append(
                campo,
                operador,
                valor,
                remove
            );

            // Agregar al contenedor general
            container.appendChild(row);
        };

        // Estructura final del componente
        tab.append(
            label,
            orderRow,
            addBtn,
            container
        );

        return tab;
    }

    apply(
        container,
        order = Object.keys(this.config.items)[0],
        desc = false
    ) {

        // Obtiene todas las filas activas del DOM
        const rows =
            container.querySelectorAll(".filter-row");

        // Aquí se irán acumulando las condiciones SQL
        const where = [];

        rows.forEach(row => {

            // children[0] = campo
            // children[1] = operador
            // children[2] = valor
            const campo =
                row.children[0].value;

            const op =
                row.children[1].value;

            const value =
                row.children[2].value;

            // Ignora filtros vacíos para evitar
            // condiciones inválidas como:
            // nombre LIKE '%%'
            if (!value) return;

            const type =
                this.config.items[campo];

            if (type === "number") {

                // Para números se genera SQL directo:
                // precio > 50
                where.push(
                    `${campo} ${op} ${value}`
                );
            }
            else {

                if (op === "LIKE") {

                    // LIKE permite coincidencia parcial:
                    // nombre LIKE '%mesa%'
                    where.push(
                        `${campo} LIKE '%${value}%'`
                    );
                }
                else {

                    // Coincidencia exacta:
                    // nombre = 'Mesa'
                    where.push(
                        `${campo} = '${value}'`
                    );
                }
            }
        });

        // Une todas las condiciones usando AND:
        // precio > 10 AND nombre LIKE '%mesa%'
        const finalWhere = where.join(" AND ");

        // Entrega el resultado al callback externo
        this.onFilter(
            finalWhere,
            order,
            desc
        );
    }
}