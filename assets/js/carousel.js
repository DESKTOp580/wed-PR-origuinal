/**
 * Script para controlar el carrusel de servicios en la página principal.
 * Maneja navegación con botones prev/next y dots indicadores.
 * Se ejecuta cuando el DOM está listo.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Logs de depuración (remover en producción)
    console.log("Carousel script loaded");
    const carousel = document.querySelector(".carousel");
    if (!carousel) {
        console.error("Carousel element not found");
        return;
    }
    console.log("Carousel found");

    // Seleccionar elementos del carrusel
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    console.log("Slides found:", slides.length);
    console.log("Prev btn:", prevBtn);
    console.log("Next btn:", nextBtn);
    console.log("Dots container:", dotsContainer);

    let currentIndex = 0;

    /**
     * Actualiza la posición del carrusel moviendo el track.
     */
    function updateCarousel() {
        console.log("Updating carousel to index:", currentIndex);
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar dots activos
        Array.from(dotsContainer.children).forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    /**
     * Navega a un slide específico.
     * @param {number} index - Índice del slide a mostrar.
     */
    function goToSlide(index) {
        console.log("Going to slide:", index);
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
    }

    // Crear dots para cada slide
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir al servicio ${index + 1}`);
        dot.addEventListener("click", () => {
            console.log("Dot clicked:", index);
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    // Event listeners para botones prev/next
    if (prevBtn) prevBtn.addEventListener("click", () => {
        console.log("Prev button clicked");
        goToSlide(currentIndex - 1);
    });
    if (nextBtn) nextBtn.addEventListener("click", () => {
        console.log("Next button clicked");
        goToSlide(currentIndex + 1);
    });

    console.log("Carousel initialized");
    updateCarousel();
});
