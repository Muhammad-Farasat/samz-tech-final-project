// Get Elements
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const closeFilter = document.getElementById("closeFilter");
const overlay = document.getElementById("overlay");

//  Function to Show Filter sidebar
function openFilter() {
    filterPanel.style.transform = "translateX(300px)"; // show panel in aside tag
    overlay.style.display = "block"; // Blur the background
}

// Function to Hide Filter Panel
function closeFilterPanel() {
    filterPanel.style.transform = "translateX(-300px)"; // Panel will Hide 
    overlay.style.display = "none"; // close button will finish blur Background 
}

// Event Listeners got filter
filterBtn.addEventListener("click", openFilter);
closeFilter.addEventListener("click", closeFilterPanel);
overlay.addEventListener("click", closeFilterPanel);
