// ================= MENU MOBILE =================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// ================= ANIMAÇÃO SCROLL =================
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// ================= VALIDAÇÃO FORM =================
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if(name.length < 3){
        message.textContent = "Digite um nome válido.";
        message.style.color = "yellow";
        return;
    }

    if(!email.includes("@") || !email.includes(".")){
        message.textContent = "Digite um email válido.";
        message.style.color = "yellow";
        return;
    }

    message.textContent = "Mensagem enviada com sucesso!";
    message.style.color = "lightgreen";
    form.reset();
});