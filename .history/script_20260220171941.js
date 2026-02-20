// ================= MENU MOBILE =================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Fecha menu ao clicar em link (mobile UX melhor)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


// ================= HEADER SCROLL EFFECT =================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,0.85)";
        header.style.padding = "15px 0";
    } else {
        header.style.background = "rgba(0,0,0,0.6)";
        header.style.padding = "20px 0";
    }
});


// ================= SCROLL REVEAL =================
const faders = document.querySelectorAll(".fade-in");

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
    el.style.transitionDelay = `${index * 0.1}s`; // efeito em cascata
    appearOnScroll.observe(el);
});


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ================= FORM VALIDATION =================
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if(name.length < 3){
        message.textContent = "Please enter a valid name.";
        message.style.color = "yellow";
        return;
    }

    if(!email.includes("@") || !email.includes(".")){
        message.textContent = "Please enter a valid email.";
        message.style.color = "yellow";
        return;
    }

    message.textContent = "Message sent successfully!";
    message.style.color = "lightgreen";
    form.reset();
});