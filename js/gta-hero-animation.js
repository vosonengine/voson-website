gsap.registerPlugin(ScrollTrigger);

// Detectar si es dispositivo móvil
const isMobile = window.innerWidth <= 768;

// Ajustar la duración y escala según el dispositivo
const initialScale = isMobile ? 1.2 : 1.45;
const animationDuration = isMobile ? 1.8 : 2.8;

// Ajustes específicos para móvil
if (isMobile) {
    // Asegurar que la imagen del hero se vea completa
    gsap.set(".gta-hero-main-image", {
        objectFit: "cover",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        transform: "scale(0.9)" // Reducir tamaño de la imagen
    });

    // Ajustar el contenedor del texto
    gsap.set(".gta-hero-text-logo-container", {
        width: "100%",
        padding: "0 1rem",
        position: "relative",
        zIndex: 2
    });

    // Ajustar el texto principal
    gsap.set(".gta-hero-text", {
        fontSize: "1.8rem", // Reducido para móviles
        textAlign: "center",
        width: "100%",
        margin: "0 auto"
    });

    // Ajustar el contenedor secundario para que sea visible
    gsap.set(".gta-hero-2-container", {
        padding: "1rem",
        height: "auto",
        minHeight: "30vh",
        position: "relative",
        top: "40vh", // Posicionarlo debajo de la animación principal
        zIndex: 10,
        opacity: 1,
        visibility: "visible",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        width: "90%",
        maxWidth: "500px",
        margin: "1rem auto",
        borderRadius: "8px"
    });

    // Asegurar que el texto sea visible
    gsap.set(".gta-hero-2-container h3", {
        color: "var(--primary-color)",
        webkitTextFillColor: "var(--primary-color)"
    });

    gsap.set(".gta-hero-2-container p", {
        color: "var(--text-color)",
        webkitTextFillColor: "var(--text-color)"
    });

    // Ajustar el contenedor principal
    gsap.set(".gta-hero-main-container", {
        position: "relative",
        overflow: "visible",
        height: "40vh" // Reducido para móviles
    });
}

// First step
gsap.from(".gta-hero-main-container", {
    scale: initialScale,
    duration: animationDuration,
    ease: "power3.out",
});

gsap.to(".gta-overlay", {
    opacity: 0,
    duration: animationDuration,
    ease: "power3.out",
    onComplete: () => {
        document.body.style.overflow = "visible";
        document.body.style.overflowX = "hidden";
    },
});

// Scroll Indicator - Solo mostrar en desktop
const scrollIndicator = document.querySelector(".gta-scroll-indicator");
if (scrollIndicator && !isMobile) {
    const bounceTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
    });

    bounceTimeline.to(scrollIndicator, {
        y: 20,
        opacity: 0.6,
        duration: 0.8,
        ease: "power1.inOut",
    });
} else if (scrollIndicator) {
    scrollIndicator.style.display = 'none';
}

// Create a timeline for better control
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".gta-hero-container",
        scrub: isMobile ? 1 : 2,
        pin: true,
        start: "top top",
        end: isMobile ? "+=1000" : "+=2000",
        ease: "none",
    },
});

// Need to ensure that the scale is like this otherwise some flicks happens
tl.set(".gta-hero-main-container", {
    scale: isMobile ? 1.1 : 1.25,
});

tl.to(".gta-hero-main-container", {
    scale: 1,
    duration: 1,
});

tl.to(
    ".gta-hero-main-logo",
    {
        opacity: 0,
        duration: isMobile ? 0.3 : 0.5,
    },
    "<"
);

tl.to(
    ".gta-hero-main-image",
    {
        opacity: 0,
        duration: isMobile ? 1.0 : 2.0,
    },
    "<+=0.5"
);

tl.to(
    ".gta-hero-main-container",
    {
        backgroundSize: isMobile ? "60vh" : "72vh",
        duration: isMobile ? 1.0 : 1.5,
    },
    "<+=0.2"
);

// logo purple
tl.fromTo(
    ".gta-hero-text-logo",
    {
        opacity: 0,
        maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)`,
    },
    {
        opacity: 1,
        maskImage: `radial-gradient(
            circle at 50% 105.594%,
            rgb(0, 0, 0) 62.9372%,
            rgba(0, 0, 0, 0) 81.4686%
        )`,
        duration: isMobile ? 2 : 3,
    },
    "<0.2"
);

tl.set(".gta-hero-main-container", { opacity: 0 });

tl.to(".gta-hero-1-container", { 
    scale: isMobile ? 0.9 : 0.85, 
    duration: isMobile ? 2 : 3 
}, "<-=3");

tl.set(
    ".gta-hero-1-container",
    {
        maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
    },
    "<+=2.1"
);

tl.to(
    ".gta-hero-1-container",
    {
        maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
        duration: isMobile ? 1.5 : 2,
    },
    "<+=0.2"
);

tl.to(
    ".gta-hero-text-logo",
    {
        opacity: 0,
        duration: isMobile ? 1.5 : 2,
    },
    "<1.5"
);

tl.set(".gta-hero-1-container", { opacity: 0 });

// Manejo diferente para móvil y desktop
if (isMobile) {
    // En móvil, simplemente aseguramos que el contenedor secundario sea visible
    tl.set(".gta-hero-2-container", { 
        visibility: "visible",
        opacity: 1,
        top: "40vh",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    });
    
    // Asegurar que el texto sea visible con colores correctos
    tl.set(".gta-hero-2-container h3", {
        color: "var(--primary-color)",
        webkitTextFillColor: "var(--primary-color)"
    });
    
    tl.set(".gta-hero-2-container p", {
        color: "var(--text-color)",
        webkitTextFillColor: "var(--text-color)"
    });
    
    // Ajustar el scroll para que el usuario pueda ver el contenido
    tl.set(".gta-hero-container", {
        overflow: "visible",
        height: "auto",
        minHeight: "100vh"
    });
} else {
    // En desktop, seguimos con la animación original
    tl.set(".gta-hero-2-container", { visibility: "visible" });
    tl.to(".gta-hero-2-container", { 
        opacity: 1, 
        duration: 3 
    }, "<+=0.2");
}

// Ajustar el tamaño del texto en móvil
if (isMobile) {
    gsap.set(".gta-hero-text", {
        fontSize: "2.5rem"
    });
    gsap.set(".gta-hero-2-container h3", {
        fontSize: "1.5rem"
    });
    gsap.set(".gta-hero-2-container p", {
        fontSize: "1rem"
    });
}