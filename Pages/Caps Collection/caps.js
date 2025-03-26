document.addEventListener('DOMContentLoaded', function() {
   
    function getElement(selector, isRequired = true) {
        const el = document.querySelector(selector);
        if (!el && isRequired) {
            console.error(`Element not found: ${selector}`);
        }
        return el;
    }

    // Get Elements with null checks
    const elements = {
        filterBtn: getElement('#filterBtn'),
        filterPanel: getElement('#filterPanel'),
        closeFilter: getElement('#closeFilter'),
        overlay: getElement('#overlay'),
        priceMin: getElement('#priceMin'),
        priceMax: getElement('#priceMax'),
        minPriceValue: getElement('#minPriceValue'),
        maxPriceValue: getElement('#maxPriceValue'),
        applyFilterBtn: getElement('.apply'),
        clearFilterBtn: getElement('.clear'),
        body: document.body
    };

    // Verify essential elements exist
    if (!elements.filterBtn || !elements.filterPanel) {
        console.error('Critical filter elements missing');
        return;
    }

    // Function to Show Filter sidebar
    function openFilter() {
        try {
            elements.filterPanel.style.transform = "translateX(300px)";
            elements.overlay.style.display = "block";
            elements.body.style.overflow = "hidden";
            elements.body.style.position = "fixed";
        } catch (error) {
            console.error('Error opening filter:', error);
        }
    }

    // Function to Hide Filter Panel
    function closeFilterPanel() {
        try {
            elements.filterPanel.style.transform = "translateX(-300px)";
            elements.overlay.style.display = "none";
            elements.body.style.overflow = "";
            elements.body.style.position = "";
        } catch (error) {
            console.error('Error closing filter:', error);
        }
    }

    // Update price display values
    function updatePriceValues() {
        if (elements.minPriceValue && elements.maxPriceValue) {
            elements.minPriceValue.textContent = elements.priceMin?.value || 0;
            elements.maxPriceValue.textContent = elements.priceMax?.value || 12000;
        }
    }

    // Extract price from product card safely
    function getProductPrice(product) {
        try {
            const priceElement = product.querySelector('#caps-price');
            if (!priceElement) {
                console.warn('Price element not found in product');
                return 0;
            }
            return parseInt(priceElement.textContent.replace(/\D/g, '')) || 0;
        } catch (error) {
            console.error('Error getting product price:', error);
            return 0;
        }
    }

    // Apply price filter with error handling
    function applyPriceFilter() {
        try {
            if (!elements.priceMin || !elements.priceMax) return;
            
            const minPrice = parseInt(elements.priceMin.value) || 0;
            const maxPrice = parseInt(elements.priceMax.value) || 12000;
            
            const products = document.querySelectorAll('#caps-card');
            
            products.forEach(product => {
                try {
                    const productPrice = getProductPrice(product);
                    product.style.display = (productPrice >= minPrice && productPrice <= maxPrice) 
                        ? 'block' 
                        : 'none';
                } catch (error) {
                    console.error('Error filtering product:', error);
                    product.style.display = 'block'; // Show by default if error
                }
            });
            
            closeFilterPanel();
        } catch (error) {
            console.error('Error applying price filter:', error);
        }
    }

    // Clear price filter
    function clearPriceFilter() {
        try {
            if (elements.priceMin && elements.priceMax) {
                elements.priceMin.value = 0;
                elements.priceMax.value = 12000;
                updatePriceValues();
            }
            
            document.querySelectorAll('#men-card').forEach(product => {
                product.style.display = 'block';
            });
        } catch (error) {
            console.error('Error clearing filters:', error);
        }
    }

    // Initialize price range sliders
    function initPriceSliders() {
        if (elements.priceMin && elements.priceMax) {
            elements.priceMin.addEventListener("input", function() {
                if (parseInt(elements.priceMin.value) > parseInt(elements.priceMax.value)) {
                    elements.priceMax.value = elements.priceMin.value;
                }
                updatePriceValues();
            });

            elements.priceMax.addEventListener("input", function() {
                if (parseInt(elements.priceMax.value) < parseInt(elements.priceMin.value)) {
                    elements.priceMin.value = elements.priceMax.value;
                }
                updatePriceValues();
            });
        }
    }

    // Initialize event listeners
    function initEventListeners() {
        // Filter panel controls
        elements.filterBtn?.addEventListener("click", openFilter);
        elements.closeFilter?.addEventListener("click", closeFilterPanel);
        elements.overlay?.addEventListener("click", closeFilterPanel);
        
        // Price filter buttons
        elements.applyFilterBtn?.addEventListener("click", function(e) {
            e.preventDefault();
            applyPriceFilter();
        });
        
        elements.clearFilterBtn?.addEventListener("click", function(e) {
            e.preventDefault();
            clearPriceFilter();
        });

        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape") {
                closeFilterPanel();
            }
        });
    }

   

    // Initialize wishlist hearts
    function initWishlist() {
        document.querySelectorAll('.fa-regular').forEach(heart => {
            heart.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                
                try {
                    if (this.classList.contains('active')) {
                        this.classList.replace('fa-regular', 'fa-solid');
                    } else {
                        this.classList.replace('fa-solid', 'fa-regular');
                    }
                } catch (error) {
                    console.error('Error toggling wishlist:', error);
                }
            });
        });
    }

    // Initialize all components
    function init() {
        updatePriceValues();
        initPriceSliders();
        initEventListeners()
        initWishlist();
        console.log('Filter system initialized');
    }

    // Start the application
    init();
});