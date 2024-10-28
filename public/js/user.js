// public/js/user.js
document.addEventListener('DOMContentLoaded', async () => {
    const orderList = document.getElementById('order-list');

    try {
        const token = localStorage.getItem('token'); // Token de autenticación
        const response = await fetch('/api/orders', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const orders = await response.json();

        orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('order');
            orderDiv.innerHTML = `
                <h2>Pedido #${order._id}</h2>
                <p>Total: $${order.totalAmount}</p>
                <p>Estado: ${order.status}</p>
            `;
            orderList.appendChild(orderDiv);
        });
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
    }
});
