(function() {
            // 1. MENU HAMBURGER RESPONSIVO
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            const navLinks = document.querySelectorAll('.nav-menu a');

            function toggleMenu() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                const expanded = hamburger.classList.contains('active') ? 'true' : 'false';
                hamburger.setAttribute('aria-expanded', expanded);
            }

            hamburger.addEventListener('click', toggleMenu);

            // fechar menu ao clicar em link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });

            // 2. FADE-IN AO ROLAR (Intersection Observer)
            const fadeElements = document.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

            fadeElements.forEach(el => observer.observe(el));

            // garante que hero apareça se já estiver visível
            window.addEventListener('load', () => {
                fadeElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 100) {
                        el.classList.add('visible');
                        observer.unobserve(el);
                    }
                });
            });

            // 3. FORMULÁRIO COM VALIDAÇÃO BÁSICA
            const form = document.getElementById('contactForm');
            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const objetivoSelect = document.getElementById('objetivo');
            const errorNome = document.getElementById('errorNome');
            const errorEmail = document.getElementById('errorEmail');
            const errorObjetivo = document.getElementById('errorObjetivo');
            const successDiv = document.getElementById('formSuccess');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                // reset errors
                errorNome.innerText = '';
                errorEmail.innerText = '';
                errorObjetivo.innerText = '';
                successDiv.style.display = 'none';

                // nome
                const nome = nomeInput.value.trim();
                if (nome === '') {
                    errorNome.innerText = 'Nome obrigatório.';
                    isValid = false;
                } else if (nome.length < 3) {
                    errorNome.innerText = 'Digite nome completo.';
                    isValid = false;
                }

                // email
                const email = emailInput.value.trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email === '') {
                    errorEmail.innerText = 'E-mail obrigatório.';
                    isValid = false;
                } else if (!emailPattern.test(email)) {
                    errorEmail.innerText = 'E-mail inválido.';
                    isValid = false;
                }

                // objetivo
                if (!objetivoSelect.value || objetivoSelect.value === '') {
                    errorObjetivo.innerText = 'Selecione um objetivo.';
                    isValid = false;
                }

                if (isValid) {
                    // simulação de envio
                    nomeInput.value = '';
                    emailInput.value = '';
                    objetivoSelect.value = '';
                    successDiv.style.display = 'block';
                    setTimeout(() => { successDiv.style.display = 'none'; }, 6000);
                }
            });
        })();