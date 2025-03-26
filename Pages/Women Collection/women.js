document.addEventListener('DOMContentLoaded', function() {
    // Handle wishlist button clicks
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle wishlist state
            this.classList.toggle('active');
            
            // Change the heart icon appearance
            if (this.classList.contains('active')) {
                this.innerHTML = '♥'; // Filled heart
                this.style.color = '#FF0000';
            } else {
                this.innerHTML = '♡'; // Empty heart
                this.style.color = '#999';
            }
        });
    });
});
