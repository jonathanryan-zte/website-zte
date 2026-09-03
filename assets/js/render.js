/* ============================================================
   RENDER — mengisi halaman dari window.SITE
   Navigasi, footer, dan blok berulang dibuat di sini supaya
   tidak perlu ditulis ulang di setiap file HTML.
   ============================================================ */
(function () {
  'use strict';

  var S = window.SITE;
  var I = window.ICON;
  if (!S) return;

  /* ---------- pembantu ---------- */

  function get(path) {
    return path.split('.').reduce(function (o, k) {
      return o == null ? undefined : o[k];
    }, S);
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function el(sel) {
    return document.querySelector(sel);
  }

  function slot(name) {
    return document.querySelector('[data-render="' + name + '"]');
  }

  function fill(name, html) {
    var node = slot(name);
    if (node) node.innerHTML = html;
  }

  /* Tautan WhatsApp dengan pesan siap kirim */
  window.waLink = function (pesan) {
    var teks = pesan || 'Halo ' + S.nama + ', saya ingin bertanya tentang layanan pengiriman.';
    return 'https://wa.me/' + S.kontak.whatsapp + '?text=' + encodeURIComponent(teks);
  };

  /* ---------- teks & tautan sederhana ---------- */

  function bindText() {
    document.querySelectorAll('[data-site]').forEach(function (node) {
      var v = get(node.getAttribute('data-site'));
      if (v != null) node.textContent = v;
    });

    document.querySelectorAll('[data-site-href]').forEach(function (node) {
      var v = get(node.getAttribute('data-site-href'));
      if (v != null) node.setAttribute('href', v);
    });

    document.querySelectorAll('[data-wa]').forEach(function (node) {
      node.setAttribute('href', window.waLink(node.getAttribute('data-wa') || ''));
    });

    document.querySelectorAll('[data-site-href-tel]').forEach(function (node) {
      node.setAttribute('href', 'tel:' + S.kontak.teleponDial);
    });

    document.querySelectorAll('[data-site-href-mail]').forEach(function (node) {
      node.setAttribute('href', 'mailto:' + S.kontak.email);
    });

    document.querySelectorAll('[data-year]').forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });
  }

  /* ---------- peta lokasi kantor ---------- */

  function renderMapsEmbed() {
    var host = document.querySelector('[data-maps-embed]');
    if (!host) return;
    var k = S.kontak;

    if (k.mapsEmbed) {
      host.innerHTML =
        '<iframe src="' + esc(k.mapsEmbed) + '" loading="lazy" ' +
        'referrerpolicy="no-referrer-when-downgrade" ' +
        'title="Peta lokasi kantor ' + esc(S.nama) + '"></iframe>';
      return;
    }

    /* Belum ada tautan sematan — tawarkan Google Maps biasa */
    host.innerHTML =
      '<div class="map-embed__kosong">' +
      I('mapPin') +
      '<p><strong>' + esc(k.alamat) + '</strong><br>' +
      esc(k.kota) + ', ' + esc(k.provinsi) + ' ' + esc(k.kodePos) + '</p>' +
      '<a class="btn btn--ghost btn--sm" href="' + esc(k.mapsLink) + '" ' +
      'target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>' +
      '</div>';
  }

  /* ---------- data terstruktur untuk mesin pencari ---------- */

  function renderSchema() {
    var k = S.kontak;

    var data = {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      name: S.nama,
      description: S.deskripsiSingkat,
      slogan: S.tagline,
      foundingDate: String(S.tahunBerdiri),
      telephone: k.teleponDial,
      email: k.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: k.alamat,
        addressLocality: k.kota,
        addressRegion: k.provinsi,
        postalCode: k.kodePos,
        addressCountry: 'ID'
      },
      areaServed: (S.kota || []).map(function (c) {
        return { '@type': 'City', name: c.nama };
      }),
      sameAs: Object.keys(S.sosial)
        .map(function (key) {
          return S.sosial[key];
        })
        .filter(Boolean)
    };

    var node = document.createElement('script');
    node.type = 'application/ld+json';
    node.textContent = JSON.stringify(data);
    document.head.appendChild(node);
  }

  /* ---------- navigasi ---------- */

  var HALAMAN = [
    { href: 'index.html', label: 'Beranda' },
    { href: 'tentang.html', label: 'Tentang Kami' },
    { href: 'armada.html', label: 'Armada' },
    { href: 'kontak.html', label: 'Kontak' }
  ];

  function halamanAktif() {
    var f = window.location.pathname.split('/').pop();
    return f === '' ? 'index.html' : f;
  }

  function renderNav() {
    var host = slot('nav');
    if (!host) return;
    var aktif = halamanAktif();

    var tautan = HALAMAN.map(function (p) {
      var on = p.href === aktif;
      return (
        '<a class="nav__link' +
        (on ? ' is-active' : '') +
        '" href="' +
        p.href +
        '"' +
        (on ? ' aria-current="page"' : '') +
        '>' +
        p.label +
        '</a>'
      );
    }).join('');

    var tautanDrawer = HALAMAN.map(function (p) {
      var on = p.href === aktif;
      return (
        '<a class="' + (on ? 'is-active' : '') + '" href="' + p.href + '"' +
        (on ? ' aria-current="page"' : '') + '>' + p.label + '</a>'
      );
    }).join('');

    host.innerHTML =
      '<div class="scroll-progress" data-scroll-progress></div>' +
      '<nav class="nav" data-nav aria-label="Navigasi utama">' +
      '<div class="container nav__inner">' +
      '<a class="nav__logo" href="index.html" aria-label="' + esc(S.nama) + ' — beranda">' +
      '<img src="assets/img/logo-mark.png" alt="" width="300" height="236">' +
      '<span class="nav__logo-text">' +
      '<span class="nav__logo-name">ZENITH</span>' +
      '<span class="nav__logo-sub">Trans Ekspedisi</span>' +
      '</span></a>' +
      '<div class="nav__links">' + tautan + '</div>' +
      '<div class="nav__actions">' +
      '<button class="theme-toggle" data-theme-toggle type="button" aria-label="Ganti mode tampilan">' +
      I('sun', 'theme-toggle__sun') + I('moon', 'theme-toggle__moon') +
      '</button>' +
      '<a class="btn btn--primary btn--sm nav__cta magnetic" data-wa="">Minta Penawaran</a>' +
      '<button class="nav__burger" data-burger type="button" aria-label="Buka menu" ' +
      'aria-expanded="false" aria-controls="menu-mobile">' +
      '<span></span><span></span><span></span></button>' +
      '</div></div></nav>' +
      '<div class="nav__drawer" id="menu-mobile" data-drawer>' + tautanDrawer +
      '<a class="btn btn--primary btn--block" style="margin-top:1.5rem" data-wa="">Minta Penawaran</a>' +
      '</div>';
  }

  /* ---------- footer ---------- */

  function renderFooter() {
    var host = slot('footer');
    if (!host) return;
    var k = S.kontak;

    var sosialHtml = Object.keys(S.sosial)
      .filter(function (key) {
        return S.sosial[key];
      })
      .map(function (key) {
        return (
          '<a href="' + esc(S.sosial[key]) + '" target="_blank" rel="noopener noreferrer" ' +
          'aria-label="' + key + '">' + I(key) + '</a>'
        );
      })
      .join('');

    var tautanHtml = HALAMAN.map(function (p) {
      return '<li><a href="' + p.href + '">' + p.label + '</a></li>';
    }).join('');

    var layananHtml = S.layanan
      .slice(0, 5)
      .map(function (l) {
        return '<li><a href="index.html#layanan">' + esc(l.judul) + '</a></li>';
      })
      .join('');

    host.innerHTML =
      '<footer class="footer"><div class="container">' +
      '<div class="footer__grid">' +
      '<div class="footer__brand">' +
      '<img class="thm-light" src="assets/img/logo-zenith.png" alt="' + esc(S.nama) + '" ' +
      'width="900" height="869" loading="lazy">' +
      '<img class="thm-dark" src="assets/img/logo-zenith-dark.png" alt="' + esc(S.nama) + '" ' +
      'width="900" height="869" loading="lazy">' +
      '<p>' + esc(S.deskripsiSingkat) + '</p>' +
      '</div>' +
      '<div><h4>Halaman</h4><ul>' + tautanHtml + '</ul></div>' +
      '<div><h4>Layanan</h4><ul>' + layananHtml + '</ul></div>' +
      '<div><h4>Hubungi Kami</h4><address>' +
      esc(k.alamat) + '<br>' + esc(k.kelurahan) + '<br>' +
      esc(k.kota) + ', ' + esc(k.provinsi) + ' ' + esc(k.kodePos) + '<br><br>' +
      '<a href="tel:' + esc(k.teleponDial) + '">' + esc(k.teleponTampil) + '</a><br>' +
      '<a href="mailto:' + esc(k.email) + '">' + esc(k.email) + '</a>' +
      '</address></div>' +
      '</div>' +
      '<div class="footer__bottom">' +
      '<span>&copy; <span data-year></span> ' + esc(S.nama) + '. Seluruh hak cipta dilindungi.</span>' +
      (sosialHtml ? '<div class="footer__social">' + sosialHtml + '</div>' : '') +
      '</div></div></footer>';
  }

  /* ---------- tombol WhatsApp mengambang ---------- */

  function renderWa() {
    var host = slot('wa');
    if (!host) return;
    host.innerHTML =
      '<div class="wa-float">' +
      '<a class="wa-float__btn" data-wa="" target="_blank" rel="noopener noreferrer" ' +
      'aria-label="Hubungi kami lewat WhatsApp">' + I('whatsapp') + '</a>' +
      '<span class="wa-float__label" aria-hidden="true">Chat WhatsApp</span>' +
      '</div>';
  }

  /* ---------- blok konten ---------- */

  function renderStatistik() {
    fill(
      'statistik',
      S.statistik
        .map(function (s, i) {
          return (
            '<div class="glass stat" data-reveal="up" style="--reveal-delay:' + i * 0.08 + 's">' +
            '<div class="stat__value"><span data-count="' + s.nilai + '"' +
            (s.polos ? ' data-count-polos' : '') + '>0</span>' +
            '<span class="stat__suffix">' + esc(s.akhiran) + '</span></div>' +
            '<div class="stat__label">' + esc(s.label) + '</div></div>'
          );
        })
        .join('')
    );
  }

  function kartu(item, i) {
    return (
      '<article class="glass card card--tilt" data-tilt data-reveal="up" ' +
      'style="--reveal-delay:' + (i % 3) * 0.1 + 's">' +
      '<div class="card__icon">' + I(item.ikon) + '</div>' +
      '<h3>' + esc(item.judul) + '</h3>' +
      '<p>' + esc(item.teks) + '</p></article>'
    );
  }

  function renderLayanan() {
    fill('layanan', S.layanan.map(kartu).join(''));
  }

  function renderKeunggulan() {
    fill(
      'keunggulan',
      S.keunggulan
        .map(function (item, i) {
          return (
            '<div class="benefit" data-reveal="up" style="--reveal-delay:' + (i % 3) * 0.08 + 's">' +
            '<div class="benefit__icon">' + I(item.ikon) + '</div>' +
            '<div><h4>' + esc(item.judul) + '</h4><p>' + esc(item.teks) + '</p></div></div>'
          );
        })
        .join('')
    );
  }

  function renderCaraKerja() {
    fill(
      'caraKerja',
      S.caraKerja
        .map(function (s, i) {
          return (
            '<li class="step" data-reveal="up" style="--reveal-delay:' + i * 0.12 + 's">' +
            '<div class="step__num">' + String(i + 1).padStart(2, '0') + '</div>' +
            '<h4>' + esc(s.judul) + '</h4><p>' + esc(s.teks) + '</p></li>'
          );
        })
        .join('')
    );
  }

  function renderMisi() {
    fill(
      'misi',
      S.misi
        .map(function (m) {
          return '<li>' + I('check', 'misi__check') + '<span>' + esc(m) + '</span></li>';
        })
        .join('')
    );
  }

  function renderSejarah() {
    fill(
      'sejarah',
      S.sejarah
        .map(function (s, i) {
          return (
            '<li class="timeline__item" data-reveal="right" style="--reveal-delay:' + i * 0.1 + 's">' +
            '<div class="timeline__dot"></div>' +
            '<div class="glass timeline__card">' +
            '<span class="timeline__year">' + esc(s.tahun) + '</span>' +
            '<h4>' + esc(s.judul) + '</h4><p>' + esc(s.teks) + '</p></div></li>'
          );
        })
        .join('')
    );
  }

  function renderNilai() {
    fill(
      'nilai',
      S.nilai
        .map(function (n, i) {
          return (
            '<div class="glass card" data-reveal="up" style="--reveal-delay:' + (i % 4) * 0.08 + 's">' +
            '<h3>' + esc(n.judul) + '</h3><p>' + esc(n.teks) + '</p></div>'
          );
        })
        .join('')
    );
  }

  function renderLegalitas() {
    fill(
      'legalitas',
      S.legalitas
        .map(function (l) {
          return (
            '<div class="legal__row"><dt>' + esc(l.label) + '</dt><dd>' + esc(l.nilai) + '</dd></div>'
          );
        })
        .join('')
    );
  }

  function renderJam() {
    fill(
      'jam',
      S.kontak.jamOperasional
        .map(function (j) {
          return '<div class="hours__row"><span>' + esc(j.hari) + '</span><strong>' + esc(j.jam) + '</strong></div>';
        })
        .join('')
    );
  }

  function renderArmada() {
    var host = slot('armada');
    if (!host) return;

    host.innerHTML = S.armada
      .map(function (a, i) {
        var spek = a.spesifikasi
          .map(function (s) {
            return '<div class="spec"><span>' + esc(s.label) + '</span><strong>' + esc(s.nilai) + '</strong></div>';
          })
          .join('');

        var gambar = a.foto
          ? '<img src="assets/img/' + esc(a.foto) + '" alt="' + esc(a.nama) + '" loading="lazy">'
          : '<div class="fleet__placeholder">' + I('truck') + '<span>Foto menyusul</span></div>';

        return (
          '<article class="glass fleet" data-kategori="' + esc(a.kategori) + '" ' +
          'data-reveal="up" style="--reveal-delay:' + (i % 3) * 0.08 + 's">' +
          '<div class="fleet__media">' + gambar + '</div>' +
          '<div class="fleet__body"><h3>' + esc(a.nama) + '</h3>' +
          '<div class="fleet__specs">' + spek + '</div>' +
          '<a class="btn btn--ghost btn--sm btn--block" data-wa="Halo, saya ingin menanyakan ketersediaan ' +
          esc(a.nama) + '.">Tanya Ketersediaan</a>' +
          '</div></article>'
        );
      })
      .join('');

    /* Tombol saring kategori.
       Dengan sedikit tipe kendaraan, semua kartu sudah terlihat
       sekaligus — saringan hanya menambah kebisingan, jadi baru
       ditampilkan bila tipenya tiga atau lebih. */
    var bar = slot('armadaFilter');
    if (bar) {
      var tipe = S.armada
        .map(function (a) {
          return a.kategori;
        })
        .filter(function (v, i, arr) {
          return arr.indexOf(v) === i;
        });

      if (tipe.length < 3) {
        bar.hidden = true;
        return;
      }

      var label = {
        semua: 'Semua',
        cdd: 'Colt Diesel Double',
        cde: 'Colt Diesel Single',
        truk: 'Truk',
        trailer: 'Trailer',
        van: 'Van'
      };

      bar.innerHTML = ['semua']
        .concat(tipe)
        .map(function (k, i) {
          return (
            '<button class="chip' + (i === 0 ? ' is-active' : '') + '" type="button" ' +
            'data-filter="' + k + '" aria-pressed="' + (i === 0) + '">' +
            (label[k] || k) + '</button>'
          );
        })
        .join('');
    }
  }

  /* ---------- kawan seperjalanan ---------- */

  function renderKawan() {
    if (!S.kawan) return;

    fill(
      'kawanJanji',
      S.kawan.janji
        .map(function (j, i) {
          return (
            '<li class="promise" data-reveal="up" style="--reveal-delay:' + i * 0.1 + 's">' +
            '<span class="promise__icon">' + I(j.ikon) + '</span>' +
            '<div><h3>' + esc(j.judul) + '</h3><p>' + esc(j.teks) + '</p></div>' +
            '</li>'
          );
        })
        .join('')
    );
  }

  /* ---------- fasilitas pool ---------- */

  function renderPool() {
    if (!S.pool) return;

    fill(
      'poolFasilitas',
      S.pool.fasilitas
        .map(function (f, i) {
          return (
            '<div class="benefit" data-reveal="up" style="--reveal-delay:' + (i % 3) * 0.08 + 's">' +
            '<div class="benefit__icon">' + I(f.ikon) + '</div>' +
            '<div><h4>' + esc(f.judul) + '</h4><p>' + esc(f.teks) + '</p></div></div>'
          );
        })
        .join('')
    );
  }

  function renderPilihanLayanan() {
    var sel = el('#f-layanan');
    if (!sel) return;
    sel.insertAdjacentHTML(
      'beforeend',
      S.jenisLayanan
        .map(function (j) {
          return '<option value="' + esc(j) + '">' + esc(j) + '</option>';
        })
        .join('')
    );
  }

  /* ---------- jalankan ---------- */

  function init() {
    renderNav();
    renderFooter();
    renderWa();
    renderStatistik();
    renderLayanan();
    renderKeunggulan();
    renderCaraKerja();
    renderMisi();
    renderSejarah();
    renderNilai();
    renderLegalitas();
    renderJam();
    renderArmada();
    renderKawan();
    renderPool();
    renderPilihanLayanan();
    renderMapsEmbed();
    renderSchema();
    bindText(); /* dijalankan terakhir agar mengenai elemen yang baru dibuat */

    document.dispatchEvent(new CustomEvent('zte:rendered'));
  }

  /* Menunggu DOMContentLoaded, bukan sekadar readyState !== 'loading'.
     Semua skrip defer dijalankan SEBELUM DOMContentLoaded, jadi dengan
     menunggu event ini kita memastikan motion.js, nav.js, dan map.js
     sudah sempat mendaftarkan pendengar 'zte:rendered'. */
  if (document.readyState === 'complete') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
