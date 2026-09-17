const whatsappNumber = "56912345678"; // REEMPLAZA CON TU NÚMERO DE WHATSAPP
let selectedResponse = "";

function openInvitation() {
    const music = document.getElementById('bg-music');
    music.play().catch(error => console.log("Audio play blocked by browser:", error));

    const envelopeScreen = document.getElementById('envelope-screen');
    const mainCard = document.getElementById('main-card');

    envelopeScreen.style.opacity = '0';
    setTimeout(() => {
        envelopeScreen.style.display = 'none';
        mainCard.classList.add('show');
        launchSnowflakes();
    }, 500);
}

function launchSnowflakes() {
    for (let i = 0; i < 25; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        const size = Math.random() * 8 + 4;
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.left = Math.random() * 95 + 'vw';
        flake.style.animationDuration = (3 + Math.random() * 4) + 's';
        flake.style.animationDelay = (Math.random() * 3) + 's';
        document.body.appendChild(flake);

        setTimeout(() => {
            flake.remove();
        }, 7000);
    }
}

// Abre la ventanita bonita en lugar del prompt feo del navegador
function preConfirm(responseType) {
    selectedResponse = responseType;
    const modal = document.getElementById('name-modal');
    document.getElementById('guest-name-input').value = ""; // Limpiar input
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('name-modal');
    modal.classList.remove('active');
}

function sendToWhatsApp() {
    let guestName = document.getElementById('guest-name-input').value.trim();
    if (!guestName) {
        alert("Por favor, escribe tu nombre antes de enviar.");
        return;
    }

    const message = `Hola! Respuesta de invitación Frozen: *${selectedResponse}*. Mi nombre es: *${guestName}*.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Usar wa.me para abrir WhatsApp de forma limpia (funciona perfecto en PC y celular)
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abrir en otra pestaña para no perder la tarjeta de invitación de vista
    window.open(url, '_blank');
    
    // Cerrar el modal
    closeModal();
}