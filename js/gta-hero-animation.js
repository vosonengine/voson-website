gsap.registerPlugin(ScrollTrigger);

// First step
gsap.from(".gta-hero-main-container", { // MODIFICADO
  scale: 1.45,
  duration: 2.8,
  ease: "power3.out",
});

gsap.to(".gta-overlay", { // MODIFICADO
  opacity: 0,
  duration: 2.8,
  ease: "power3.out",
  onComplete: () => {
    // Permitir scroll una vez la intro termina
    // Si tu body ya gestiona el overflow, esto podría no ser necesario o necesitar ajuste
    document.body.style.overflow = "visible"; 
    document.body.style.overflowX = "hidden";
  },
});

// Scroll Indicator
const scrollIndicator = document.querySelector(".gta-scroll-indicator"); // MODIFICADO
if (scrollIndicator) { // Buena práctica: chequear si existe
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
}


// Create a timeline for better control
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".gta-hero-container", // MODIFICADO: Contenedor principal del hero
    scrub: 2,
    pin: true,
    start: "top top",
    end: "+=2000", // Duración del "pinning" y la animación de scroll
    ease: "none",
  },
});

// Need to ensure that the scale is like this otherwise some flicks happens
tl.set(".gta-hero-main-container", { // MODIFICADO
  scale: 1.25,
});

tl.to(".gta-hero-main-container", { // MODIFICADO
  scale: 1,
  duration: 1,
});

tl.to(
  ".gta-hero-main-logo", // MODIFICADO
  {
    opacity: 0,
    duration: 0.5,
  },
  "<" // starts at the same time of previous animation
);

tl.to(
  ".gta-hero-main-image", // MODIFICADO
  {
    opacity: 0,
    duration: 2.0, //Tiempo desbanecimiento de la imagen principal
  },
  "<+=0.5"
);

tl.to(
  ".gta-hero-main-container", // MODIFICADO
  {
    backgroundSize: "72vh", // 38vh Esto es para el logo de fondo, ajusta si tu logo es diferente
    duration: 1.5,
  },
  "<+=0.2"
);

// tl.fromTo(
//   ".gta-hero-text", // MODIFICADO (para VOSON h1)
//   {
//     backgroundImage: `radial-gradient(
//           circle at 50% 200vh,
//           rgba(255, 214, 135, 0) 0,
//           rgba(157, 47, 106, 0.5) 90vh,
//           rgba(157, 47, 106, 0.8) 120vh,
//           rgba(32, 31, 66, 0) 150vh
//         )`,
//   },
//   {
//     backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
//      rgb(247, 77, 82) 50.011vh,
//       rgb(145, 42, 105) 90.0183vh,
//        rgba(32, 31, 66, 0) 140.599vh)`,
//     duration: 3,
//   },
//   "<1.2" 
// );

// logo purple (o tu logo equivalente)
tl.fromTo(
  ".gta-hero-text-logo", // MODIFICADO
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
    duration: 3,
  },
  "<0.2"
);

tl.set(".gta-hero-main-container", { opacity: 0 }); // MODIFICADO

tl.to(".gta-hero-1-container", { scale: 0.85, duration: 3 }, "<-=3"); // MODIFICADO

tl.set(
  ".gta-hero-1-container", // MODIFICADO
  {
    maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)`,
  },
  "<+=2.1"
);

tl.to(
  ".gta-hero-1-container", // MODIFICADO
  {
    maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`,
    duration: 2,
  },
  "<+=0.2" 
);

tl.to(
  ".gta-hero-text-logo", // MODIFICADO
  {
    opacity: 0,
    duration: 2,
  },
  "<1.5"
);

tl.set(".gta-hero-1-container", { opacity: 0 }); // MODIFICADO
tl.set(".gta-hero-2-container", { visibility: "visible" }); // MODIFICADO

tl.to(".gta-hero-2-container", { opacity: 1, duration: 3 }, "<+=0.2"); // MODIFICADO

// Animación de gradiente para el texto del hero-2-container
// Si tu texto en hero-2-container no usa el efecto de texto con gradiente, puedes omitir esta parte.
// Si lo usa, asegúrate que h3 y p tengan `background-clip: text` y `-webkit-text-fill-color: transparent;`
tl.fromTo(
  ".gta-hero-2-container", // MODIFICADO
  {
    //backgroundImage: `radial-gradient( /* Si el contenedor entero tiene el gradiente como texto */
    //      circle at 50% 200vh,
    //      rgba(255, 214, 135, 0) 0,
    //      rgba(157, 47, 106, 0.5) 90vh,
    //      rgba(157, 47, 106, 0.8) 120vh,
    //      rgba(32, 31, 66, 0) 150vh
    //    )`,
    // Para aplicar a los textos hijos, tendrías que animar '.gta-hero-2-container h3' y '.gta-hero-2-container p' individualmente
    // o asegurar que heredan correctamente. Por simplicidad, se deja así, pero el CSS debe asegurar la visibilidad del texto.
  },
  {
    //backgroundImage: `radial-gradient(circle at 50% 3.9575vh, rgb(255, 213, 133) 0vh,
    // rgb(247, 77, 82) 50.011vh,
    //  rgb(145, 42, 105) 90.0183vh,
    //   rgba(32, 31, 66, 0) 140.599vh)`,
    // duration: 3, // Esta animación puede ser sutil o innecesaria si el texto ya es visible
  },
  //"<1.2" // Ajusta el timing si mantienes esta animación
);