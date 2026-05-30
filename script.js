'use strict';

/* ─── Accordion ─── */
document.querySelectorAll('.accordion-btn').forEach(btn => {
  const panelId = btn.getAttribute('aria-controls');
  const panel   = document.getElementById(panelId);
  if (!panel) return;

  // Start closed
  panel.hidden = false;
  panel.style.maxHeight = '0';
  panel.classList.remove('open');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.accordion-btn').forEach(b => {
      const p = document.getElementById(b.getAttribute('aria-controls'));
      b.setAttribute('aria-expanded', 'false');
      if (p) {
        p.style.maxHeight = '0';
        p.classList.remove('open');
      }
    });

    // Open this one if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      panel.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

/* ─── Lightbox ─── */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || '';
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) openLightbox(img.src, img.alt);
  });
});

lbClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

/* ─── Scroll fade-in ─── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.card, .accordion-btn, .drive-card, .priest-card, .gallery-item').forEach((el, i) => {
  el.classList.add('fade-in-up');
  el.style.transitionDelay = (i * 40) + 'ms';
  observer.observe(el);
});