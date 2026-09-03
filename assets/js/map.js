/* ============================================================
   PETA JARINGAN RUTE
   Menggambar Pulau Jawa sebagai SVG yang disederhanakan — bukan
   peta geografis presisi, tapi memakai proyeksi bujur/lintang yang
   sama dengan koordinat kota, sehingga setiap titik jatuh pada
   posisi yang benar. Isi petanya berasal dari data rute nyata.
   ============================================================ */
(function () {
  'use strict';

  var VB_W = 100;
  var VB_H = 31.8; /* Pulau Jawa memanjang barat–timur, jadi bingkainya lebar */

  /* Siluet Pulau Jawa.
     Digambar dengan proyeksi yang sama persis seperti koordinat kota
     di site-data.js:
       x = (bujur  - 104,5) / 11,0 × 100
       y = (-5,5 - lintang) / 3,5 × 31,8
     Karena itu setiap titik kota jatuh tepat pada daratannya.
     Bentuk sengaja disederhanakan — selaras dengan gaya brand dan
     tidak memerlukan data peta dari luar. */
  var PULAU = [
    /* Jawa — pantai utara dari barat ke timur, lalu pantai selatan kembali */
    'M6.8 11.4 L13.2 3.8 L14.5 3.6 L21.4 5.5 L36.8 10.9 L53.8 13.2 ' +
      'L62.3 10.9 L68.7 12.7 L75.0 15.5 L86.4 20.0 L90.0 23.6 ' +
      'L89.1 27.7 L82.7 27.3 L74.5 26.4 L60.0 25.0 L40.9 20.5 ' +
      'L37.7 20.0 L18.6 14.1 L7.3 12.3 Z',
    /* Madura */
    'M75.5 11.2 L80.0 10.4 L85.0 10.2 L86.2 11.0 L80.5 12.4 L76.0 12.6 Z',
    /* Bali — konteks tepi timur */
    'M91.5 24.8 L95.5 24.6 L96.0 26.6 L92.0 26.8 Z',
    /* Ujung selatan Lampung — konteks tepi barat */
    'M0 0 L5.5 0 L7.6 4.2 L4.2 7.6 L0 5.6 Z'
  ];

  function init() {
    var host = document.querySelector('[data-map]');
    if (!host || !window.SITE) return;

    var S = window.SITE;
    var kota = S.kota || [];
    var rute = S.rute || [];

    var byName = {};
    kota.forEach(function (k) {
      byName[k.nama] = k;
    });

    /* ---------- lapisan SVG: pulau + garis rute ---------- */

    var pulauHtml = PULAU.map(function (d) {
      return '<path d="' + d + '" fill="url(#mapFill)" stroke="url(#mapStroke)" stroke-width="0.15"/>';
    }).join('');

    var ruteHtml = rute
      .map(function (r) {
        var a = byName[r[0]];
        var b = byName[r[1]];
        if (!a || !b) return '';

        var x1 = (a.x / 100) * VB_W;
        var y1 = (a.y / 100) * VB_H;
        var x2 = (b.x / 100) * VB_W;
        var y2 = (b.y / 100) * VB_H;

        /* Lengkungkan garis agar terasa seperti jalur, bukan garis lurus kaku */
        var mx = (x1 + x2) / 2;
        var my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.06 - 0.6;

        return (
          '<path class="route" data-a="' + a.nama + '" data-b="' + b.nama + '" ' +
          'd="M' + x1 + ' ' + y1 + ' Q' + mx + ' ' + my + ' ' + x2 + ' ' + y2 + '" ' +
          'fill="none" stroke="url(#routeGrad)" stroke-width="0.3" stroke-linecap="round"/>'
        );
      })
      .join('');

    host.insertAdjacentHTML(
      'afterbegin',
      '<svg class="route-line map__svg" viewBox="0 0 ' + VB_W + ' ' + VB_H + '" aria-hidden="true">' +
        '<defs>' +
        /* Daratan sengaja netral: geografi hanyalah konteks, dan warna
           brand disimpan untuk garis rute supaya jaringannya menonjol. */
        '<linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="var(--text)" stop-opacity=".08"/>' +
        '<stop offset="100%" stop-color="var(--text)" stop-opacity=".05"/>' +
        '</linearGradient>' +
        '<linearGradient id="mapStroke" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="var(--text)" stop-opacity=".22"/>' +
        '<stop offset="100%" stop-color="var(--text)" stop-opacity=".16"/>' +
        '</linearGradient>' +
        '<linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="var(--accent-2)"/>' +
        '<stop offset="100%" stop-color="var(--accent)"/>' +
        '</linearGradient>' +
        '</defs>' +
        '<g class="map__islands">' + pulauHtml + '</g>' +
        '<g class="map__routes">' + ruteHtml + '</g>' +
        '</svg>'
    );

    /* ---------- titik kota ---------- */

    kota.forEach(function (k) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'city' + (k.hub ? ' city--hub' : '') + (k.labelAtas ? ' city--label-atas' : '');
      btn.style.left = k.x + '%';
      btn.style.top = k.y + '%';
      btn.setAttribute('data-kota', k.nama);
      btn.setAttribute('aria-label', k.nama + ' — estimasi ' + k.estimasi);
      btn.innerHTML = '<span class="city__label">' + k.nama + '</span>';
      host.appendChild(btn);
    });

    /* ---------- panel keterangan ---------- */

    var panel = document.querySelector('[data-map-panel]');
    var elNama = document.querySelector('[data-map-nama]');
    var elPulau = document.querySelector('[data-map-pulau]');
    var elEta = document.querySelector('[data-map-eta]');
    var elWa = document.querySelector('[data-map-wa]');

    /* 'sorot' dimatikan untuk tampilan awal: panel sudah terisi, tapi
       seluruh jaringan tetap terlihat utuh. Kalau langsung meredupkan,
       kesan pertama peta justru hampir kosong — 55 dari 56 rute pudar
       sebelum pengunjung sempat berinteraksi. */
    function pilih(nama, sorot) {
      var k = byName[nama];
      if (!k) return;

      host.querySelectorAll('.city').forEach(function (c) {
        var on = sorot !== false && c.getAttribute('data-kota') === nama;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });

      /* Redupkan rute yang tidak menyentuh kota terpilih */
      host.querySelectorAll('.route').forEach(function (r) {
        var terkait = r.getAttribute('data-a') === nama || r.getAttribute('data-b') === nama;
        r.classList.toggle('is-dim', sorot !== false && !terkait);
        r.classList.toggle('is-on', sorot !== false && terkait);
      });

      if (elNama) elNama.textContent = k.nama;
      if (elPulau) elPulau.textContent = k.pulau;
      if (elEta) elEta.textContent = k.estimasi;
      if (elWa && window.waLink) {
        elWa.setAttribute(
          'href',
          window.waLink('Halo, saya ingin mengirim barang ke ' + k.nama + '. Mohon informasi tarifnya.')
        );
        elWa.setAttribute('target', '_blank');
        elWa.setAttribute('rel', 'noopener noreferrer');
        elWa.textContent = 'Kirim ke ' + k.nama;
      }

      if (panel) {
        /* Kedipan halus supaya perubahan isi panel terasa */
        panel.classList.remove('is-updated');
        void panel.offsetWidth;
        panel.classList.add('is-updated');
      }
    }

    host.querySelectorAll('.city').forEach(function (c) {
      c.addEventListener('click', function () {
        pilih(c.getAttribute('data-kota'));
      });
      c.addEventListener('focus', function () {
        pilih(c.getAttribute('data-kota'));
      });
    });

    /* Isi panel dengan kota tujuan tersibuk, tanpa meredupkan apa pun —
       jaringan lengkap dulu yang dilihat pengunjung. */
    var awal = byName['Jakarta'] || kota.filter(function (k) {
      return k.hub;
    })[0] || kota[0];
    if (awal) pilih(awal.nama, false);

    /* Peta baru ada setelah motion.js berjalan, jadi minta
       animasi garisnya dipasang sekarang. */
    if (window.ZTE && window.ZTE.route) window.ZTE.route();
  }

  document.addEventListener('zte:rendered', init);
})();
