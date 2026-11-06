// GM.DEV v1.1: navegación accesible y transiciones progresivas.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const navItems = [...(navigation?.querySelectorAll('a[href^="#"]') ?? [])];

function closeMenu({ restoreFocus = false } = {}) {
  if (!navigation || !menuButton) return;
  const wasOpen = navigation.classList.contains('open');
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  if (restoreFocus && wasOpen) menuButton.focus();
}

menuButton?.addEventListener('click', () => {
  const isOpen = navigation?.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    navigation?.classList.add('open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Cerrar menú');
  }
});

navItems.forEach(link => link.addEventListener('click', () => closeMenu()));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu({ restoreFocus: true });
});

const desktopQuery = window.matchMedia('(min-width: 651px)');
function onDesktopChange(event) { if (event.matches) closeMenu(); }
if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onDesktopChange);
else desktopQuery.addListener?.(onDesktopChange);

const yearNode = document.querySelector('#year');
if (yearNode) yearNode.textContent = String(new Date().getFullYear());

// Resaltar el enlace a la sección actual sin alterar el historial.
const sections = navItems
  .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter(item => item.section);

if ('IntersectionObserver' in window && sections.length) {
  const visible = new Map();
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
      else visible.delete(entry.target.id);
    });
    const current = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0]?.[0];
    if (!current) return;
    sections.forEach(({link,section}) => {
      if (section.id === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-18% 0px -55% 0px', threshold: 0 });
  sections.forEach(({section}) => activeObserver.observe(section));
}

// Mejora progresiva: sin JS o con movimiento reducido, el contenido sigue visible.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const targets = document.querySelectorAll(
    '.section-head, .split > div, .service-card, .project-card, .steps > div, .contact-box > div'
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  targets.forEach(target => {
    target.classList.add('reveal');
    revealObserver.observe(target);
  });
  document.documentElement.classList.add('motion-ready');
  reduceMotion.addEventListener?.('change', event => {
    if (!event.matches) return;
    document.documentElement.classList.remove('motion-ready');
    targets.forEach(target => target.classList.add('is-visible'));
    revealObserver.disconnect();
  });
}
