/* ---------- Dropdown mobile ---------- */
const mobileToggle = document.getElementById('mobileToggle');
const mobileDropdown = document.getElementById('mobileDropdown');

if (mobileToggle && mobileDropdown) {
  function openMenu() {
    mobileDropdown.classList.add('open');
    mobileDropdown.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.classList.add('open');
  }
  function closeMenu() {
    mobileDropdown.classList.remove('open');
    mobileDropdown.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('open');
  }
  function toggleMenu() {
    if (mobileDropdown.classList.contains('open')) closeMenu();
    else openMenu();
  }

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // fecha ao clicar fora
  document.addEventListener('click', (ev) => {
    if (!mobileDropdown.classList.contains('open')) return;
    const target = ev.target;
    if (mobileToggle.contains(target) || mobileDropdown.contains(target)) return;
    closeMenu();
  });

  // fecha com ESC
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && mobileDropdown.classList.contains('open')) {
      closeMenu();
      mobileToggle.focus();
    }
  });

  // fecha ao clicar em um link do dropdown
  mobileDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });
}