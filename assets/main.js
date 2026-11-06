const button = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

button?.addEventListener('click', () => {
    const open = links.classList.toggle('open');

    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

links?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        links.classList.remove('open');
        button?.setAttribute('aria-expanded', 'false');
        button?.setAttribute('aria-label', 'Abrir menú');
    });
});

document.querySelector('#year').textContent =
    String(new Date().getFullYear());
