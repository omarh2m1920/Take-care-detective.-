/* No build step, tracking, or backend. All interactions stay on this device. */
const proofToggle = document.querySelector('#proof-toggle');
proofToggle.addEventListener('click', () => {
  const open = proofToggle.getAttribute('aria-expanded') !== 'true';
  proofToggle.setAttribute('aria-expanded', String(open));
  document.querySelector('#baby-proof').hidden = !open;
  document.querySelector('#evidence-cover').hidden = open;
  proofToggle.innerHTML = open ? 'Evidence accepted. Memory still suspicious. <span>✓</span>' : 'Examine the very convincing evidence <span>↗</span>';
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelector('#luck-button').addEventListener('click', () => {
  document.querySelector('#luck-status').textContent = 'Luck received. Taste in perfume still under investigation. 🫡😂';
  if (reducedMotion.matches) return;
  const layer = document.querySelector('#confetti');
  layer.replaceChildren();
  for (let i = 0; i < 28; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetto'; bit.textContent = ['✦', '♡', '✧', '✿'][i % 4];
    bit.style.left = Math.random() * 100 + '%';
    bit.style.color = ['#c56844', '#779064', '#c7a15d'][i % 3];
    bit.style.setProperty('--sway', (Math.random() - .5) * 220 + 'px');
    bit.style.animationDelay = Math.random() * .5 + 's';
    bit.addEventListener('animationend', () => bit.remove());
    layer.append(bit);
  }
});
const progress = document.querySelector('.reading-progress');
function updateProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (total > 0 ? scrollY / total * 100 : 100) + '%';
}
addEventListener('scroll', updateProgress, {passive:true});
addEventListener('resize', updateProgress);
updateProgress();
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('js-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}
  }), {threshold:.06});
  document.querySelectorAll('.chapter-copy,.honest,.goodbye').forEach(el => {el.classList.add('reveal');observer.observe(el);});
}
