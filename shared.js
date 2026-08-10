(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const homeProgress = document.querySelector('[data-home-progress]');
  if (homeProgress) {
    const responses = Object.keys(localStorage).filter(k => /^crackthecode:m\d+-response-/.test(k) && (localStorage.getItem(k)||'').trim().length >= 20).length;
    const checked = Object.keys(localStorage).filter(k => k.startsWith('crackthecode:check:')).filter(k => { try { return JSON.parse(localStorage.getItem(k) || '{}').correct; } catch (_) { return false; } }).length;
    const activities = new Set(Object.keys(localStorage).filter(k => k.startsWith('crackthecode:activity:') && (localStorage.getItem(k)||'').trim().length >= 20).map(k => k.match(/activity:(\d+):/)?.[1]).filter(Boolean)).size;
    const pct = Math.min(100, Math.round(((responses + checked + activities) / 340) * 100));
    homeProgress.textContent = `${pct}%`;
    document.querySelector('[data-home-progress-bar]').style.width = `${pct}%`;
  }
})();
