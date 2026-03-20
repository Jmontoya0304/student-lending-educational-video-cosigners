// Scroll reveal for frame cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.frame-card');

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    cards.forEach(card => card.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation based on position in viewport
        const delay = Array.from(cards).indexOf(entry.target) % 3 * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => observer.observe(card));
});
