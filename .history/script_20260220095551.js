(function() {
    // ==============================
    // 1. MENU HAMBURGER RESPONSIVO
    // ==============================
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

    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==============================
    // 2. FADE-IN AO ROLAR (Intersection Observer)
    // ==============================
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

    // garante que elementos visíveis já carregados apareçam
    window.addEventListener('load', () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    });

    // ==============================
    // 3. FORMULÁRIO COM VALIDAÇÃO BÁSICA
    // ==============================
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

        // Reset de erros
        errorNome.innerText = '';
        errorEmail.innerText = '';
        errorObjetivo.innerText = '';
        successDiv.style.display = 'none';

        // Validação Nome
        const nome = nomeInput.value.trim();
        if (nome === '') {
            errorNome.innerText = 'Nome obrigatório.';
            isValid = false;
        } else if (nome.length < 3) {
            errorNome.innerText = 'Digite nome completo.';
            isValid = false;
        }

        // Validação Email
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errorEmail.innerText = 'E-mail obrigatório.';
            isValid = false;
        } else if (!emailPattern.test(email)) {
            errorEmail.innerText = 'E-mail inválido.';
            isValid = false;
        }

        // Validação Objetivo
        if (!objetivoSelect.value || objetivoSelect.value === '') {
            errorObjetivo.innerText = 'Selecione um objetivo.';
            isValid = false;
        }

        // Se válido, simula envio
        if (isValid) {
            nomeInput.value = '';
            emailInput.value = '';
            objetivoSelect.value = '';
            successDiv.style.display = 'block';

            // efeito de fade out suave
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 6000);

            // ==============================
            // Aqui você pode integrar CRM ou Pixel
            // Exemplo: enviar dados para API de leads
            // fetch('/api/leads', {method:'POST', body: JSON.stringify({nome,email,objetivo})})
            // ==============================
        }
    });

    // ==============================
    // 4. SCROLL SUAVE (fallback)
    // ==============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();