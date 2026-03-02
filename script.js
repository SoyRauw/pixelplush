document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MENÚ MÓVIL ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

// --- LÓGICA DEL CARRUSEL 3D INFINITO (Basado en App.js) ---
const track = document.getElementById('track');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const cards = document.querySelectorAll('.carousel-card');

if (track && btnPrev && btnNext && cards.length > 0) {
    let carouselIndex = 0;
    const total = cards.length;

    // Función que calcula la posición 3D de cada tarjeta
    const updateCarouselTransforms = () => {
        cards.forEach((card, idx) => {
            // Calculamos la distancia de cada tarjeta respecto a la actual
            let offset = idx - carouselIndex;
            
            // Lógica para que sea INFINITO (circular)
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const absOffset = Math.abs(offset);

            // Valores de transformación 3D
            const translateX = offset * 180; // Separación horizontal (px)
            const translateZ = -absOffset * 150; // Qué tan atrás se van (px)
            const rotateY = offset * -10; // Ángulo de giro (grados)
            const scale = Math.max(0.6, 1 - absOffset * 0.1); // Las del fondo son más pequeñas
            const opacity = Math.max(0.3, 1 - absOffset * 0.3); // Las del fondo son más transparentes

            // Aplicamos la transformación matemática
            card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            card.style.opacity = opacity.toString();
            
            // Calculamos el z-index (la del medio debe estar arriba)
            card.style.zIndex = String(100 - absOffset * 10);
            
            // Ponemos/quitamos la clase activa para el brillo
            if (offset === 0) {
                card.classList.add('active-card');
                card.style.pointerEvents = 'auto'; // Solo puedes clickear la del centro
            } else {
                card.classList.remove('active-card');
                card.style.pointerEvents = 'none'; // Desactiva clicks en tarjetas traseras
            }
        });
    };

    // Función para mover el carrusel
    const moveCarousel = (direction) => {
        // Sumamos la dirección y mantenemos el índice dentro del total (Loop)
        carouselIndex = (carouselIndex + direction + total) % total;
        updateCarouselTransforms();
    };

    // Listeners de los botones
    btnNext.addEventListener('click', () => moveCarousel(1));
    btnPrev.addEventListener('click', () => moveCarousel(-1));

    // Inicializamos al cargar
    updateCarouselTransforms();
}

    // --- 3. FORMULARIO CONTACTO ---
    const form = document.getElementById('subscribeForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert(`¡Genial! Hemos recibido tu correo: ${document.getElementById('emailInput').value}`);
            this.reset();
        });
    }
});