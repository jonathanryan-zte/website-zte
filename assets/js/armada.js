/* ============================================================
   PENYARINGAN ARMADA
   Menyembunyikan kartu di luar kategori terpilih, dengan
   transisi lembut agar perubahan tidak terasa mengejut.
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var chips = document.querySelectorAll('[data-filter]');
    var grid = document.querySelector('[data-armada-grid]');
    var kosong = document.querySelector('[data-armada-kosong]');
    if (!chips.length || !grid) return;

    var kartu = grid.querySelectorAll('[data-kategori]');
    var hemat = window.ZTE && window.ZTE.hemat ? window.ZTE.hemat() : false;

    function saring(kategori) {
      var terlihat = 0;

      kartu.forEach(function (k) {
        var cocok = kategori === 'semua' || k.getAttribute('data-kategori') === kategori;
        if (cocok) terlihat++;

        if (hemat) {
          k.classList.toggle('is-hidden', !cocok);
          return;
        }

        if (cocok) {
          k.classList.remove('is-hidden');
          /* Mulai dari keadaan tersembunyi lalu munculkan di frame berikutnya */
          k.style.opacity = '0';
          k.style.transform = 'scale(.96)';
          requestAnimationFrame(function () {
            k.style.opacity = '';
            k.style.transform = '';
          });
        } else {
          k.classList.add('is-hidden');
        }
      });

      if (kosong) kosong.hidden = terlihat > 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          var aktif = c === chip;
          c.classList.toggle('is-active', aktif);
          c.setAttribute('aria-pressed', String(aktif));
        });
        saring(chip.getAttribute('data-filter'));
      });
    });
  }

  document.addEventListener('zte:rendered', init);
})();
