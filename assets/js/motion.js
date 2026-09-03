/* ============================================================
   ANIMASI
   Ditulis tanpa pustaka luar — semua efek di bawah ini cukup
   ditangani IntersectionObserver dan requestAnimationFrame.
   Hanya transform & opacity yang digerakkan agar tetap 60fps.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 767px)');

  function hemat() {
    return reduced.matches;
  }

  /* ----------------------------------------------------------
     1. SCROLL REVEAL
     ---------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (hemat() || !('IntersectionObserver' in window)) {
      items.forEach(function (n) {
        n.classList.add('is-visible');
      });
      return;
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-visible');
          obs.unobserve(e.target); /* sekali tampil, selesai */
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach(function (n) {
      obs.observe(n);
    });
  }

  /* ----------------------------------------------------------
     2. JUDUL YANG MUNCUL PER KATA
     ---------------------------------------------------------- */
  function initSplit() {
    document.querySelectorAll('[data-split]').forEach(function (node) {
      if (node.dataset.splitDone) return;
      node.dataset.splitDone = '1';

      if (hemat()) return;

      var kata = node.textContent.trim().split(/\s+/);
      node.textContent = '';

      kata.forEach(function (w, i) {
        var wrap = document.createElement('span');
        wrap.className = 'split-line';
        var inner = document.createElement('span');
        inner.className = 'split-word';
        inner.style.setProperty('--word-delay', i * 0.06 + 's');
        inner.textContent = w;
        wrap.appendChild(inner);
        node.appendChild(wrap);
        if (i < kata.length - 1) node.appendChild(document.createTextNode(' '));
      });
    });
  }

  /* ----------------------------------------------------------
     3. ANGKA YANG BERJALAN NAIK
     ---------------------------------------------------------- */
  function animasiAngka(node) {
    var target = parseFloat(node.getAttribute('data-count')) || 0;
    var durasi = 1600;
    var mulai = null;

    /* Angka tahun tidak boleh diberi pemisah ribuan — 2026, bukan 2.026 */
    var polos = node.hasAttribute('data-count-polos');
    function tulis(n) {
      node.textContent = polos ? String(n) : n.toLocaleString('id-ID');
    }

    if (hemat()) {
      tulis(target);
      return;
    }

    function langkah(waktu) {
      if (mulai === null) mulai = waktu;
      var p = Math.min((waktu - mulai) / durasi, 1);
      /* ease-out kubik — cepat di awal, melambat di akhir */
      var e = 1 - Math.pow(1 - p, 3);
      tulis(Math.round(target * e));
      if (p < 1) requestAnimationFrame(langkah);
    }

    requestAnimationFrame(langkah);
  }

  function initCounters() {
    var nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(animasiAngka);
      return;
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          animasiAngka(e.target);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.5 }
    );

    nodes.forEach(function (n) {
      obs.observe(n);
    });
  }

  /* ----------------------------------------------------------
     4. KARTU MIRING MENGIKUTI KURSOR
     Dimatikan di ponsel — tidak ada kursor, dan menghemat baterai.
     ---------------------------------------------------------- */
  function initTilt() {
    if (hemat() || mobile.matches) return;

    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      var rect = null;
      var raf = null;

      function gerak(e) {
        if (!rect) rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        /* Sorot lembut mengikuti kursor */
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');

        if (raf) return;
        raf = requestAnimationFrame(function () {
          var rx = ((y / rect.height) - 0.5) * -7;
          var ry = ((x / rect.width) - 0.5) * 7;
          card.style.transform =
            'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-5px)';
          raf = null;
        });
      }

      function keluar() {
        rect = null;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
        card.style.transform = '';
      }

      card.addEventListener('mouseenter', function () {
        rect = card.getBoundingClientRect();
      });
      card.addEventListener('mousemove', gerak);
      card.addEventListener('mouseleave', keluar);
      window.addEventListener('scroll', function () {
        rect = null;
      }, { passive: true });
    });
  }

  /* ----------------------------------------------------------
     5. TOMBOL MAGNETIS
     ---------------------------------------------------------- */
  function initMagnetic() {
    if (hemat() || mobile.matches) return;

    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.24;
        var y = (e.clientY - r.top - r.height / 2) * 0.24;
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     6. PARALLAX
     data-parallax berisi kecepatan: negatif naik, positif turun
     ---------------------------------------------------------- */
  function initParallax() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!nodes.length || hemat() || mobile.matches) return;

    var ticking = false;

    function perbarui() {
      var tengahLayar = window.innerHeight / 2;

      nodes.forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var kecepatan = parseFloat(n.getAttribute('data-parallax')) || 0.1;
        var jarak = r.top + r.height / 2 - tengahLayar;
        n.style.transform = 'translate3d(0,' + jarak * kecepatan + 'px,0)';
      });

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(perbarui);
        }
      },
      { passive: true }
    );

    perbarui();
  }

  /* ----------------------------------------------------------
     7. GARIS RUTE YANG MENGGAMBAR DIRINYA SENDIRI
     ---------------------------------------------------------- */
  function initRoute() {
    var svgs = document.querySelectorAll('.route-line');
    if (!svgs.length) return;

    svgs.forEach(function (svg) {
      /* Ukur panjang tiap jalur agar dasharray-nya pas */
      svg.querySelectorAll('path, line').forEach(function (p) {
        if (typeof p.getTotalLength !== 'function') return;
        var len = p.getTotalLength();
        if (!len) return;
        p.style.setProperty('--route-len', len);
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = hemat() ? 0 : len;
      });

      if (hemat() || !('IntersectionObserver' in window)) {
        svg.classList.add('is-drawn');
        return;
      }

      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('path, line').forEach(function (p, i) {
              p.style.transition = 'stroke-dashoffset 1.6s ' + (i * 0.12) + 's cubic-bezier(.16,1,.3,1)';
              p.style.strokeDashoffset = 0;
            });
            obs.unobserve(e.target);
          });
        },
        { threshold: 0.25 }
      );

      obs.observe(svg);
    });
  }

  /* ----------------------------------------------------------
     8. SMOOTH SCROLL (opsional)
     Dipakai hanya bila Lenis berhasil dimuat. Kalau gagal —
     luring, CDN diblokir — scroll bawaan browser tetap jalan.
     ---------------------------------------------------------- */
  function initSmooth() {
    if (hemat() || typeof window.Lenis !== 'function') return;

    try {
      var lenis = new window.Lenis({
        duration: 1.05,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        smoothWheel: true,
        syncTouch: false /* biarkan sentuhan ponsel memakai scroll asli */
      });

      window.lenis = lenis;

      function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      /* diabaikan — scroll bawaan sudah cukup */
    }
  }

  /* ---------- jalankan ---------- */
  function init() {
    initSplit();
    initReveal();
    initCounters();
    initTilt();
    initMagnetic();
    initParallax();
    initRoute();
    initSmooth();
  }

  document.addEventListener('zte:rendered', init);

  /* Dibuka agar bagian yang disisipkan belakangan — misalnya peta —
     bisa meminta animasinya dipasang ulang. */
  window.ZTE = {
    reveal: initReveal,
    route: initRoute,
    hemat: hemat
  };

  /* Terapkan ulang bila pengunjung mengubah preferensi gerak */
  reduced.addEventListener('change', function () {
    if (reduced.matches) {
      document.querySelectorAll('[data-reveal]').forEach(function (n) {
        n.classList.add('is-visible');
      });
      document.querySelectorAll('[data-tilt], .magnetic, [data-parallax]').forEach(function (n) {
        n.style.transform = '';
      });
    }
  });
})();
