// script.js - Versão Atualizada
document.addEventListener('DOMContentLoaded', function() {
    // Menu Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Observador de interseção para animações ao rolar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos com classes de animação
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Navegação suave
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Verificar se é um link âncora
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcular a posição considerando o header fixo
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar a classe ativa no menu
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
            // Links externos seguirão normalmente
        });
    });

    // Efeito de header ao rolar
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Atualizar menu ativo baseado na seção visível
            updateActiveMenu();
        });
    }

    // Função para atualizar o menu ativo baseado na seção visível
    function updateActiveMenu() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.querySelector('header');
        
        if (!sections.length || !navLinks.length || !header) return;
        
        let currentSection = '';
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50) && 
                window.scrollY < (sectionTop + sectionHeight - headerHeight)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Botão CTA - Saiba Mais
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const problematicaSection = document.querySelector('#problematica');
            if (problematicaSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = problematicaSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Interatividade para os cards de funcionalidades
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            this.style.minHeight = '300px';
            
            const details = this.querySelector('.feature-details');
            const preview = this.querySelector('.feature-preview');
            
            if (details && preview) {
                details.style.maxHeight = '500px';
                details.style.opacity = '1';
                details.style.marginTop = '20px';
                
                preview.style.opacity = '0';
                preview.style.height = '0';
                preview.style.margin = '0';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.minHeight = '';
            
            const details = this.querySelector('.feature-details');
            const preview = this.querySelector('.feature-preview');
            
            if (details && preview) {
                details.style.maxHeight = '0';
                details.style.opacity = '0';
                details.style.marginTop = '0';
                
                preview.style.opacity = '1';
                preview.style.height = 'auto';
                preview.style.margin = '';
            }
        });
    });

    // Placeholder de vídeo
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            alert('Aqui seria exibido um vídeo de demonstração do aplicativo em funcionamento.');
        });
    }

    // Inicializações
    updateActiveMenu();
    initSlider();
});

// Slider functionality
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playPauseBtn = document.querySelector('.slider-play-pause');
    
    // Verificar se todos os elementos do slider existem
    if (!slider || !slides.length || !dots.length || !prevBtn || !nextBtn || !playPauseBtn) {
        return;
    }
    
    const playPauseIcon = playPauseBtn.querySelector('i');
    
    let currentSlide = 0;
    let isPlaying = true;
    let slideInterval;
    
    // Função para mostrar slide específico
    function showSlide(n) {
        // Esconder todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ajustar índice se for beyond dos limites
        if (n >= slides.length) {
            currentSlide = 0; // Volta para o primeiro slide
        } else if (n < 0) {
            currentSlide = slides.length - 1; // Vai para o último slide
        } else {
            currentSlide = n;
        }
        
        // Mostrar slide atual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Iniciar autoplay
    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000); // Muda a cada 4 segundos
        isPlaying = true;
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    }
    
    // Parar autoplay
    function stopSlider() {
        clearInterval(slideInterval);
        isPlaying = false;
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        if (isPlaying) stopSlider();
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        if (isPlaying) stopSlider();
        prevSlide();
    });
    
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopSlider();
        } else {
            startSlider();
        }
    });
    
    // Clique nos dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            if (isPlaying) stopSlider();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Iniciar o slider
    startSlider();
}