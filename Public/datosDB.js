// ::::: datos mysql :::::
async function obtenerDatos() {
    try {
        // Hacer la petición a la API en Node.js
        const response = await fetch('http://localhost:3000/data');  // Ajusta la URL si usas un dominio
        const data = await response.json();

        // Seleccionar el cuerpo de la tabla donde mostrar los datos
        const dataTable = document.querySelector('#data-table tbody');

        // Crear una fila para cada item de datos
        if (data.length > 0) {
            data.forEach(item => {
                const tr = document.createElement('tr');  // Crear una nueva fila

                // Crear y añadir celdas con los datos de cada columna
                const problemaCell = document.createElement('td');
                problemaCell.textContent = item.descripcion_problema;
                tr.appendChild(problemaCell);

                const aulaCell = document.createElement('td');
                aulaCell.textContent = item.aula;
                tr.appendChild(aulaCell);

                const estatusCell = document.createElement('td');
                estatusCell.textContent = item.estatus;
                tr.appendChild(estatusCell);

                const horaCell = document.createElement('td');
                horaCell.textContent = item.fecha_hora_envio;
                tr.appendChild(horaCell);

                // Añadir la fila completa al cuerpo de la tabla
                dataTable.appendChild(tr);
            });
        } else {
            // Si no hay datos, mostrar un mensaje en una fila de la tabla
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.setAttribute('colspan', '4');
            td.textContent = "No hay datos disponibles";
            tr.appendChild(td);
            dataTable.appendChild(tr);
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Llamar a la función al cargar la página
obtenerDatos();