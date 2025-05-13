/**
 * CMF Construction - Portfolio Script with Carousel
 * This script loads portfolio projects from a JSON file
 * and displays them dynamically on the portfolio page.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio container element
    const portfolioContainer = document.getElementById('portfolio-grid');
    
    // Portfolio modal elements
    const portfolioModal = document.getElementById('portfolio-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('.modal-title');
    const modalYear = document.querySelector('.modal-year');
    const modalLocation = document.querySelector('.modal-location');
    const modalDescription = document.querySelector('.modal-description');
    
    // Carousel elements
    const carouselContainer = document.getElementById('carousel-container');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselIndicators = document.getElementById('carousel-indicators');
    
    // Carousel state
    let currentSlide = 0;
    let slideCount = 0;
    
    // Load portfolio data from JSON file
    fetch('portfolio.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(projects => {
            // Initialize the portfolio with all projects
            displayProjects(projects);
        })
        .catch(error => {
            console.error('Error loading portfolio data:', error);
            portfolioContainer.innerHTML = `
                <div class="error-message">
                    <h3>Não foi possível carregar os projetos</h3>
                    <p>Por favor, tente novamente mais tarde.</p>
                </div>
            `;
        });
    
    /**
     * Display projects in the portfolio grid
     * @param {Array} projects - Array of project objects
     */
    function displayProjects(projects) {
        // Clear the container
        portfolioContainer.innerHTML = '';
        
        if (projects.length === 0) {
            // Display empty state
            portfolioContainer.innerHTML = `
                <div class="empty-state">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7H20M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7M4 7L8 3H16L20 7" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 11V15M12 15L14 13M12 15L10 13" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3>Nenhum projeto encontrado</h3>
                    <p>Por favor, adicione projetos ao arquivo portfolio.json.</p>
                </div>
            `;
            return;
        }
        
        // Create project cards and add to container
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            portfolioContainer.appendChild(projectCard);
        });
        
        // Add click event to all project cards
        document.querySelectorAll('.portfolio-item').forEach((card, index) => {
            card.addEventListener('click', function() {
                openProjectModal(projects[index]);
            });
        });

        // Add click event to all "Ver detalhes" buttons
        document.querySelectorAll('.portfolio-link').forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent triggering the card click
                openProjectModal(projects[index]);
            });
        });
    }
    
    /**
     * Create HTML for a project card
     * @param {Object} project - Project data object
     * @return {HTMLElement} Project card element
     */
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'portfolio-item';
        card.setAttribute('data-id', project.id);
        
        card.innerHTML = `
            <div class="portfolio-image" style="background-image: url('${project.images[0]}');">
            </div>
            <div class="portfolio-info">
                <h3 class="portfolio-title">${project.title}</h3>
                <div class="portfolio-year">${project.year}</div>
                <a href="#" class="portfolio-link">
                    Ver detalhes
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f7941d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Open project modal with details and carousel
     * @param {Object} project - Project data object
     */
    function openProjectModal(project) {
        // Set modal content
        modalTitle.textContent = project.title;
        modalYear.textContent = project.year;
        modalLocation.textContent = project.location;
        modalDescription.textContent = project.description;
        
        // Setup carousel
        setupCarousel(project.images, project.title);
        
        // Show the modal
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    /**
     * Setup image carousel for the project
     * @param {Array} images - Array of image URLs
     * @param {String} title - Project title for image alt text
     */
    function setupCarousel(images, title) {
        // Clear carousel
        carouselContainer.innerHTML = '';
        carouselIndicators.innerHTML = '';
        
        // Reset carousel state
        currentSlide = 0;
        slideCount = images.length;
        
        // Create slides
        images.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url('${image}')`;
            carouselContainer.appendChild(slide);
            
            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-slide', index);
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            carouselIndicators.appendChild(indicator);
        });
        
        // Setup navigation buttons
        carouselPrev.onclick = prevSlide;
        carouselNext.onclick = nextSlide;
    }
    
    /**
     * Go to a specific slide in the carousel
     * @param {Number} slideIndex - Index of the slide to show
     */
    function goToSlide(slideIndex) {
        // Hide current slide
        document.querySelector('.carousel-slide.active').classList.remove('active');
        document.querySelector('.carousel-indicator.active').classList.remove('active');
        
        // Show new slide
        document.querySelectorAll('.carousel-slide')[slideIndex].classList.add('active');
        document.querySelectorAll('.carousel-indicator')[slideIndex].classList.add('active');
        
        // Update current slide index
        currentSlide = slideIndex;
    }
    
    /**
     * Go to the next slide in the carousel
     */
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slideCount;
        goToSlide(newIndex);
    }
    
    /**
     * Go to the previous slide in the carousel
     */
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(newIndex);
    }
    
    /**
     * Close the project modal
     */
    function closeProjectModal() {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Setup modal close button
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    
    // Close modal when clicking outside content
    if (portfolioModal) {
        portfolioModal.addEventListener('click', function(e) {
            if (e.target === portfolioModal) {
                closeProjectModal();
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});