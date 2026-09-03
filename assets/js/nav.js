/* ============================================================
   NAVIGASI — menyempit saat scroll, menu mobile, bilah progres
   Dijalankan setelah render.js selesai membuat markup navigasi.
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var nav = document.querySelector('[data-nav]');
    var burger = document.querySelector('[data-burger]');
    var drawer = document.querySelector('[data-drawer]');
    var progress = document.querySelector('[data-scroll-progress]');

    /* ---------- navbar menyempit ---------- */
    var ticking = false;

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;

      if (nav) nav.classList.toggle('is-scrolled', y > 24);

      if (progress) {
        var tinggi = document.documentElement.scrollHeight - window.innerHeight;
        var rasio = tinggi > 0 ? Math.min(y / tinggi, 1) : 0;
        progress.style.transform = 'scaleX(' + rasio + ')';
      }

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(onScroll);
        }
      },
      { passive: true }
    );

    onScroll();

    /* ---------- menu mobile ---------- */
    function tutupMenu() {
      if (!burger || !drawer) return;
      burger.classList.remove('is-open');
      drawer.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Buka menu');
      document.body.style.overflow = '';
    }

    if (burger && drawer) {
      burger.addEventListener('click', function () {
        var buka = !drawer.classList.contains('is-open');
        burger.classList.toggle('is-open', buka);
        drawer.classList.toggle('is-open', buka);
        burger.setAttribute('aria-expanded', String(buka));
        burger.setAttribute('aria-label', buka ? 'Tutup menu' : 'Buka menu');
        document.body.style.overflow = buka ? 'hidden' : '';
      });

      /* Menutup menu setelah tautan dipilih */
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', tutupMenu);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
          tutupMenu();
          burger.focus();
        }
      });

      /* Kembali ke tampilan desktop saat layar dilebarkan */
      window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
        if (e.matches) tutupMenu();
      });
    }

    /* ---------- tautan dalam halaman ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        var atas = target.getBoundingClientRect().top + window.scrollY - 90;

        if (window.lenis) {
          window.lenis.scrollTo(atas);
        } else {
          window.scrollTo({
            top: atas,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'auto'
              : 'smooth'
          });
        }
      });
    });
  }

  document.addEventListener('zte:rendered', init);
})();
