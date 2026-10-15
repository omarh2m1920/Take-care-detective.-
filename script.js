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

// Browsers decide whether audible autoplay is allowed. A first gesture is the fallback.
const music = document.querySelector('#background-music');
const musicToggle = document.querySelector('#music-toggle');
const musicState = document.querySelector('#music-state');
const musicIcon = document.querySelector('#music-icon');
let musicStarted = false;
let musicUserPaused = false;
music.volume = 0.35;
function updateMusicControl() {
  const playing = !music.paused;
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  musicIcon.textContent = playing ? 'Ⅱ' : '▶';
  musicState.textContent = playing ? 'Frank Ocean · Playing' : 'Frank Ocean · Tap to play';
}
async function startMusic() {
  try { await music.play(); }
  catch (error) {
    if (!musicUserPaused && music.paused) {
      musicState.textContent = error.name === 'NotAllowedError' ? 'Frank Ocean · Tap to play' : 'Couldn’t play · Tap to retry';
    }
  }
}
music.addEventListener('play', () => { musicStarted = true; updateMusicControl(); });
music.addEventListener('pause', updateMusicControl);
music.addEventListener('error', () => { musicState.textContent = 'Audio unavailable · Try refreshing'; });
musicToggle.addEventListener('click', () => {
  if (music.paused) { musicUserPaused = false; startMusic(); }
  else { musicUserPaused = true; music.pause(); }
});
function startOnFirstGesture(event) {
  if (event.target instanceof Element && event.target.closest('#music-toggle')) return;
  if (!musicStarted && !musicUserPaused) startMusic();
}
document.addEventListener('pointerdown', startOnFirstGesture, {passive:true});
document.addEventListener('keydown', startOnFirstGesture);
startMusic();
