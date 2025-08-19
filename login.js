  // Gestion du sélecteur de type d'utilisateur
        const userTypeBtns = document.querySelectorAll('.user-type-btn');
        const loginForm = document.getElementById('loginForm');
        let selectedUserType = 'student';

        userTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                userTypeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedUserType = btn.dataset.type;
                
                // Mise à jour du placeholder et du titre selon le type
                const subtitle = document.querySelector('.login-subtitle');
                if (selectedUserType === 'tutor') {
                    subtitle.textContent = 'Accédez à votre espace tuteur';
                } else {
                    subtitle.textContent = 'Connectez-vous à votre compte pour continuer';
                }
            });
        });

        // Gestion de la soumission du formulaire
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Simulation de connexion
            console.log('Connexion:', {
                userType: selectedUserType,
                email: email,
                password: password,
                remember: remember
            });
            
            // Animation de chargement
            const btn = document.querySelector('.login-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Connexion en cours...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.opacity = '1';
                alert(`Connexion réussie en tant que ${selectedUserType === 'tutor' ? 'Tuteur' : 'Étudiant'} !`);
            }, 2000);
        });

        // Animation des champs de saisie
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
        });