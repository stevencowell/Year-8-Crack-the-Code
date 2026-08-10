(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (nav && !nav.querySelector('a[href$="busy-work.html"]')) {
    const activitiesLink = [...nav.querySelectorAll('a')].find(link => /activities\.html$/.test(link.getAttribute('href') || ''));
    const busyLink = document.createElement('a');
    busyLink.href = location.pathname.includes('/modules/') ? '../busy-work.html' : 'busy-work.html';
    busyLink.textContent = 'Busy Work';
    if (location.pathname.endsWith('/busy-work.html')) busyLink.setAttribute('aria-current','page');
    activitiesLink?.after(busyLink);
  }
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
    const busy = Object.keys(localStorage).filter(k => /^crackthecode:busy:completed:\d+$/.test(k) && localStorage.getItem(k)==='true').length;
    const pct = Math.min(100, Math.round(((responses + checked + activities + busy) / 360) * 100));
    homeProgress.textContent = `${pct}%`;
    document.querySelector('[data-home-progress-bar]').style.width = `${pct}%`;
  }
})();
