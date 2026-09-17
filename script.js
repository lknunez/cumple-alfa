const whatsappNumber = "56949916547"; // REEMPLAZA CON TU NÚMERO DE WHATSAPP

function openInvitation() {
    const music = document.getElementById('bg-music');
    music.play().catch(error => console.log("Audio play blocked by browser:", error));

    const envelopeScreen = document.getElementById('envelope-screen');
    const mainCard = document.getElementById('main-card');

    envelopeScreen.style.opacity = '0';
    setTimeout(() => {
        envelopeScreen.style.display = 'none';
        mainCard.classList.add('show');
        launchSnowflakes(); // Lanzar animación invernal
    }, 500);
}

function launchSnowflakes() {
    // Genera copos de nieve / destellos de hielo
    for (let i = 0; i < 25; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        
        // Tamaños variados para simular nieve mágica
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

function confirmAttendance(responseType) {
    let guestName = prompt("Por favor, ingresa tu nombre y apellido para confirmar:");
    if (!guestName || guestName.trim() === "") {
        guestName = "Invitado anónimo";
    }

    const message = `Hola! Respuesta de invitación Frozen: *${responseType}*. Mi nombre es: *${guestName}*.`;
    const encodedMessage = encodeURIComponent(message);
    
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
    window.location.href = url;
}