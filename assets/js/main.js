/**
 * Script principal para la página index.html.
 * Maneja el formulario de contacto (envío por WhatsApp) y el botón del carrito.
 */

// Número de WhatsApp para contacto
const WHATSAPP_NUMBER = "51987965308";

document.addEventListener("DOMContentLoaded", () => {
    // Elementos del formulario de contacto
    const contactForm = document.getElementById("contactForm");
    const mensajeEstado = document.getElementById("mensaje-estado");
    // Botón del carrito
    const cartButton = document.getElementById("cart-button");

    // Manejo del formulario de contacto
    if (contactForm && mensajeEstado) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const nombre = (formData.get("nombre") || "").toString().trim();
            const correo = (formData.get("email") || "").toString().trim();
            const asunto = (formData.get("asunto") || "").toString().trim();
            const mensaje = (formData.get("mensaje") || "").toString().trim();

            // Construir mensaje para WhatsApp
            const texto = [
                "Hola, quiero solicitar información.",
                "",
                `Nombre: ${nombre}`,
                `Correo: ${correo}`,
                `Asunto: ${asunto || "Consulta general"}`,
                "",
                "Mensaje:",
                mensaje
            ].join("\n");

            // Mostrar mensaje y redirigir
            mensajeEstado.textContent = "Redirigiendo a WhatsApp...";
            mensajeEstado.style.color = "#008f7b";

            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
            contactForm.reset();
        });
    }

    // Manejo del botón del carrito: redirige a productos
    if (cartButton) {
        cartButton.addEventListener("click", () => {
            window.location.href = "productos/productos.html";
        });
    }
});
