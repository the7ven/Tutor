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




 function showBookingModal(serviceType) {
            const services = {
                individual: 'Personalized Tutoring',
                group: 'Group Classes',
                exam: 'Exam Preparation',
                support: 'Academic Support',
                specialized: 'Specialized Training'
            };
            
            alert(`Redirecting to booking for: ${services[serviceType]}\n\nThis feature would be connected to your booking system.`);
        }

        function showPDFLibrary() {
            alert(`Opening PDF Library\n\nThis section would contain:\n• PDF course catalog\n• Search system\n• Shopping cart\n• Instant downloads`);
        }

        // Animation d'entrée pour les cartes
        const cards = document.querySelectorAll('.service-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        });

        // Initialiser l'animation
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });





         function selectPlan(planType) {
            const plans = {
                basic: 'Basic Academic Support - $25/session',
                premium: 'Premium Complete Package - $45/session',
                group: 'Group Collaborative Learning - $15/session',
                intensive: 'Intensive Exam Mastery - $65/session',
                unlimited: 'Unlimited All-Access Pass - $299/month',
                enterprise: 'Enterprise Institutional Package - Custom pricing'
            };
            
            alert(`You selected: ${plans[planType]}\n\nRedirecting to checkout...\n\nThis would connect to your payment processing system.`);
        }

        function browseCourses() {
            alert(`Opening PDF Course Catalog\n\n• Browse by subject\n• Search functionality\n• Preview available\n• Instant download after purchase`);
        }

        function browseBundles() {
            alert(`Subject Bundle Options:\n\n• Mathematics Bundle (8 courses)\n• Science Bundle (6 courses)\n• Languages Bundle (7 courses)\n• Business Bundle (5 courses)\n\nSave up to 40% compared to individual purchases!`);
        }

        function getFullAccess() {
            alert(`Full Library Access includes:\n\n• 500+ PDF courses\n• All future releases\n• Exclusive bonus materials\n• Lifetime updates\n• Premium support\n\nOne-time payment: $149`);
        }

    
        // Initialize animations
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = card.classList.contains('popular') 
                ? 'scale(1.05) translateY(50px)' 
                : 'translateY(50px)';
            card.style.transition = 'all 0.8s ease';
            observer.observe(card);
        });


          function navigateModal(currentModalId, direction) {
            const currentNum = parseInt(currentModalId.replace('modal', ''));
            let nextNum = currentNum + direction;
            
            // Handle wrapping around
            if (nextNum < 1) nextNum = 6;
            if (nextNum > 6) nextNum = 1;
            
            const nextModalId = 'modal' + nextNum;
            
            // Close current modal
            closeModal(currentModalId);
            
            // Open next modal with a slight delay for smooth transition
            setTimeout(() => {
                openModal(nextModalId);
            }, 100);
        }

        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset expanded content
            const content = document.getElementById(modalId.replace('modal', 'content'));
            if (content) {
                content.classList.remove('expanded');
                const btn = content.previousElementSibling;
                if (btn) {
                    btn.innerHTML = '<span>Read Full Article</span><span>↓</span>';
                }
            }
        }

        function toggleContent(contentId) {
            const content = document.getElementById(contentId);
            const btn = content.previousElementSibling;
            
            if (content.classList.contains('expanded')) {
                content.classList.remove('expanded');
                btn.innerHTML = '<span>Read Full Article</span><span>↓</span>';
            } else {
                content.classList.add('expanded');
                btn.innerHTML = '<span>Collapse Article</span><span>↑</span>';
                
                // Smooth scroll to content
                setTimeout(() => {
                    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    closeModal(modal.id);
                }
            });
        }

        // Close modal on Escape key press
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const openModal = document.querySelector('.modal[style*="block"]');
                if (openModal) {
                    closeModal(openModal.id);
                }
            }
            
            // Navigate with arrow keys
            if (event.key === 'ArrowLeft') {
                const openModal = document.querySelector('.modal[style*="block"]');
                if (openModal) {
                    navigateModal(openModal.id, -1);
                }
            }
            
            if (event.key === 'ArrowRight') {
                const openModal = document.querySelector('.modal[style*="block"]');
                if (openModal) {
                    navigateModal(openModal.id, 1);
                }
            }
        });

        // Add smooth scrolling for modal content
        document.querySelectorAll('.modal-body').forEach(modalBody => {
            modalBody.style.scrollBehavior = 'smooth';
        });

        // Add loading animation for images
        document.addEventListener('DOMContentLoaded', function() {
            const images = document.querySelectorAll('.bento-content, .modal-header');
            images.forEach(img => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const bgImage = new Image();
                const bgUrl = img.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (bgUrl) {
                    bgImage.onload = () => {
                        img.style.opacity = '1';
                    };
                    bgImage.src = bgUrl[1];
                }
            });
        });


        

        document.querySelectorAll('.footer-section').forEach((el) => {
            observer.observe(el);
        });