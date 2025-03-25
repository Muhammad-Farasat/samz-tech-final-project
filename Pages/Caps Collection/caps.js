document.addEventListener('DOMContentLoaded', function() {
    // Get Elements
    const filterBtn = document.getElementById("filterBtn");
    const filterPanel = document.getElementById("filterPanel");
    const closeFilter = document.getElementById("closeFilter");
    const overlay = document.getElementById("overlay");
    const body = document.body;

    // Function to Show Filter sidebar
    function openFilter() {
        filterPanel.style.transform = "translateX(300px)";
        overlay.style.display = "block";
        body.style.overflow = "hidden"; 
        body.style.position = "fixed"; 
    }

    // Function to Hide Filter Panel
    function closeFilterPanel() {
        filterPanel.style.transform = "translateX(-300px)"; 
        overlay.style.display = "none";
        body.style.overflow = ""; 
        body.style.position = "";
    }

    // Event Listeners for filter
    filterBtn.addEventListener("click", openFilter);
    closeFilter.addEventListener("click", closeFilterPanel);
    overlay.addEventListener("click", closeFilterPanel);

    // Close filter panel
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            closeFilterPanel();
        }
    });
});
document.querySelectorAll('.fa-regular').forEach(heart => {
    heart.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('active');
        
        //wishlist heart hover on click
        if (this.classList.contains('active')) {
            this.classList.replace('fa-regular', 'fa-solid');
        } else {
            this.classList.replace('fa-solid', 'fa-regular');
        }
    });
});