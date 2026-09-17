const whatsappNumber = "56912345678";

function openInvitation() {
    const music = document.getElementById('bg-music');
    music.play().catch(error => console.log("Audio play blocked by browser:", error));

    const envelopeScreen = document.getElementById('envelope-screen');
    const mainCard = document.getElementById('main-card');

    envelopeScreen.style.opacity = '0';
    setTimeout(() => {
        envelopeScreen.style.display = 'none';
        mainCard.classList.add('show');
        launchBalloons();
    }, 500);
}

function launchBalloons() {
    const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#9b59b6', '#ff6b81'];
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 90 + 'vw';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (4 + Math.random() * 3) + 's';
        balloon.style.animationDelay = (Math.random() * 2) + 's';
        document.body.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, 7000);
    }
}

function confirmAttendance(responseType) {
    let guestName = prompt("Ingresa tu nombre y apellido para confirmar tu asistencia:");
    if (!guestName || guestName.trim() === "") {
        guestName = "Invitado anónimo";
    }

    const message = `*Hola! ${responseType}, Mi nombre es: ${guestName}*.`;
    const encodedMessage = encodeURIComponent(message);
    
    const url = `https://api.whatsapp.com/send?phone=${+56949916547}&text=${encodedMessage}`;
    window.location.href = url;
}