/* ============================================================
   TEMA GELAP / TERANG
   File ini dimuat di <head> TANPA defer, supaya tema sudah
   ditetapkan sebelum halaman digambar. Kalau dimuat belakangan,
   pengunjung akan melihat kedipan putih sesaat.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'zte-theme';
  var root = document.documentElement;

  /* Tandai bahwa JavaScript aktif. CSS memakai .no-js sebagai
     jaring pengaman agar konten tetap terlihat bila skrip gagal. */
  root.classList.remove('no-js');

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null; /* mode penyamaran / cookie diblokir */
    }
  }

  function save(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* diabaikan — tema tetap berlaku untuk sesi ini */
    }
  }

  function systemPrefersLight() {
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  /* Terapkan pilihan tersimpan sesegera mungkin.
     Tanpa pilihan tersimpan, atribut sengaja dibiarkan kosong agar
     media query prefers-color-scheme di CSS yang mengambil alih. */
  var saved = stored();
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }

  function current() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return systemPrefersLight() ? 'light' : 'dark';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    save(theme);
    updateButtons(theme);
    /* Selaraskan warna bilah alamat browser di ponsel */
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f9fc' : '#0b1017');
  }

  function updateButtons(theme) {
    var next = theme === 'light' ? 'gelap' : 'terang';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', 'Ganti ke mode ' + next);
      btn.setAttribute('title', 'Ganti ke mode ' + next);
    });
  }

  /* Satu pendengar di tingkat dokumen, bukan pada tiap tombol.
     Tombol tema dibuat belakangan oleh render.js, jadi pendekatan
     ini bekerja tanpa bergantung pada urutan pemuatan skrip. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    apply(current() === 'light' ? 'dark' : 'light');
  });

  /* Ikuti perubahan tema sistem selama pengunjung belum memilih sendiri */
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function () {
    if (!stored()) updateButtons(current());
  });

  /* Perbarui label begitu tombolnya ada di halaman */
  document.addEventListener('zte:rendered', function () {
    updateButtons(current());
  });
})();
