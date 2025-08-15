 function toggleMenu() {
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        }

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(event) {
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Fermer le menu lors du redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                document.querySelector('.hamburger').classList.remove('active');
                document.getElementById('mobileMenu').classList.remove('active');
            }
        });


          // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, observerOptions);

        // Initialiser l'animation
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.step-card');
            
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });

            // Animation de compteur pour les numéros
            const numbers = document.querySelectorAll('.step-number');
            numbers.forEach((number, index) => {
                setTimeout(() => {
                    number.style.animation = 'bounce 0.6s ease';
                }, index * 300);
            });
        });

        // Effet parallax léger sur les éléments flottants
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const circles = document.querySelectorAll('.floating-circle');
            
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.5;
                circle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Effet de particules au clic sur les cartes
        document.querySelectorAll('.step-card').forEach(card => {
            card.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Créer un effet de ripple
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(102, 126, 234, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = (x - 25) + 'px';
                ripple.style.top = (y - 25) + 'px';
                ripple.style.width = '50px';
                ripple.style.height = '50px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Ajouter l'animation CSS pour le ripple
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
        `;
        document.head.appendChild(style);



