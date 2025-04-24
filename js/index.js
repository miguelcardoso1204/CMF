/**
 * JavaScript specific to the index page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Featured project button hover effect
    const featuredProjectBtn = document.querySelector('.btn-see-more');
    if (featuredProjectBtn) {
        featuredProjectBtn.addEventListener('mouseover', function() {
            this.style.opacity = '0.9';
        });
        featuredProjectBtn.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });
    }
    
    // You could add animations for the reputation cards
    const reputationCards = document.querySelectorAll('.reputation-card');
    reputationCards.forEach((card, index) => {
        // Add a slight delay for each card for a staggered effect
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Additional index-specific functionality can be added here
});

// Initialize any index-specific features
function initIndexPage() {
    // This function could be used to initialize page-specific features
    console.log('Index page initialized');
}

// Call the initialization function
initIndexPage();