/**
 * CMF Construction - Portfolio Script
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
    const modalGallery = document.querySelector('.modal-gallery');
    
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
                <div class="portfolio-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C16 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 8 17 12 21Z" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    ${project.location}
                </div>
                <div class="portfolio-year">${project.year}</div>
                <p class="portfolio-description">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
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
     * Open project modal with details
     * @param {Object} project - Project data object
     */
    function openProjectModal(project) {
        // Set modal content
        modalTitle.textContent = project.title;
        modalYear.textContent = project.year;
        modalLocation.textContent = project.location;
        modalDescription.textContent = project.description;
        
        // Clear gallery and add project images
        modalGallery.innerHTML = '';
        project.images.forEach(image => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'gallery-item';
            imgContainer.innerHTML = `<img src="${image}" alt="${project.title}">`;
            modalGallery.appendChild(imgContainer);
        });
        
        // Show the modal
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
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