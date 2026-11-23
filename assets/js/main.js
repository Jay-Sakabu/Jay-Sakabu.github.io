(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Theme toggle ---- */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- Nav: scrolled state + mobile menu ---- */
  var nav = document.querySelector('[data-nav]');
  var navBtn = document.querySelector('[data-nav-toggle]');
  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    navBtn.setAttribute('aria-expanded', String(open));
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (nav && navBtn) {
    navBtn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); navBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) setMenu(false);
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    // stagger siblings that enter together
    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--delay', (i++ * 0.08) + 's');
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Typing effect ---- */
  var typed = document.querySelector('[data-typed]');
  if (typed && !reduceMotion) {
    var words;
    try { words = JSON.parse(typed.getAttribute('data-typed')); } catch (e) { words = []; }
    if (words.length > 1) {
      var w = 0, c = words[0].length, deleting = true;
      (function tick() {
        var word = words[w];
        c += deleting ? -1 : 1;
        typed.textContent = word.slice(0, c);
        var wait = deleting ? 45 : 85;
        if (!deleting && c === word.length) { deleting = true; wait = 2000; }
        else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; wait = 300; }
        setTimeout(tick, wait);
      })();
    }
  }

  /* ---- Pointer effects (desktop only) ---- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-spotlight]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    var tilt = document.querySelector('[data-tilt]');
    var win = tilt && tilt.querySelector('.code-window');
    if (win) {
      tilt.addEventListener('pointermove', function (e) {
        var r = tilt.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        win.style.setProperty('--ry', (x * 14) + 'deg');
        win.style.setProperty('--rx', (-y * 10) + 'deg');
      });
      tilt.addEventListener('pointerleave', function () {
        win.style.removeProperty('--ry');
        win.style.removeProperty('--rx');
      });
    }
  }
})();
