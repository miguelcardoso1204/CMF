// Portfolio data
const portfolioProjects = [
    {
        id: 1,
        title: "Edifício Infinity",
        description: "Um edifício residencial de luxo com 20 apartamentos, integrando tecnologias sustentáveis e design de vanguarda. Localizado no centro de Luxemburgo, este projeto combina conforto moderno com eficiência energética excepcional.",
        date: "2023-2024",
        duration: "18 meses",
        budget: "€4.5 milhões",
        area: "3500 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    },
    {
        id: 2,
        title: "Centro Empresarial Horizonte",
        description: "Complexo empresarial com certificação energética A+, projetado para empresas tecnológicas. O edifício incorpora materiais de baixo impacto ambiental e sistemas avançados de gestão energética.",
        date: "2022-2023",
        duration: "14 meses",
        budget: "€6.2 milhões",
        area: "5200 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    },
    {
        id: 3,
        title: "Residencial Panorâmica",
        description: "Conjunto residencial composto por 12 moradias unifamiliares com vistas panorâmicas. Cada unidade foi projetada para maximizar a exposição solar e a eficiência energética.",
        date: "2021-2022",
        duration: "16 meses",
        budget: "€3.8 milhões",
        area: "4200 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    },
    {
        id: 4,
        title: "Hotel Bellevue",
        description: "Renovação completa de um hotel histórico de 4 estrelas, preservando elementos arquitetónicos originais enquanto introduz tecnologias modernas e design contemporâneo.",
        date: "2020-2021",
        duration: "12 meses",
        budget: "€5.1 milhões",
        area: "3800 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    },
    {
        id: 5,
        title: "Centro Comercial Alameda",
        description: "Projeto de construção de um centro comercial moderno com 40 lojas, praça de alimentação e estacionamento subterrâneo. Construído com ênfase em acessibilidade e eficiência operacional.",
        date: "2019-2021",
        duration: "24 meses",
        budget: "€12.5 milhões",
        area: "15000 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    },
    {
        id: 6,
        title: "Edifício de Escritórios Nova Era",
        description: "Edifício de escritórios inteligente com sistemas avançados de automação e gestão ambiental. Projeto com classificação BREEAM Excelente.",
        date: "2019-2020",
        duration: "15 meses",
        budget: "€7.3 milhões",
        area: "6200 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    },
    {
        id: 7,
        title: "Condomínio Riverside",
        description: "Condomínio fechado com 15 apartamentos de luxo às margens do rio. Inclui áreas de lazer comuns, piscina e jardim paisagístico.",
        date: "2018-2019",
        duration: "14 meses",
        budget: "€5.6 milhões",
        area: "4700 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    },
    {
        id: 8,
        title: "Escola Municipal de Artes",
        description: "Construção de uma escola municipal com salas especializadas para música, dança e artes visuais. Projeto acusticamente otimizado e com grande ênfase na iluminação natural.",
        date: "2017-2018",
        duration: "10 meses",
        budget: "€3.2 milhões",
        area: "2800 m²",
        images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
        ]
    }
];

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const carouselSlides = document.getElementById('carousel-slides');
const projectDetails = document.getElementById('project-details');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// State variables
let currentSlide = 0;
let currentProject = null;

// Initialize the gallery
function initGallery() {
    portfolioProjects.forEach(project => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.id = project.id;
        
        galleryItem.innerHTML = `
            <img src="${project.images[0]}" alt="${project.title}">
            <div class="gallery-item-overlay">
                <h3>${project.title}</h3>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
        
        // Add click event listener
        galleryItem.addEventListener('click', () => openModal(project.id));
    });
}

// Open modal with project details
function openModal(projectId) {
    const project = portfolioProjects.find(p => p.id === projectId);
    
    if (project) {
        currentProject = project;
        currentSlide = 0;
        
        // Populate carousel
        carouselSlides.innerHTML = '';
        project.images.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `<img src="${image}" alt="${project.title}">`;
            carouselSlides.appendChild(slide);
        });
        
        // Update carousel position
        updateCarousel();
        
        // Populate project details
        projectDetails.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="detail-item">
                <strong>Data:</strong> ${project.date}
            </div>
            <div class="detail-item">
                <strong>Duração:</strong> ${project.duration}
            </div>
            <div class="detail-item">
                <strong>Orçamento:</strong> ${project.budget}
            </div>
            <div class="detail-item">
                <strong>Área:</strong> ${project.area}
            </div>
        `;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

// Close modal function
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Update carousel position
function updateCarousel() {
    if (!currentProject) return;
    
    const slideWidth = 100; // Percentage
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

// Navigate to previous slide
function prevSlide() {
    if (!currentProject) return;
    
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : currentProject.images.length - 1;
    updateCarousel();
}

// Navigate to next slide
function nextSlide() {
    if (!currentProject) return;
    
    currentSlide = (currentSlide < currentProject.images.length - 1) ? currentSlide + 1 : 0;
    updateCarousel();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery
    initGallery();
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Carousel navigation
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
});