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
    const modalCategory = document.querySelector('.modal-category');
    const modalDescription = document.querySelector('.modal-description');
    const modalGallery = document.querySelector('.modal-gallery');
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';
    
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
            
            // Setup filter functionality
            setupFilters(projects);
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
     * @param {String} filter - Category filter to apply
     */
    function displayProjects(projects, filter = 'all') {
        // Clear the container
        portfolioContainer.innerHTML = '';
        
        // Filter projects if needed
        const filteredProjects = filterProjects(projects, filter);
        
        if (filteredProjects.length === 0) {
            // Display empty state
            portfolioContainer.innerHTML = `
                <div class="empty-state">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7H20M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7M4 7L8 3H16L20 7" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 11V15M12 15L14 13M12 15L10 13" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3>Nenhum projeto encontrado</h3>
                    <p>Tente selecionar outra categoria.</p>
                </div>
            `;
            return;
        }
        
        // Create project cards and add to container
        filteredProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            portfolioContainer.appendChild(projectCard);
        });
        
        // Add click event to all project cards
        document.querySelectorAll('.portfolio-item').forEach((card, index) => {
            card.addEventListener('click', function() {
                openProjectModal(filteredProjects[index]);
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
                ${project.featured ? '<span class="featured-tag">Destaque</span>' : ''}
            </div>
            <div class="portfolio-info">
                <span class="portfolio-category">${project.category}</span>
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
        modalCategory.textContent = project.category;
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
    
    /**
     * Filter projects based on category
     * @param {Array} projects - Array of project objects
     * @param {String} filter - Category filter to apply
     * @return {Array} Filtered projects array
     */
    function filterProjects(projects, filter) {
        if (filter === 'all') {
            return projects;
        } else if (filter === 'featured') {
            return projects.filter(project => project.featured);
        } else {
            return projects.filter(project => project.category === filter);
        }
    }
    
    /**
     * Setup filter buttons functionality
     * @param {Array} projects - Array of project objects
     */
    function setupFilters(projects) {
        // Get unique categories from projects
        const categories = [...new Set(projects.map(project => project.category))];
        
        // Create category filter buttons dynamically if they don't exist
        const filterContainer = document.querySelector('.portfolio-filters');
        if (filterContainer && filterButtons.length <= 2) { // Only 'All' and 'Featured' exist
            categories.forEach(category => {
                const button = document.createElement('button');
                button.className = 'filter-btn';
                button.setAttribute('data-filter', category);
                button.textContent = category;
                filterContainer.appendChild(button);
            });
        }
        
        // Add click event to all filter buttons (including dynamically added ones)
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter
                activeFilter = this.getAttribute('data-filter');
                
                // Update active button class
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Display filtered projects
                displayProjects(projects, activeFilter);
            });
        });
    }
});