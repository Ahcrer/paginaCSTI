// Obtener el modal
var modal = document.getElementById("cancel-modal");

// Obtener el botón específico que abre el modal
var specificCancelButton = document.getElementById("specific-cancel-button");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón específico, abre el modal
specificCancelButton.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario haga clic en <span> (x), cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario haga clic fuera del contenido del modal, cierra el modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Manejar los botones de "Sí" y "No"
document.getElementById("confirm-cancel").onclick = function() {
    // Aquí puedes agregar el código para manejar la confirmación de cancelación
    alert("Solicitud cancelada.");
    modal.style.display = "none";
}

document.getElementById("cancel-close").onclick = function() {
    modal.style.display = "none";
}