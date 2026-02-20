// ================= MENU MOBILE =================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const isActive = nav.classList.toggle("active");
        toggle.setAttribute("aria-expanded", isActive);
    });

    // Fecha menu ao clicar em link (UX melhor no mobile)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            toggle.setAttribute("aria-expanded", false);
        });
    });
}


// ================= HEADER SCROLL EFFECT =================
const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}


/* 
IMPORTANTE:
Adicione isso no CSS:

.header.scrolled {
    background: rgba(0,0,0,0.85);
    padding: 15px 0;
}
*/


// ================= SCROLL REVEAL =================
const faders = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window && faders.length > 0) {

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);

        });
    }, appearOptions);

    faders.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        appearOnScroll.observe(el);
    });
}


// ================= FORM VALIDATION =================
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");

if (form && message) {

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 3) {
            message.textContent = "Please enter a valid name (min. 3 characters).";
            message.style.color = "yellow";
            return;
        }

        if (!emailRegex.test(email)) {
            message.textContent = "Please enter a valid email address.";
            message.style.color = "yellow";
            return;
        }

        message.textContent = "Message sent successfully!";
        message.style.color = "lightgreen";

        form.reset();
    });
}