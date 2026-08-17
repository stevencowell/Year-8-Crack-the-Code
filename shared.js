(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const script = document.currentScript;
  if (nav) {
    [...nav.querySelectorAll('a')].forEach(link => {
      if (/^Busy Work(?:sheets)?$/i.test(link.textContent.trim())) link.textContent = 'Puzzles';
    });
    if (![...nav.querySelectorAll('a')].some(link => link.textContent.trim() === 'Main Menu')) {
      const mainMenu = document.createElement('a');
      mainMenu.href = 'https://stevencowell.github.io/Main-Page/';
      mainMenu.textContent = 'Main Menu';
      mainMenu.dataset.mainMenuLink = '';
      nav.append(mainMenu);
    }
    if (!document.querySelector('link[data-course-family-nav-styles]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = new URL('course-family-navigation.css?v=20260818', script.src).href;
      stylesheet.dataset.courseFamilyNavStyles = '';
      document.head.append(stylesheet);
    }
    const header = nav.closest('.site-header');
    const inner = header && header.querySelector('.nav-wrap');
    const brand = header && header.querySelector('.brand');
    const mark = brand && brand.querySelector('.brand-mark');
    if (header && inner && brand) {
      header.className = 'course-family-nav screen-only';
      inner.className = 'course-family-nav__inner';
      brand.className = 'course-family-nav__brand';
      if (mark) mark.className = 'course-family-nav__mark';
      nav.className = 'course-family-nav__links';
      nav.setAttribute('aria-label', 'Course navigation');
      toggle?.remove();
      document.documentElement.classList.add('has-course-family-nav');
    }
  }
  if (nav && !nav.querySelector('a[href$="busy-work.html"]')) {
    const activitiesLink = [...nav.querySelectorAll('a')].find(link => /activities\.html$/.test(link.getAttribute('href') || ''));
    const busyLink = document.createElement('a');
    busyLink.href = location.pathname.includes('/modules/') ? '../busy-work.html' : 'busy-work.html';
    busyLink.textContent = 'Puzzles';
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
