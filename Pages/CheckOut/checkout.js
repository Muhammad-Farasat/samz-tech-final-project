
document.addEventListener('DOMContentLoaded', function () {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const productsContainer = document.querySelector('.products-container');
    const subtotalAmount = document.querySelector('.subtotal-amount');

    // Function to render cart items
    function renderCartItems() {
        productsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            productsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
            subtotalAmount.textContent = 'Rs. 0';
            return;
        }

        let subtotal = 0;

        cartItems.forEach((item, index) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            productDiv.innerHTML = `
                <div class="image-placeholder">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}" class="product-image">` : '<i class="fas fa-image"></i>'}
                </div>
                <div class="product-details">
                    <p>${item.name || 'Product'}</p>
                    <p>Rs. ${item.price || '0'}</p>
                    <div class="actions">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity || 1}</span>
                        <button class="quantity-btn plus">+</button>
                        <i class="far fa-heart like-btn"></i>
                        <i class="fas fa-trash remove-btn"></i>
                    </div>
                </div>
            `;

            productsContainer.appendChild(productDiv);

            // Calculate subtotal
            subtotal += (item.price || 0) * (item.quantity || 1);

            // Add event listeners for this product
            const minusBtn = productDiv.querySelector('.minus');
            const plusBtn = productDiv.querySelector('.plus');
            const quantityElement = productDiv.querySelector('.quantity');
            const likeBtn = productDiv.querySelector('.like-btn');
            const removeBtn = productDiv.querySelector('.remove-btn');

            minusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityElement.textContent);
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                    cartItems[index].quantity = quantity;
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    updateSubtotal();
                }
            });

            plusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityElement.textContent);
                quantity++;
                quantityElement.textContent = quantity;
                cartItems[index].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateSubtotal();
            });

            likeBtn.addEventListener('click', () => {
                likeBtn.classList.toggle('far');
                likeBtn.classList.toggle('fas');
                likeBtn.classList.toggle('active');
            });

            removeBtn.addEventListener('click', () => {
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                renderCartItems();
            });
        });

        subtotalAmount.textContent = `Rs. ${subtotal}`;
    }

    // Function to update subtotal
    function updateSubtotal() {
        let subtotal = 0;
        document.querySelectorAll('.product').forEach((product, index) => {
            const priceText = product.querySelector('.product-details p:nth-child(2)').textContent;
            const price = parseFloat(priceText.replace('Rs. ', ''));
            const quantity = parseInt(product.querySelector('.quantity').textContent);
            subtotal += price * quantity;
        });
        subtotalAmount.textContent = `Rs. ${subtotal}`;
    }

    // 1. Create a hidden iframe to trigger WhatsApp
    function autoSendWhatsApp(phone, message) {
        // For mobile devices
        if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
          window.location.href = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
          return;
        }
      
        // For desktop - use direct link with fallback
        const whatsappUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
        
        // Try to open in a popup window first
        const popup = window.open(whatsappUrl, '_blank', 'width=800,height=600');
        
        // Fallback if popup is blocked
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          window.location.href = whatsappUrl;
        }
      }

    const checkoutForm = document.getElementById('order-btn')

    // 3. Usage with order data
    checkoutForm.addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value
        const phone = document.getElementById('phone').value
        const address = document.getElementById('address').value

        const orderText = `Order from ${name}\n Phone: ${phone} \n Address: ${address} \n \n${cartItems.map(i => `${i.quantity}x ${i.name}`).join('\n')}`;

        autoSendWhatsApp('923152557056', orderText); // Your number

        localStorage.removeItem('cart')

        window.location.href = '/'

    });




    // Initial render
    renderCartItems();
});