document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MENÚ MÓVIL ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // --- 2. LÓGICA DEL CARRUSEL (Solo si existe en la página) ---
    const track = document.getElementById('track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    
    if (track && btnPrev && btnNext) {
        let currentIndex = 0;

        function updateCarousel() {
            const cardWidth = document.querySelector('.carousel-card').offsetWidth;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        btnNext.addEventListener('click', () => {
            const cards = document.querySelectorAll('.carousel-card');
            const cardWidth = cards[0].offsetWidth;
            const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
            const cardsPerView = Math.round(containerWidth / cardWidth);
            const maxIndex = cards.length - cardsPerView;

            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        btnPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        window.addEventListener('resize', () => {
            const cards = document.querySelectorAll('.carousel-card');
            if(cards.length > 0){
                const cardWidth = cards[0].offsetWidth;
                const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
                const cardsPerView = Math.round(containerWidth / cardWidth);
                const maxIndex = Math.max(0, cards.length - cardsPerView);
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                updateCarousel();
            }
        });
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