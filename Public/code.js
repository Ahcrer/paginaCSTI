// Función para mostrar la vista previa de la imagen
document.getElementById('imagen').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('imagenPreview');
  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);

    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = 'block'; // Mostrar la imagen
    }
  } else {
    preview.src = '';
    preview.style.display = 'none'; // Ocultar si no se selecciona archivo
  }
});

// Función para hacer zoom en la imagen al hacer clic
const previewImage = document.getElementById('imagenPreview');
const zoomedImage = document.getElementById('zoomedImage');
const overlay = document.getElementById('overlay');

previewImage.addEventListener('click', function() {
  zoomedImage.src = previewImage.src;
  zoomedImage.style.display = 'block';
  overlay.style.display = 'block';
});

overlay.addEventListener('click', function() {
  zoomedImage.style.display = 'none';
  overlay.style.display = 'none';
});

// Parte del registro de solicitudes

// Función para ordenar la tabla por columna
function sortTable(n) {
  const table = document.getElementById("solicitudesTable");
  let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  dir = "asc"; // Dirección de ordenado ascendente

  // Loop hasta que no haya más cambios
  while (switching) {
    switching = false;
    rows = table.rows;

    // Recorre todas las filas (excepto el encabezado)
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      // Obtén los elementos a comparar
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      // Si estamos ordenando por fecha y hora (última columna)
      if (n === 3) {
        const dateX = new Date(x.innerHTML);
        const dateY = new Date(y.innerHTML);
        if (dir === "asc" && dateX > dateY) {
          shouldSwitch = true;
          break;
        } else if (dir === "desc" && dateX < dateY) {
          shouldSwitch = true;
          break;
        }
      }
      // Para otras columnas
      else {
        if (dir === "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        } else if (dir === "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      // Si se encontró que debería intercambiarse, haz el cambio
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      // Si no se hizo ningún cambio y la dirección es ascendente, cámbiala a descendente
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function filterTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("solicitudesTable");
  tr = table.getElementsByTagName("tr");

  // Iterar sobre todas las filas de la tabla, y ocultar las que no coinciden con el filtro
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0]; // Columna 0 (Identificador)
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
