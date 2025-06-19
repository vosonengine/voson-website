document.addEventListener('DOMContentLoaded', () => {
    // --- SETUP INICIAL ---
    // Función para dividir texto en spans y guardarlos para cada sección
    const sectionsData = [];
    document.querySelectorAll('.animated-section').forEach((section, index) => {
        const h1Spans = [];
        const pSpans = [];
        section.querySelectorAll('h1.reveal-text').forEach(h1 => {
            h1.innerHTML = h1.innerText.split('').map(char => `<span>${char}</span>`).join('');
            h1Spans.push(...h1.querySelectorAll('span'));
        });
        section.querySelectorAll('p.reveal-text').forEach(p => {
            p.innerHTML = p.innerText.split('').map(char => `<span>${char}</span>`).join('');
            pSpans.push(...p.querySelectorAll('span'));
        });
        sectionsData[index] = {
            element: section,
            textSpans: [...h1Spans, ...pSpans]
        };
    });
    // Función de utilidad para mapear un valor de un rango a otro
    function mapRange(value, inMin, inMax, outMin, outMax) {
        const val = Math.max(inMin, Math.min(inMax, value));
        return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    // --- MANEJO DEL SCROLL ---
    function handleScroll() {
        sectionsData.forEach(data => {
            const { element, textSpans } = data;
            const rect = element.getBoundingClientRect();
            const { top, height } = rect;
            const windowHeight = window.innerHeight;
            // Si la sección no está en la pantalla, no hacemos nada
            if (rect.bottom < 0 || top > windowHeight) {
                return;
            }
            // Progreso general del scroll dentro de la sección (de 0 a 1)
            const scrollableHeight = height - windowHeight;
            let progress = mapRange(-top, 0, scrollableHeight, 0, 1);
            // --- FASES DE LA ANIMACIÓN (definidas como rangos de 'progress') ---
            // Fase 1 y 2: Revelado del texto (de 0% a 30% del scroll)
            const textProgress = mapRange(progress, 0.0, 0.3, 0, 1);
            const revealedChars = Math.floor(textProgress * textSpans.length);
            textSpans.forEach((span, index) => {
                span.style.opacity = index < revealedChars ? '1' : '0.2';
            });
            // Fase 3 y 4: Aparición de la imagen (de 30% a 60% del scroll)
            const imageFadeInProgress = mapRange(progress, 0.3, 0.6, 0, 1);
            element.style.setProperty('--image-opacity', imageFadeInProgress);
            element.style.setProperty('--image-scale', 0.9 + 0.1 * imageFadeInProgress);
            element.style.setProperty('--image-y', `${(1 - imageFadeInProgress) * 10}vh`);
            // Fase 5 y 6: Fade out de la imagen y espacio en negro (de 90% a 100%)
            // La sección tiene 325vh. El final (25vh) es para el fade-out.
            // 300/325 = ~0.92
            const imageFadeOutProgress = mapRange(progress, 0.92, 1.0, 1, 0);
            if (progress > 0.92) {
                element.style.setProperty('--image-opacity', imageFadeOutProgress);
            }
        });
    }
    // Escuchar el evento de scroll y ejecutar la función
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Ejecutar una vez al inicio para el estado inicial
    handleScroll();
}); 