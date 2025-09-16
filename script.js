// script.js - Versão Otimizada
document.addEventListener('DOMContentLoaded', function () {
    // ===== MENU HAMBURGER =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ===== ANIMAÇÕES AO ROLAR =====
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
        .forEach(el => observer.observe(el));

    // ===== SCROLL SUAVE =====
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const offsetTop = target.offsetTop - headerHeight;

                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // ===== HEADER AO ROLAR + MENU ATIVO =====
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function updateActiveMenu() {
        let current = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionBottom = sectionTop + section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveMenu();
    });

    // ===== BOTÃO "SAIBA MAIS" =====
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const problematica = document.querySelector('#problematica');
            if (problematica) {
                const headerHeight = header.offsetHeight;
                const offsetTop = problematica.offsetTop - headerHeight;

                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    }

    // ===== CARDS DE FUNCIONALIDADES =====
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hovered'));
        card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
    });

    // ===== SLIDER =====
    initSlider();
});

// ===== FUNÇÃO SLIDER =====
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playPauseBtn = document.querySelector('.slider-play-pause');
    if (!slides.length || !dots.length || !prevBtn || !nextBtn || !playPauseBtn) return;

    let current = 0;
    let isPlaying = true;
    let interval;

    const playPauseIcon = playPauseBtn.querySelector('i');

    function showSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function nextSlide() { showSlide(current + 1); }
    function prevSlide() { showSlide(current - 1); }

    function startSlider() {
        interval = setInterval(nextSlide, 4000);
        isPlaying = true;
        playPauseIcon.className = 'fas fa-pause';
    }

    function stopSlider() {
        clearInterval(interval);
        isPlaying = false;
        playPauseIcon.className = 'fas fa-play';
    }

    nextBtn.addEventListener('click', () => { stopSlider(); nextSlide(); });
    prevBtn.addEventListener('click', () => { stopSlider(); prevSlide(); });
    playPauseBtn.addEventListener('click', () => isPlaying ? stopSlider() : startSlider());

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopSlider(); showSlide(i); });
    });

    startSlider();
}
