class ProductSearch {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchForm = document.getElementById('search-form');
        this.productsContainer = document.querySelector('.products-container');
        this.allProducts = Array.from(document.querySelectorAll('.product-card'));
        
        this.init();
    }

    init() {
        // Evento en tiempo real mientras escribes
        this.searchInput.addEventListener('input', (e) => this.filterProducts(e.target.value));
        
        // Prevenir envío del formulario
        this.searchForm.addEventListener('submit', (e) => e.preventDefault());
    }

    filterProducts(searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        if (!term) {
            // Si está vacío, mostrar todos
            this.showAllProducts();
            return;
        }

        const filteredProducts = this.allProducts.filter(product => {
            const name = product.dataset.name.toLowerCase();
            const category = product.dataset.category.toLowerCase();
            const tags = product.dataset.tags.toLowerCase();
            const description = product.querySelector('.description').textContent.toLowerCase();

            // Buscar en nombre, categoría, tags y descripción
            return (
                name.includes(term) ||
                category.includes(term) ||
                tags.includes(term) ||
                description.includes(term)
            );
        });

        this.displayProducts(filteredProducts, term);
    }

    displayProducts(products, searchTerm) {
        if (products.length === 0) {
            this.showNoResults(searchTerm);
            return;
        }

        // Ocultar todos los productos
        this.allProducts.forEach(product => {
            product.style.display = 'none';
            product.classList.remove('highlight');
        });

        // Mostrar solo los encontrados
        products.forEach(product => {
            product.style.display = 'block';
            product.classList.add('highlight');
        });

        // Mostrar contador
        this.showSearchResults(products.length, searchTerm);
    }

    showAllProducts() {
        this.allProducts.forEach(product => {
            product.style.display = 'block';
            product.classList.remove('highlight');
        });
        
        // Remover mensaje de búsqueda
        const message = document.querySelector('.search-message');
        if (message) message.remove();
    }

    showNoResults(searchTerm) {
        // Ocultar todos
        this.allProducts.forEach(product => product.style.display = 'none');

        // Remover mensaje anterior
        const oldMessage = document.querySelector('.search-message');
        if (oldMessage) oldMessage.remove();

        // Crear mensaje
        const message = document.createElement('div');
        message.className = 'search-message no-results';
        message.innerHTML = `
            <p>❌ No se encontraron productos para "<strong>${searchTerm}</strong>"</p>
            <p style="font-size: 0.9rem; color: #999;">Intenta con otras palabras clave</p>
        `;
        
        this.productsContainer.parentElement.insertBefore(
            message, 
            this.productsContainer
        );
    }

    showSearchResults(count, searchTerm) {
        // Remover mensaje anterior
        const oldMessage = document.querySelector('.search-message');
        if (oldMessage) oldMessage.remove();

        // Crear mensaje de resultados
        const message = document.createElement('div');
        message.className = 'search-message results';
        message.innerHTML = `
            <p>✅ Se encontraron <strong>${count}</strong> producto(s) para "<strong>${searchTerm}</strong>"</p>
        `;
        
        this.productsContainer.parentElement.insertBefore(
            message, 
            this.productsContainer
        );
    }
}

// Inicializar búsqueda cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProductSearch();
});