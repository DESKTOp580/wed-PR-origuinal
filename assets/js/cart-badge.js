document.addEventListener("DOMContentLoaded", () => {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    function updateCount() {
        const cart = JSON.parse(localStorage.getItem("pyr_cart") || "[]");
        const quantity = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
        countEl.textContent = String(quantity);
    }

    updateCount();
    window.addEventListener("cart:updated", updateCount);
    window.addEventListener("storage", updateCount);
});
