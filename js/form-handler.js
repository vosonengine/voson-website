document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const project = formData.get('project');
            const extra = formData.get('extra');
            
            const experienceTypes = [];
            formData.getAll('experience_type').forEach(type => {
                experienceTypes.push(type);
            });

            const budget = formData.get('budget');
            const timeline = formData.get('timeline');

            const subject = `Propuesta de Contacto de ${name}`;
            
            const body = `
Hola,

Has recibido una nueva propuesta a través del formulario de contacto.

Aquí están los detalles:
--------------------------------------------------
Nombre Completo: ${name}
Correo Electrónico: ${email}
Empresa / Institución: ${company || 'No especificado'}
--------------------------------------------------

Tipo de Experiencia de Interés:
- ${experienceTypes.join('\n- ') || 'No especificado'}

Descripción del Proyecto:
${project || 'No especificado'}

Presupuesto Estimado: ${budget || 'No especificado'}
Plazo Deseado: ${timeline || 'No especificado'}

Información Adicional:
${extra || 'No especificado'}
--------------------------------------------------
`;

            const mailtoLink = `mailto:ian.bf@vosonengine.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
        });
    }
});
