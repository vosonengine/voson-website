// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ANIMACIÓN DE SCROLL DEL HERO (ANTIGUA - COMENTAR O ELIMINAR) ---
    /*
    const heroText = document.getElementById('hero-text');
    const heroSection = document.getElementById('hero');
    // const mainContent = document.getElementById('main-content'); // No se usa aquí

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // La animación ocurre en el primer tercio de la sección hero (0 a 100vh)
        const animationStart = 0;
        const animationEnd = window.innerHeight;

        if (scrollY >= animationStart && scrollY <= animationEnd) {
            // Normalizamos el valor del scroll entre 0 y 1
            const progress = (scrollY - animationStart) / (animationEnd - animationStart);
            
            // Calculamos la opacidad y la escala
            // Opacidad: de 0 a 1 y luego de 1 a 0
            const opacity = Math.sin(progress * Math.PI); // Seno da una curva suave de 0 -> 1 -> 0
            
            // Escala: de 3 a 1
            const scale = 3 - (progress * 2); // 3 es la escala inicial, 1 es la final

            if (heroText) { // Comprobar si heroText existe
                 heroText.style.opacity = opacity;
                 heroText.style.transform = `scale(${Math.max(1, scale)})`; // Aseguramos que no sea menor de 1
            }
        }
        
        // Fija el fondo del header para que sea menos transparente al hacer scroll
        const header = document.getElementById('main-header');
        if (header) { // Comprobar si header existe
            if (scrollY > 50) {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
            } else {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.5)';
            }
        }
    });
    */
    // --- FIN ANIMACIÓN ANTIGUA HERO ---


    // --- 2. ANIMACIONES AL HACER SCROLL (FADE IN, SLIDE UP) ---
    // (Este código puede permanecer si lo usas para otras secciones)
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    // const hideScrollElement = (element) => { // No se usa en tu código actual
    //     element.classList.remove('is-visible');
    // };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } 
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();


    // --- 3. MENÚ MÓVIL (HAMBURGUESA) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav && navLinks.length > 0) {
        // Función para cerrar el menú
        const closeMenu = () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => link.style.animation = '');
        };

        // Evento click en el botón hamburguesa
        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el click se propague
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');

            // Animar los enlaces
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('nav-active')) {
                closeMenu();
            }
        });

        // Cerrar menú al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav.classList.contains('nav-active')) {
                closeMenu();
            }
        });
    }

    // --- 4. EFECTO MÁQUINA DE ESCRIBIR (TYPEWRITER) ---
    // (Puede permanecer si se usa)
});