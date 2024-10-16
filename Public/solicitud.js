document.getElementById('solicitudForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const formData = new FormData(this); // Asegura que estás capturando todos los datos correctamente

    fetch('/validar', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json()) // Asegúrate de que el servidor devuelve JSON
        .then(data => {
            mostrarPopup(data.message); // Muestra el mensaje en un pop-up
        })
        .catch(error => {
            mostrarPopup('Error al enviar la solicitud');
            console.error('Error:', error);
        });
});


function mostrarPopup(mensaje) {
    document.getElementById('popup-message').textContent = mensaje;
    document.getElementById('popup').style.display = 'block';
}

function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}
