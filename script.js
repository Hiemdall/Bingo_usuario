let estadoAnteriorCeldas = {}; // Almacena el estado anterior de las celdas


function mostrarVentanaEmergente(imagenSrc) {
    const ventana = document.getElementById('ventana-emergente');
    const imagen = document.getElementById('imagen-ventana-emergente');

    if (ventana && imagen) {
        imagen.src = imagenSrc; // Establece el atributo src de la imagen
        ventana.classList.add('activo'); // Usa classList para coherencia

        // Configura un temporizador para ocultar la ventana emergente después de 10 segundos
        setTimeout(() => {
            ventana.classList.remove('activo'); // Asegúrate de que esta clase controle la visibilidad
        }, 5000); // 000 milisegundos equivalen a 10 segundos
    } else {
        console.error('No se encontró el elemento de la ventana emergente o de la imagen');
    }
}

function cambiarEstado(celdaId) {
    const celda = document.getElementById(celdaId);
    
    celda.classList.toggle('activo'); // Cambia la imagen de blanco y negro a color y viceversa


    // Obtén la URL de la imagen de fondo de la celda
    const style = window.getComputedStyle(celda);
    const imageSrc = style.backgroundImage.slice(4, -1).replace(/"/g, "");

    // Mostrar ventana emergente con animación
    mostrarVentanaEmergente(imageSrc);

    // Enviar solicitud para guardar el estado en la base de datos
    fetch('guardarEstado.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        //body: `celdaId=${celdaId}`
        body: `celdaId=${celdaId.substring(5)}`
    })


    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function cargarEstadoInicial() {
    // Aquí puedes agregar código para cargar el estado inicial del juego si es necesario
}

function cargarEstadoJuego() {
    fetch('obtenerEstado.php')
        .then(response => response.json())
        .then(estadoCeldas => {
            estadoCeldas.forEach(celda => {
                const elementoCelda = document.getElementById(`celda${celda.id}`);
                if (elementoCelda) {
                    // Comprueba si el estado ha cambiado y la celda está activa
                    if (estadoAnteriorCeldas[`celda${celda.id}`] !== celda.estado && celda.estado === '1') {
                        elementoCelda.classList.add('activo');
                        mostrarVentanaEmergenteConAnimacion(celda.id);
                        // Actualiza el estado anterior
                        estadoAnteriorCeldas[`celda${celda.id}`] = celda.estado;
                    } else if (celda.estado === '0') {
                        elementoCelda.classList.remove('activo');
                        // Actualiza el estado anterior
                        estadoAnteriorCeldas[`celda${celda.id}`] = celda.estado;
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para mostrar la ventana emergente con la imagen de la celda correspondiente
function mostrarVentanaEmergenteConAnimacion(celdaId) {
    const celda = document.getElementById(`celda${celdaId}`);
    if (!celda) return;

    const style = window.getComputedStyle(celda);
    const imageSrc = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    mostrarVentanaEmergente(imageSrc);
}

document.addEventListener('DOMContentLoaded', () => {
    cargarEstadoInicial();
    cargarEstadoJuego();


    setInterval(cargarEstadoJuego, 3000); // Actualiza el tablero cada 3 segundos sin recargar la página
   
});
