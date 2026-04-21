class ProductFilter {
    constructor() {
        this.categorySelect = document.getElementById("filter-category");
        this.searchInput = document.getElementById("filter-input");
        this.resetBtn = document.getElementById("filter-reset");
        this.products = Array.from(document.querySelectorAll(".product-card"));
        this.productsContainer = document.querySelector(".products-container");
        this.noResultsEl = null;
        this.init();
    }

    init() {
        if (this.categorySelect) {
            this.categorySelect.addEventListener("change", () => this.applyFilters());
        }

        if (this.searchInput) {
            this.searchInput.addEventListener("input", () => this.applyFilters());
        }

        if (this.resetBtn) {
            this.resetBtn.addEventListener("click", () => this.resetFilters());
        }

        this.applyFilters();
    }

    applyFilters() {
        const category = (this.categorySelect?.value || "").trim().toLowerCase();
        const query = (this.searchInput?.value || "").trim().toLowerCase();
        let visibleCount = 0;

        this.products.forEach((product) => {
            const productCategory = (product.dataset.category || "").toLowerCase();
            const title = (product.dataset.name || product.querySelector(".product-title")?.textContent || "").toLowerCase();
            const description = (product.querySelector(".description")?.textContent || "").toLowerCase();

            const matchesCategory = !category || productCategory === category;
            const matchesQuery = !query || title.includes(query) || description.includes(query);
            const shouldShow = matchesCategory && matchesQuery;

            product.style.display = shouldShow ? "" : "none";
            if (shouldShow) visibleCount += 1;
        });

        this.toggleNoResults(visibleCount === 0);
    }

    resetFilters() {
        if (this.categorySelect) this.categorySelect.value = "";
        if (this.searchInput) this.searchInput.value = "";
        this.applyFilters();
    }

    toggleNoResults(show) {
        if (!this.productsContainer) return;

        if (show) {
            if (!this.noResultsEl) {
                this.noResultsEl = document.createElement("div");
                this.noResultsEl.className = "no-results";
                this.noResultsEl.textContent = "No se encontraron productos con ese filtro.";
            }

            if (!this.productsContainer.contains(this.noResultsEl)) {
                this.productsContainer.appendChild(this.noResultsEl);
            }
        } else if (this.noResultsEl && this.productsContainer.contains(this.noResultsEl)) {
            this.productsContainer.removeChild(this.noResultsEl);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => new ProductFilter());
