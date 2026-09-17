const whatsappNumber = "56912345678"; // REEMPLAZA CON TU NÚMERO DE WHATSAPP REAL
let selectedResponse = "";

function openInvitation() {
    // Intentar reproducir música de forma segura sin congelar la app si falla
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().then(() => {
            const musicIcon = document.getElementById('music-icon');
            if (musicIcon) musicIcon.className = "fa-solid fa-pause";
        }).catch(error => {
            console.log("Audio play prevented by browser:", error);
        });
    }

    // Mostrar el botón flotante de música
    const musicBtn = document.getElementById('music-btn');
    if (musicBtn) musicBtn.style.display = 'flex';

    // Transición limpia de pantalla de sobre a la tarjeta principal
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');

    if (envelopeScreen && mainContent) {
        envelopeScreen.style.opacity = '0';
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
            mainContent.classList.add('show');
            launchSnowflakes(); // Lanzar animación de nieve
        }, 500);
    }
}

// Controlar reproducción/pausa de música con el botón flotante
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');

    if (!music) return;

    if (music.paused) {
        music.play().catch(e => console.log(e));
        if (icon) icon.className = "fa-solid fa-pause";
    } else {
        music.pause();
        if (icon) icon.className = "fa-solid fa-music";
    }
}

function launchSnowflakes() {
    for (let i = 0; i < 20; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        const size = Math.random() * 8 + 4;
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.left = Math.random() * 95 + 'vw';
        flake.style.animationDuration = (3 + Math.random() * 4) + 's';
        flake.style.animationDelay = (Math.random() * 3) + 's';
        document.body.appendChild(flake);

        setTimeout(() => { flake.remove(); }, 7000);
    }
}

// Función para volver arriba al hacer clic en el botón del final
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Copiar link de la invitación
function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("¡Enlace copiado al portapapeles! Ya puedes compartirlo.");
}

// Funciones Lightbox de fotos
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
}

// Confirmación de asistencia
function preConfirm(responseType) {
    selectedResponse = responseType;
    const modal = document.getElementById('name-modal');
    const input = document.getElementById('guest-name-input');
    if (input) input.value = "";
    if (modal) modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('name-modal');
    if (modal) modal.classList.remove('active');
}

function sendToWhatsApp() {
    const input = document.getElementById('guest-name-input');
    let guestName = input ? input.value.trim() : "";
    
    if (!guestName) {
        alert("Por favor, escribe tu nombre antes de enviar.");
        return;
    }

    const message = `Hola! Confirmación de invitación Frozen de Erick Andre: *${selectedResponse}*. Nombre: *${guestName}*.`;
    const encodedMessage = encodeURIComponent(message);
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
    closeModal();
}