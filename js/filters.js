export class filters {

    constructor(config, onFilter) {
        // Configuración de filtros:
        // {
        //     items: {
        //         nombre: "text",
        //         precio: "number"
        //     }
        // }
        this.config = config;

        // Callback que recibe el WHERE final
        // Se debe limpiar datos
        this.onFilter = onFilter;

        // Reservado para posibles filtros persistentes
        this.filters = [];
    }

    clone() {

        // Contenedor principal del sistema de filtros
        const tab = document.createElement("div");
        tab.className = "filters-tab";

        // Botón para agregar nuevas filas de filtro
        const addBtn = document.createElement("button");
        addBtn.textContent = "+ Filtro";

        // Aquí se almacenan todas las filas creadas
        const container = document.createElement("div");
        container.className = "filters-container";

        addBtn.onclick = () => {

            // Cada filtro individual vive dentro de una fila
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
                            contiene
                        </option>
                        <option value="=">
                            idéntico
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
                this.apply(container);
            };

            // ─── Eventos reactivos ───────────────────
            // Cualquier modificación en:
            // - campo
            // - operador
            // - valor
            // vuelve a generar el WHERE automáticamente.
            [campo, operador, valor]
                .forEach(el =>
                    el.oninput = () =>
                        this.apply(container)
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
            addBtn,
            container
        );

        return tab;
    }

    apply(container) {

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
        const finalWhere =
            where.join(" AND ");

        // Entrega el resultado al callback externo
        this.onFilter(finalWhere);
    }
}