/* ===============================================
   CURSOR PERSONALIZADO DE VALERY
   La gota SVG sigue el mouse vía mousemove.
   Al hacer clic se añade la clase .clicking
   que le da el glow morado por 300ms.
   Se desactiva si prefers-reduced-motion está on.
=============================================== */
const drop = document.getElementById('cursor-drop');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && drop) {
  document.addEventListener('mousemove', e => {
    drop.style.left = e.clientX + 'px';
    drop.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mousedown', () => {
    drop.classList.add('clicking');
    setTimeout(() => drop.classList.remove('clicking'), 300);
  });
}

/* ===============================================
   TOGGLE TEMA CLARO / OSCURO
   Alterna data-theme entre "dark" y "light".
   Persiste en localStorage.
=============================================== */
function applyTheme(theme) {
  const root  = document.documentElement;
  const label = document.getElementById('themeLabel');
  const btn   = document.getElementById('themeToggle');

  // Si estaba en alto contraste, salimos de él
  if (theme !== 'high-contrast') {
    root.setAttribute('data-theme', theme);
    document.getElementById('contrastToggle').setAttribute('aria-pressed', 'false');
    document.getElementById('contrastToggle').textContent = '⬛ Alto contraste';
  }

  if (label) label.textContent = theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro';
  if (btn)   btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  // Si está en alto contraste, volvemos al oscuro primero
  const base = (current === 'high-contrast') ? 'dark' : current;
  const next = base === 'dark' ? 'light' : 'dark';
  localStorage.setItem('iot-theme', next);
  applyTheme(next);
}

/* ===============================================
   INCLUSIÓN: ALTO CONTRASTE (WCAG 1.4.3 / 1.4.11)
   Activa un tercer tema con fondo negro,
   texto blanco/amarillo y bordes amarillos gruesos.
   Cumple ratio de contraste ≥ 4.5:1 en todo el texto.
   aria-pressed refleja el estado para lectores de pantalla.
=============================================== */
function toggleContrast() {
  const root    = document.documentElement;
  const current = root.getAttribute('data-theme');
  const btn     = document.getElementById('contrastToggle');

  if (current === 'high-contrast') {
    // Desactivar: volver al tema guardado
    const saved = localStorage.getItem('iot-theme') || 'dark';
    root.setAttribute('data-theme', saved);
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = '<span aria-hidden="true">⬛</span> <span>Alto contraste</span>';
    localStorage.setItem('iot-contrast', 'off');
  } else {
    root.setAttribute('data-theme', 'high-contrast');
    btn.setAttribute('aria-pressed', 'true');
    btn.innerHTML = '<span aria-hidden="true">⬜</span> <span>Contraste normal</span>';
    localStorage.setItem('iot-contrast', 'on');
  }
}

// Restaurar preferencias al cargar
(function init() {
  const savedContrast = localStorage.getItem('iot-contrast');
  if (savedContrast === 'on') {
    document.documentElement.setAttribute('data-theme', 'high-contrast');
    const btn = document.getElementById('contrastToggle');
    btn.setAttribute('aria-pressed', 'true');
    btn.innerHTML = '<span aria-hidden="true">⬜</span> <span>Contraste normal</span>';
  } else {
    const savedTheme = localStorage.getItem('iot-theme');
    if (savedTheme) applyTheme(savedTheme);
  }
})();
