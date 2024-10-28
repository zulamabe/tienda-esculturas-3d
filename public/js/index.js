// public/js/index.js
document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');

    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" />
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <button data-id="${product._id}">Añadir al carrito</button>
            `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
});
