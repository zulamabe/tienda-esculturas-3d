// public/js/admin.js
document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('admin-product-list');
    const addProductForm = document.getElementById('add-product-form');

    // Cargar productos
    const loadProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const products = await response.json();
            productList.innerHTML = ''; // Limpiar lista antes de cargar productos

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('admin-product');
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>Stock: ${product.stock}</p>
                    <p>Precio: $${product.price}</p>
                    <button data-id="${product._id}" class="delete-btn">Eliminar</button>
                `;
                productList.appendChild(productDiv);
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    // Añadir producto
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addProductForm);

        try {
            await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    price: formData.get('price'),
                    stock: formData.get('stock'),
                    description: formData.get('description'),
                    category: formData.get('category')
                })
            });
            addProductForm.reset();
            loadProducts();
        } catch (error) {
            console.error('Error al añadir producto:', error);
        }
    });

    // Eliminar producto
    productList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const productId = e.target.getAttribute('data-id');
            try {
                await fetch(`/api/products/${productId}`, { method: 'DELETE' });
                loadProducts();
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        }
    });

    loadProducts();
});
