/**
 * Script para manejar el carrito de compras en la página de productos.
 * Incluye agregar productos, actualizar UI, y envío por WhatsApp.
 */

// Claves para localStorage
const PYR_CART_KEY = "pyr_cart";
const PYR_WHATSAPP_NUMBER = "51987965308";

document.addEventListener("DOMContentLoaded", () => {
    // Elementos de la UI del carrito
    const cartCount = document.getElementById("cart-count");
    const cartSummary = document.getElementById("cart-summary");
    const cartButton = document.getElementById("cart-btn");
    const whatsappAnchor = document.getElementById("whatsapp-order");
    const addButtons = Array.from(document.querySelectorAll(".add-to-cart"));

    /**
     * Carga el carrito desde localStorage.
     * @returns {Array} Array de items en el carrito.
     */
    function loadCart() {
        return JSON.parse(localStorage.getItem(PYR_CART_KEY) || "[]");
    }

    /**
     * Guarda el carrito en localStorage y actualiza la UI.
     * @param {Array} cart - Array de items.
     */
    function saveCart(cart) {
        localStorage.setItem(PYR_CART_KEY, JSON.stringify(cart));
        updateUi(cart);
        window.dispatchEvent(new Event("cart:updated"));
    }

    /**
     * Construye el mensaje para WhatsApp con el pedido.
     * @param {Array} cart - Array de items.
     * @returns {string} Mensaje formateado.
     */
    function buildWhatsappMessage(cart) {
        if (!cart.length) {
            return "Hola, quisiera más información sobre sus productos.";
        }

        let total = 0;
        const lines = cart.map((item) => {
            const subtotal = item.price * item.qty;
            total += subtotal;
            return `- ${item.qty} x ${item.name} | S/. ${subtotal.toFixed(2)}`;
        });

        return [
            "Hola, quiero realizar este pedido:",
            "",
            ...lines,
            "",
            `Total referencial: S/. ${total.toFixed(2)}`
        ].join("\n");
    }

    /**
     * Actualiza la interfaz de usuario con el estado del carrito.
     * @param {Array} cart - Array de items.
     */
    function updateUi(cart) {
        const quantity = cart.reduce((sum, item) => sum + item.qty, 0);

        if (cartCount) {
            cartCount.textContent = String(quantity);
        }

        if (cartSummary) {
            if (!cart.length) {
                cartSummary.textContent = "Tu carrito está vacío.";
            } else {
                const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
                cartSummary.textContent = `${quantity} producto(s) agregados | Total referencial: S/. ${total.toFixed(2)}`;
            }
        }

        if (whatsappAnchor) {
            const text = encodeURIComponent(buildWhatsappMessage(cart));
            whatsappAnchor.href = `https://wa.me/${PYR_WHATSAPP_NUMBER}?text=${text}`;
        }
    }

    /**
     * Agrega un producto al carrito desde una tarjeta de producto.
     * @param {HTMLElement} card - Elemento de la tarjeta del producto.
     */
    function addToCart(card) {
        const name = (card.dataset.name || "").trim();
        const price = Number(card.dataset.price || 0);
        if (!name || !price) return;

        const cart = loadCart();
        const existing = cart.find((item) => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        saveCart(cart);
    }

    // Event listeners para botones de agregar al carrito
    addButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".product-card");
            if (!card) return;

            addToCart(card);
            // Feedback visual temporal
            const originalText = button.textContent;
            button.textContent = "Agregado";
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    });

    if (cartButton) {
        cartButton.addEventListener("click", () => {
            if (whatsappAnchor) {
                window.open(whatsappAnchor.href, "_blank", "noopener");
            }
        });
    }

    updateUi(loadCart());
});
