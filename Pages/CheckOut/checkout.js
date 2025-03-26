document.addEventListener('DOMContentLoaded', function() {
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

    // Form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cartItems.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // Here you would typically process the payment
            alert('Order placed successfully!');
            
            // Clear the cart after successful order
            localStorage.removeItem('cart');
            
            // Redirect to thank you page or home page
            window.location.href = 'thank-you.html';
        });
    }

    // Initial render
    renderCartItems();
});