document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 50 ? "0 2px 10px rgba(0,0,0,0.2)" : "0 2px 5px rgba(0,0,0,0.1)";
    });

    // --- Toast Notification ---
    const contactForm = document.getElementById('contactForm');

    function showToast(msg) {
        let toast = document.querySelector('.custom-alert');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'custom-alert';
            toast.innerHTML = `<span class="msg"></span><button class="custom-alert-close">&times;</button>`;
            document.body.appendChild(toast);
            toast.querySelector('.custom-alert-close').onclick = () => toast.classList.remove('show');
        }
        toast.querySelector('.msg').textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('¡Gracias! Nos pondremos en contacto con usted pronto.');
            contactForm.reset();
        });
    }

    // --- Carousel ---
    const slides = document.querySelectorAll('.carousel-slide');
    const wrapper = document.querySelector('.carousel-wrapper');

    if (slides.length > 0) {
        let idx = 0;
        let interval;

        const showSlide = (n) => {
            slides[idx].classList.remove('active');
            idx = (n + slides.length) % slides.length; // Lógica circular simplificada
            slides[idx].classList.add('active');
        };

        const next = () => showSlide(idx + 1);
        const prev = () => showSlide(idx - 1);
        const start = () => interval = setInterval(next, 5000);
        const stop = () => clearInterval(interval);

        document.getElementById('nextBtn')?.addEventListener('click', () => { stop(); next(); start(); });
        document.getElementById('prevBtn')?.addEventListener('click', () => { stop(); prev(); start(); });

        // Pausar carrusel al pasar el mouse (Mejora UX)
        wrapper.addEventListener('mouseenter', stop);
        wrapper.addEventListener('mouseleave', start);

        start();
    }
});