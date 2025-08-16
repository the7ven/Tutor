// ===== MENU MOBILE =====
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
}

// Fermer le menu en cliquant en dehors
document.addEventListener('click', function(event) {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu && 
        !hamburger.contains(event.target) && 
        !mobileMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Fermer le menu lors du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    }
});

// ===== ANIMATIONS CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
        }
        40%, 43% {
            transform: translate3d(0, -30px, 0);
        }
        70% {
            transform: translate3d(0, -15px, 0);
        }
        90% {
            transform: translate3d(0, -4px, 0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== SYSTÈME D'OBSERVATION UNIFIÉ =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Observer principal pour les animations générales
const mainObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationFillMode = 'both';
            }, index * 200);
        }
    });
}, observerOptions);

// ===== ANIMATION DE COMPTEUR =====
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 20);
};

// Observer pour les statistiques
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            const targets = [30000, 20000, 100, 95];
            
            statNumbers.forEach((number, index) => {
                if (targets[index]) {
                    animateCounter(number, targets[index]);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===== INITIALISATION AU CHARGEMENT DOM =====
document.addEventListener('DOMContentLoaded', () => {
    // Animation des cartes d'étapes
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        mainObserver.observe(card);
    });

    // Animation des numéros d'étapes
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach((number, index) => {
        setTimeout(() => {
            number.style.animation = 'bounce 0.6s ease';
        }, index * 300);
    });

    // Observer les cartes de fonctionnalités
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => mainObserver.observe(card));

    // Observer les éléments de statistiques
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => mainObserver.observe(item));

    // Observer la grille de statistiques pour l'animation de compteur
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }

    // Effet de ripple sur les cartes d'étapes
    stepCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x - 25}px;
                top: ${y - 25}px;
                width: 50px;
                height: 50px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Gestion du carrousel de partenaires
    const track = document.querySelector('.partners-track');
    const carousel = document.querySelector('.partners-carousel');

    if (track && carousel) {
        let touchStartX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            track.style.animationPlayState = 'paused';
        });

        carousel.addEventListener('touchend', (e) => {
            track.style.animationPlayState = 'running';
        });
    }
});

// ===== EFFETS DE DÉFILEMENT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Effet parallax sur les cercles flottants
    const circles = document.querySelectorAll('.floating-circle');
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Effet parallax sur les formes flottantes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== ANIMATION DE CHARGEMENT DE PAGE =====
window.addEventListener('load', () => {
    // Animation plus douce sans faire disparaître tout le contenu
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
});