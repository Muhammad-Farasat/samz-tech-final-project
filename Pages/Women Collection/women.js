document.addEventListener('DOMContentLoaded', function() {
    // Handle wishlist button clicks
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            this.classList.toggle('active');
            

            if (this.classList.contains('active')) {
                this.innerHTML = '♥'; 
                this.style.color = '#FF0000';
            } else {
                this.innerHTML = '♡'; 
                this.style.color = '#999';
            }
            
        });
    });
})
