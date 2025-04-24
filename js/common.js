/**
 * Common JavaScript functions for all pages
 */

// Add smooth scrolling to navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// For responsive design considerations
window.addEventListener('resize', function() {
    // Could add responsive adjustments here if needed
    const windowWidth = window.innerWidth;
    
    // Example of a responsive adjustment
    if (windowWidth <= 768) {
        // Mobile adjustments
    } else {
        // Desktop adjustments
    }
});

// Function to handle mobile menu toggle (to be implemented)
function toggleMobileMenu() {
    // This function will be implemented when adding a mobile menu
}