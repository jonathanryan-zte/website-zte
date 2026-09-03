/* ============================================================
   FORMULIR PENAWARAN
   Isian disusun menjadi satu pesan WhatsApp yang rapi. Tidak ada
   data yang dikirim ke server mana pun — pengunjung tetap
   memegang kendali sebelum menekan kirim di WhatsApp.
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var form = document.querySelector('[data-form-penawaran]');
    if (!form || !window.SITE) return;

    var WAJIB = {
      'f-nama': 'Nama wajib diisi.',
      'f-telepon': 'Nomor WhatsApp wajib diisi.',
      'f-asal': 'Kota asal wajib diisi.',
      'f-tujuan': 'Kota tujuan wajib diisi.'
    };

    function pesanError(id, nilai) {
      if (!nilai) return WAJIB[id];

      if (id === 'f-telepon') {
        var angka = nilai.replace(/[^0-9]/g, '');
        if (angka.length < 9) return 'Nomor terlalu pendek — mohon periksa kembali.';
      }

      if (id === 'f-nama' && nilai.length < 2) {
        return 'Mohon tuliskan nama lengkap Anda.';
      }

      return '';
    }

    function tampilkanError(id, teks) {
      var input = document.getElementById(id);
      var wadah = document.querySelector('[data-error-for="' + id + '"]');
      if (!input) return;

      input.setAttribute('aria-invalid', teks ? 'true' : 'false');
      if (wadah) wadah.textContent = teks;
    }

    /* Pesan error hilang begitu pengunjung memperbaikinya */
    Object.keys(WAJIB).forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') {
          tampilkanError(id, pesanError(id, input.value.trim()));
        }
      });
    });

    function nilai(id) {
      var n = document.getElementById(id);
      return n ? n.value.trim() : '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var gagalPertama = null;

      Object.keys(WAJIB).forEach(function (id) {
        var teks = pesanError(id, nilai(id));
        tampilkanError(id, teks);
        if (teks && !gagalPertama) gagalPertama = id;
      });

      if (gagalPertama) {
        var n = document.getElementById(gagalPertama);
        if (n) n.focus();
        return;
      }

      /* Susun pesan — baris kosong dilewati agar tidak berantakan */
      var baris = [
        'Halo ' + window.SITE.nama + ', saya ingin meminta penawaran pengiriman.',
        '',
        'Nama: ' + nilai('f-nama'),
        'WhatsApp: ' + nilai('f-telepon'),
        nilai('f-layanan') ? 'Layanan: ' + nilai('f-layanan') : '',
        '',
        'Asal: ' + nilai('f-asal'),
        'Tujuan: ' + nilai('f-tujuan'),
        nilai('f-barang') ? 'Jenis barang: ' + nilai('f-barang') : '',
        nilai('f-berat') ? 'Berat/volume: ' + nilai('f-berat') : '',
        nilai('f-pesan') ? '' : '',
        nilai('f-pesan') ? 'Keterangan: ' + nilai('f-pesan') : '',
        '',
        'Mohon informasi tarif dan jadwalnya. Terima kasih.'
      ];

      var pesan = baris
        .filter(function (b, i) {
          /* buang baris kosong berturut-turut */
          return b !== '' || baris[i - 1] !== '';
        })
        .join('\n');

      window.open(window.waLink(pesan), '_blank', 'noopener');
    });
  }

  document.addEventListener('zte:rendered', init);
})();
