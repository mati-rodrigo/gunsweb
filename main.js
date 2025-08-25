let currentImageIndex = 0;
const images = [
    'material/galeria/guns1.jpg',
    'material/galeria/guns2.jpg',
    'material/galeria/guns3.jpg',
    'material/galeria/guns4.jpg',
    'material/galeria/guns5.jpg',
    'material/galeria/guns6.jpg',
    'material/galeria/guns7.jpg',
    'material/galeria/guns8.jpg',
    'material/galeria/guns9.jpg',
    'material/galeria/guns10.jpg'
];

/* funciones navegacion */

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function setupNavbarScroll() {
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

/*funciones galeria */

function openModal(index) {
    currentImageIndex = index;
    const modalImage = document.getElementById('modalImage');
    const modal = document.getElementById('galleryModal');

    if (modalImage && modal) {
        modalImage.src = images[index];
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function previousImage(event) {
    if (event) event.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = images[currentImageIndex];
    }
}

function nextImage(event) {
    if (event) event.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = images[currentImageIndex];
    }
}

/* carrusel index */

function setupImageCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    if (images.length === 0) return;

    let currentSlide = 0;

    /* Precargar imagenes */
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });

    function showSlide(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % images.length;
        showSlide(currentSlide);
    }

    // Auto-avance cada 5 segundos
    setInterval(nextSlide, 5000);
}

/*funcion animacion */

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

function addHoverEffects() {
    /*efecto para cards*/
    const cards = document.querySelectorAll('.card, .nav-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/*funciones*/
function setupSmoothScroll() {
    // Scroll suave para el botón CTA del hero
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector('#navigation');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    /*Scroll*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function preloadImages() {
    /*Precargar imagenes*/
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0.7';
            img.style.transition = 'opacity 0.5s ease';

            img.addEventListener('load', function () {
                this.style.opacity = '1';
            });

            img.addEventListener('error', function () {
                this.style.opacity = '0.5';
                console.warn('Error cargando imagen:', this.src);
            });
        }
    });
}

/*teclado*/

function setupKeyboardEvents() {
    document.addEventListener('keydown', function (e) {
        const modal = document.getElementById('galleryModal');
        if (modal && modal.classList.contains('show')) {
            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    previousImage(e);
                    break;
                case 'ArrowRight':
                    nextImage(e);
                    break;
            }
        }
    });
}


/*Funciones*/

function initHomePage() {
    // Configurar carrusel de imágenes
    setupImageCarousel();

    // Animación del contenido del hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1.2s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
}

function initGalleryPage() {
    // Configurar efectos para las imágenes de galería
    const galleryImages = document.querySelectorAll('.card-img-top');
    galleryImages.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.1}s`;
        img.classList.add('fade-in');
    });
}

function initDiscographyPage() {
    // Efectos para cards de álbumes
    const albumCards = document.querySelectorAll('.card');
    albumCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('fade-in');
    });
}

function initMembersPage() {
    // Efectos para cards de integrantes
    const memberCards = document.querySelectorAll('.card');
    memberCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

/*Rendimiento*/

function optimizePerformance() {
    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/*Inicio principal*/

document.addEventListener('DOMContentLoaded', function () {
    console.log(' GunsWeb cargado correctamente');

    // Funciones básicas
    setActiveNavItem();
    setupNavbarScroll();
    setupSmoothScroll();
    preloadImages();
    setupKeyboardEvents();
    setupContactForm();
    setupScrollAnimations();
    addHoverEffects();
    optimizePerformance();

    // Inicialización específica por página
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'galeria.html':
            initGalleryPage();
            break;
        case 'discografia.html':
            initDiscographyPage();
            break;
        case 'integrantes.html':
            initMembersPage();
            break;
    }

    // Mensaje de carga completa
    setTimeout(() => {
        console.log(' Todas las funciones inicializadas');
    }, 1000);
});

/*funcion galeria*/

window.openModal = openModal;
window.closeModal = closeModal;
window.previousImage = previousImage;
window.nextImage = nextImage;