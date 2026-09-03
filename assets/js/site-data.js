/* ============================================================
   DATA SITUS — SATU-SATUNYA FILE YANG PERLU ANDA EDIT

   Semua teks, nomor, alamat, layanan, dan kota rute ada di sini.
   Ubah nilainya, seluruh halaman ikut berubah otomatis.

   >>> BARIS BERTANDA  [GANTI]  MASIH BERISI DATA CONTOH <<<
   ============================================================ */

window.SITE = {
  /* ----------------------------------------------------------
     IDENTITAS PERUSAHAAN
     ---------------------------------------------------------- */
  nama: 'PT. Zenith Trans Ekspedisi',
  namaPendek: 'Zenith Trans',
  tagline: 'Delivering Beyond Expectation',
  tahunBerdiri: 2026,
  deskripsiSingkat:
    'Perusahaan ekspedisi dan distribusi darat yang berbasis di Jakarta Timur, ' +
    'melayani rute Jabodetabek, Banten, Jawa Barat, dan Jawa Timur dengan ' +
    'armada milik sendiri.',

  /* ----------------------------------------------------------
     KONTAK
     ---------------------------------------------------------- */
  kontak: {
    // Nomor WhatsApp format internasional TANPA tanda + dan tanpa spasi
    whatsapp: '6287896227383',
    teleponTampil: '+62 878-9622-7383',
    teleponDial: '+6287896227383',
    email: 'zenithtransekspedisi@gmail.com',
    alamat: 'Jl. Raya Mabes Hankam No. 1, RT 009 / RW 003',
    kelurahan: 'Kel. Setu, Kec. Cipayung',
    kota: 'Jakarta Timur',
    provinsi: 'DKI Jakarta',
    kodePos: '13880',
    negara: 'Indonesia',
    // Ambil dari Google Maps: Bagikan > Sematkan peta > salin URL di dalam src="..."
    mapsEmbed: '', // [GANTI] kosongkan bila belum ada
    mapsLink:
      'https://maps.google.com/?q=Jl.+Raya+Mabes+Hankam+No.1,+Setu,+Cipayung,+Jakarta+Timur',
    jamOperasional: [
      { hari: 'Senin – Jumat', jam: '08.00 – 17.00 WIB' },
      { hari: 'Sabtu & Minggu', jam: 'Tutup' },
      { hari: 'Hari Libur Nasional', jam: 'Tutup' }
    ],
    catatanJam: 'Pesan WhatsApp di luar jam kerja akan kami balas pada hari kerja berikutnya.'
  },

  /* ----------------------------------------------------------
     MEDIA SOSIAL — kosongkan ('') bila belum punya
     ---------------------------------------------------------- */
  sosial: {
    instagram: '', // [GANTI]
    facebook: '', // [GANTI]
    linkedin: '', // [GANTI]
    tiktok: '' // [GANTI]
  },

  /* ----------------------------------------------------------
     LEGALITAS
     ---------------------------------------------------------- */
  legalitas: [
    { label: 'Akta Pendirian', nilai: 'No. 22 — 6 Agustus 2026' },
    { label: 'SK Kemenkumham', nilai: 'AHU-0063584.AH.01.01.TAHUN 2026' },
    { label: 'NIB', nilai: '1008260047795' },
    { label: 'NPWP', nilai: '1000 0000 1070 0715' },
    { label: 'Notaris', nilai: 'Hans Christian T.H., S.H., M.Kn.' },
    { label: 'Klasifikasi Usaha', nilai: 'KBLI 52311 — Aktivitas Ekspedisi Muatan' }
  ],

  /* ----------------------------------------------------------
     STATISTIK di beranda
     'nilai' harus berupa angka — dipakai animasi hitung naik.

     CATATAN: perusahaan berdiri Agustus 2026, jadi angka di sini
     sengaja dipilih yang bisa dipertanggungjawabkan — bukan klaim
     jumlah pengiriman atau armada yang belum terjadi. Perbarui
     setelah ada angka operasional yang nyata.
     ---------------------------------------------------------- */
  statistik: [
    /* 'polos: true' mematikan pemisah ribuan — tanpa ini tahun
       akan tampil sebagai "2.026". */
    { nilai: 2026, akhiran: '', label: 'Tahun Berdiri', polos: true },
    { nilai: 26, akhiran: '', label: 'Unit Armada' },
    { nilai: 36, akhiran: '', label: 'Kota Terlayani' },
    { nilai: 24, akhiran: ' jam', label: 'Respons Penawaran' }
  ],

  /* ----------------------------------------------------------
     LAYANAN
     'ikon' memakai nama dari daftar di assets/js/icons.js
     ---------------------------------------------------------- */
  layanan: [
    {
      ikon: 'truck',
      judul: 'Muatan Penuh (FTL)',
      teks:
        'Satu kendaraan khusus untuk kiriman Anda. Tanpa transit, tanpa bongkar ' +
        'muat di tengah jalan, waktu tempuh paling singkat.'
    },
    {
      ikon: 'boxes',
      judul: 'Muatan Sebagian (LTL)',
      teks:
        'Berbagi ruang muat dengan kiriman lain. Pilihan paling hemat untuk ' +
        'volume kecil hingga menengah dengan jadwal rutin.'
    },
    {
      ikon: 'route',
      judul: 'Ekspedisi Darat',
      teks:
        'Rute tetap lintas kota dan lintas provinsi di Pulau Jawa dengan ' +
        'armada milik sendiri yang dirawat berkala di pool kami.'
    },
    {
      ikon: 'package',
      judul: 'Distribusi Pabrik & Distributor',
      teks:
        'Pengangkutan rutin dari gudang pabrik ke titik sebar distributor, ' +
        'dengan jadwal dan tarif yang disepakati di awal.'
    },
    {
      ikon: 'warehouse',
      judul: 'Pergudangan',
      teks:
        'Gudang di pool kami untuk penyimpanan sementara, konsolidasi muatan, ' +
        'dan distribusi sesuai jadwal Anda.'
    },
    {
      ikon: 'shield',
      judul: 'Kiriman Terjamin',
      teks:
        'Penanganan barang bernilai tinggi dengan pengemasan khusus, ' +
        'asuransi, dan pemantauan sepanjang perjalanan.'
    }
  ],

  /* ----------------------------------------------------------
     KAWAN SEPERJALANAN
     Ini janji hubungan — bagaimana rasanya bekerja dengan kami.
     Berbeda peran dari tagline "Delivering Beyond Expectation",
     yang merupakan janji hasil. Sengaja tidak ditampilkan
     berdampingan supaya keduanya tidak saling melemahkan.

     Setiap janji di bawah harus benar-benar bisa ditepati —
     kalimat hangat tanpa bukti justru merusak kepercayaan.
     ---------------------------------------------------------- */
  kawan: {
    judul: 'Kawan Seperjalanan',
    pembuka:
      'Bagi kami, mengantar barang bukan sekadar memindahkan muatan dari ' +
      'satu titik ke titik lain. Ada usaha Anda di dalam bak itu — dan kami ' +
      'membawanya seperti membawa milik sendiri.',
    penutup:
      'Perusahaan kami masih muda, dan justru karena itu setiap pelanggan ' +
      'kami kenal namanya.',
    janji: [
      {
        ikon: 'handshake',
        judul: 'Satu nomor, satu orang',
        teks:
          'Anda tidak dioper dari bagian ke bagian. Orang yang menerima ' +
          'permintaan Anda adalah orang yang mengawal sampai barang diterima.'
      },
      {
        ikon: 'phone',
        judul: 'Kabar tanpa perlu ditanya',
        teks:
          'Kami hubungi Anda saat armada berangkat dan saat tiba di tujuan — ' +
          'bukan menunggu Anda bertanya lebih dulu.'
      },
      {
        ikon: 'shield',
        judul: 'Kendala di jalan, urusan kami',
        teks:
          'Ban bocor, macet panjang, atau jalan ditutup. Anda cukup tahu ' +
          'rencana penggantinya, bukan ikut memikirkan jalan keluarnya.'
      }
    ]
  },

  /* ----------------------------------------------------------
     KLIEN KAMI
     Logo diambil dari sumber resmi masing-masing (situs
     perusahaan / laman investor). Beberapa nama PT di bawah
     satu logo karena mereka adalah entitas berbeda dalam grup
     usaha yang sama dan tidak memakai logo tersendiri — di
     media sosial resmi mereka pun selalu tampil dengan nama
     grup usahanya.
     ---------------------------------------------------------- */
  klien: [
    {
      logo: 'mayora-group.png',
      nama: 'Mayora Group',
      entitas: [
        'PT. Mayora Indah Tbk',
        'PT. Dellifood Sentosa Corpindo',
        'PT. Kakao Mas Gemilang',
        'PT. Pascal Corpindo Semesta',
        'PT. Inbisco Niagatama Semesta'
      ]
    },
    {
      logo: 'torabika.png',
      nama: 'PT. Torabika Eka Semesta'
    },
    {
      logo: 'tumbakmas-niagasakti.png',
      nama: 'PT. Tumbakmas Niagasakti'
    }
  ],

  /* ----------------------------------------------------------
     KEUNGGULAN — mengikuti ikon di brand guide
     ---------------------------------------------------------- */
  keunggulan: [
    { ikon: 'bolt', judul: 'Cepat', teks: 'Waktu tempuh dipangkas lewat perencanaan rute yang matang.' },
    { ikon: 'route', judul: 'Jalur & Rute', teks: 'Jaringan rute yang terus diperluas ke kota-kota baru.' },
    { ikon: 'trendUp', judul: 'Maju & Progres', teks: 'Armada dan sistem yang kami kembangkan seiring pertumbuhan.' },
    { ikon: 'shield', judul: 'Aman & Terpercaya', teks: 'Setiap kiriman tercatat, terkunci, dan dapat diasuransikan.' },
    { ikon: 'globe', judul: 'Jaringan Luas', teks: '36 kota terlayani di Banten, Jabodetabek, Jawa Barat, dan Jawa Timur.' },
    { ikon: 'clock', judul: 'Tepat Waktu', teks: 'Estimasi kedatangan yang kami pegang sebagai janji.' }
  ],

  /* ----------------------------------------------------------
     CARA KERJA
     ---------------------------------------------------------- */
  caraKerja: [
    { judul: 'Ajukan Permintaan', teks: 'Kirim detail muatan, asal, dan tujuan melalui WhatsApp atau formulir.' },
    { judul: 'Terima Penawaran', teks: 'Kami hitung ongkos dan jadwal, lalu kirimkan penawaran dalam 24 jam.' },
    { judul: 'Penjemputan', teks: 'Armada menjemput di lokasi Anda pada waktu yang disepakati.' },
    { judul: 'Tiba di Tujuan', teks: 'Barang diantar dan diserahterimakan lengkap dengan bukti terima.' }
  ],

  /* ----------------------------------------------------------
     VISI & MISI
     ---------------------------------------------------------- */
  visi:
    'Menjadi perusahaan ekspedisi yang diandalkan dalam ketepatan waktu ' +
    'dan keamanan pengiriman, tumbuh bersama kepercayaan pelanggan.',
  misi: [
    'Mengantar setiap kiriman tepat waktu dan dalam kondisi utuh.',
    'Memberi kepastian biaya dan jadwal sejak penawaran pertama.',
    'Memperluas jaringan rute secara bertahap ke seluruh wilayah Indonesia.',
    'Membangun tim dan armada yang tumbuh seiring kebutuhan pelanggan.'
  ],

  /* ----------------------------------------------------------
     PERJALANAN PERUSAHAAN
     Semua tanggal di bawah mengacu pada dokumen legalitas resmi.
     ---------------------------------------------------------- */
  sejarah: [
    {
      tahun: 'Agu 2026',
      judul: 'Berbadan Hukum',
      teks:
        'Akta Pendirian Nomor 22 tertanggal 6 Agustus 2026 disahkan Kementerian ' +
        'Hukum RI melalui SK AHU-0063584.AH.01.01.'
    },
    {
      tahun: 'Agu 2026',
      judul: 'Izin Usaha Terbit',
      teks:
        'NIB 1008260047795 diterbitkan sistem OSS, bersama Sertifikat Standar ' +
        'untuk klasifikasi usaha KBLI 52311.'
    },
    {
      tahun: 'Sep 2026',
      judul: 'Mulai Melayani',
      teks:
        'Operasional dimulai dari kantor di Jakarta Timur, melayani pengiriman ' +
        'darat dan laut ke berbagai kota di Indonesia.'
    },
    {
      tahun: 'Selanjutnya',
      judul: 'Perluasan Jaringan',
      teks:
        'Menambah armada dan membuka rute baru secara bertahap, mengikuti ' +
        'kebutuhan pelanggan yang kami layani.'
    }
  ],

  /* ----------------------------------------------------------
     NILAI PERUSAHAAN
     ---------------------------------------------------------- */
  nilai: [
    { judul: 'Amanah', teks: 'Barang pelanggan kami jaga seperti milik sendiri.' },
    { judul: 'Tepat', teks: 'Janji waktu bukan perkiraan, melainkan komitmen.' },
    { judul: 'Terbuka', teks: 'Biaya dan status kiriman disampaikan apa adanya.' },
    { judul: 'Berkembang', teks: 'Setiap masukan menjadi bahan perbaikan layanan.' }
  ],

  /* ----------------------------------------------------------
     ARMADA
     Taruh foto di assets/img/ lalu tulis nama filenya di 'foto'.
     Kosongkan ('') untuk memakai ilustrasi bawaan.
     ---------------------------------------------------------- */
  /* Jumlah dan tipe mengacu pada Data Kendaraan per 31 Agustus 2026:
     26 unit aktif — 24 Colt Diesel Double, 2 Colt Diesel Single.
     Kapasitas & dimensi di bawah adalah ukuran umum karoseri;
     sesuaikan bila unit Anda berbeda. */
  armada: [
    {
      kategori: 'cdd',
      nama: 'Colt Diesel Double (CDD)',
      jumlah: 24,
      foto: '', // [GANTI]
      spesifikasi: [
        { label: 'Jumlah Unit', nilai: '24 unit' },
        { label: 'Kapasitas', nilai: '4 – 6 ton' },
        { label: 'Dimensi Bak', nilai: '± 440 × 200 × 200 cm' }, // [GANTI bila berbeda]
        { label: 'Tahun', nilai: '2011 – 2021' },
        { label: 'Cocok Untuk', nilai: 'Distribusi antarkota & antarprovinsi' }
      ]
    },
    {
      kategori: 'cde',
      nama: 'Colt Diesel Single (CDE)',
      jumlah: 2,
      foto: '', // [GANTI]
      spesifikasi: [
        { label: 'Jumlah Unit', nilai: '2 unit' },
        { label: 'Kapasitas', nilai: '2 – 3 ton' },
        { label: 'Dimensi Bak', nilai: '± 300 × 160 × 160 cm' }, // [GANTI bila berbeda]
        { label: 'Tahun', nilai: '2010 – 2011' },
        { label: 'Cocok Untuk', nilai: 'Kiriman dalam kota & muatan ringan' }
      ]
    }
  ],

  /* ----------------------------------------------------------
     FASILITAS POOL — mengacu pada Denah Pool Pondok Ranggon
     ---------------------------------------------------------- */
  pool: {
    lokasi: 'Jl. Raya Pondok Ranggon, Cipayung, Jakarta Timur',
    fasilitas: [
      { ikon: 'truck', judul: '15 Slot Parkir', teks: 'Dua baris parkir (P1–P15) dengan area manuver dan satu jalur keluar-masuk.' },
      { ikon: 'handshake', judul: 'Area Bengkel', teks: 'Area perawatan dan perbaikan ringan armada di dalam pool.' },
      { ikon: 'warehouse', judul: 'Gudang', teks: 'Ruang simpan untuk konsolidasi dan penyimpanan sementara muatan.' },
      { ikon: 'package', judul: 'Kantor Operasional', teks: 'Administrasi, arsip pengiriman, dan koordinasi jadwal armada.' },
      { ikon: 'clock', judul: 'Mes Sopir', teks: 'Tempat istirahat pengemudi agar siap sebelum perjalanan jauh.' },
      { ikon: 'shield', judul: 'Pengelolaan Limbah', teks: 'Tangki limbah oli dan TPS terpisah sesuai ketentuan lingkungan.' }
    ]
  },

  /* ----------------------------------------------------------
     PETA JARINGAN — disusun dari data rute nyata (162 rute aktif).
     Peta memakai proyeksi Pulau Jawa:
       x = (bujur  - 104,5) / 11,0 × 100
       y = (-5,5 - lintang) / 3,5 × 100
     'hub' menandai kota tempat gudang muat berada.
     'estimasi' masih perkiraan wilayah — sesuaikan dengan SLA Anda.
     ---------------------------------------------------------- */
  kota: [
    { nama: 'Ujung Kulon', x: 8.6, y: 35.7, pulau: 'Banten', estimasi: '1 hari', hub: false },
    { nama: 'Labuan', x: 12.1, y: 25.1, pulau: 'Banten', estimasi: '1 hari', hub: false },
    { nama: 'Merak', x: 13.5, y: 12.3, pulau: 'Banten', estimasi: '1 hari', hub: false },
    { nama: 'Malingping', x: 13.8, y: 36.0, pulau: 'Banten', estimasi: '1 hari', hub: false },
    { nama: 'Cilegon', x: 14.1, y: 14.3, pulau: 'Banten', estimasi: '1 hari', hub: false },
    { nama: 'Pandeglang', x: 14.5, y: 23.1, pulau: 'Banten', estimasi: '1 hari', hub: true },
    { labelAtas: true, nama: 'Serang', x: 15.0, y: 17.7, pulau: 'Banten', estimasi: '1 hari', hub: false },
    { nama: 'Rangkasbitung', x: 15.9, y: 24.6, pulau: 'Banten', estimasi: '1 hari', hub: false },
    { nama: 'Pelabuhan Ratu', x: 18.6, y: 43.4, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: false },
    { nama: 'Tangerang', x: 19.4, y: 20.0, pulau: 'Banten', estimasi: 'Hari yang sama', hub: true },
    { nama: 'Bogor', x: 20.9, y: 31.4, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: true },
    { nama: 'Depok', x: 21.1, y: 25.7, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: false },
    { labelAtas: true, nama: 'Jakarta', x: 21.2, y: 20.0, pulau: 'DKI Jakarta', estimasi: 'Hari yang sama', hub: true },
    { nama: 'Sukabumi', x: 22.1, y: 40.6, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: false },
    { labelAtas: true, nama: 'Bekasi', x: 23.2, y: 21.4, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: false },
    { nama: 'Cianjur', x: 24.0, y: 37.7, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: true },
    { nama: 'Karawang', x: 25.9, y: 23.4, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: false },
    { nama: 'Garut', x: 29.7, y: 60.0, pulau: 'Jawa Barat', estimasi: '1 – 2 hari', hub: false },
    { nama: 'Pacitan', x: 60.0, y: 76.9, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Ponorogo', x: 63.4, y: 67.7, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Bojonegoro', x: 67.1, y: 47.1, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Kediri', x: 68.3, y: 66.3, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Tuban', x: 68.7, y: 40.0, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Jombang', x: 70.3, y: 58.6, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Lamongan', x: 72.0, y: 46.3, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Mojokerto', x: 72.1, y: 56.3, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Malang', x: 73.9, y: 70.9, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Gresik', x: 74.1, y: 47.4, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Sidoarjo', x: 74.7, y: 55.7, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Surabaya', x: 74.9, y: 50.3, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Pasuruan', x: 76.4, y: 61.4, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: true },
    { nama: 'Probolinggo', x: 79.3, y: 64.3, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Lumajang', x: 79.3, y: 75.1, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Jember', x: 83.6, y: 76.3, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Bondowoso', x: 84.7, y: 68.9, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false },
    { nama: 'Banyuwangi', x: 89.7, y: 77.7, pulau: 'Jawa Timur', estimasi: '2 – 3 hari', hub: false }
  ],

  /* Rute yang digambar di peta: [nama kota asal, nama kota tujuan] */
  rute: [
    ['Tangerang', 'Jakarta'],
    ['Bogor', 'Jakarta'],
    ['Pandeglang', 'Jakarta'],
    ['Tangerang', 'Bekasi'],
    ['Tangerang', 'Cianjur'],
    ['Tangerang', 'Karawang'],
    ['Cianjur', 'Jakarta'],
    ['Tangerang', 'Garut'],
    ['Tangerang', 'Malingping'],
    ['Tangerang', 'Bogor'],
    ['Tangerang', 'Serang'],
    ['Pandeglang', 'Tangerang'],
    ['Tangerang', 'Depok'],
    ['Tangerang', 'Pelabuhan Ratu'],
    ['Tangerang', 'Rangkasbitung'],
    ['Pasuruan', 'Lamongan'],
    ['Bogor', 'Cilegon'],
    ['Bogor', 'Bekasi'],
    ['Bogor', 'Depok'],
    ['Bogor', 'Serang'],
    ['Bogor', 'Tangerang'],
    ['Jakarta', 'Tangerang'],
    ['Tangerang', 'Pandeglang'],
    ['Tangerang', 'Sukabumi'],
    ['Pasuruan', 'Bojonegoro'],
    ['Pasuruan', 'Banyuwangi'],
    ['Pasuruan', 'Bondowoso'],
    ['Pasuruan', 'Gresik'],
    ['Pasuruan', 'Jombang'],
    ['Pasuruan', 'Jember'],
    ['Pasuruan', 'Kediri'],
    ['Pasuruan', 'Lumajang'],
    ['Pasuruan', 'Malang'],
    ['Pasuruan', 'Mojokerto'],
    ['Pasuruan', 'Ponorogo'],
    ['Pasuruan', 'Probolinggo'],
    ['Pasuruan', 'Pacitan'],
    ['Pasuruan', 'Surabaya'],
    ['Pasuruan', 'Sidoarjo'],
    ['Pasuruan', 'Tuban'],
    ['Cianjur', 'Depok'],
    ['Cianjur', 'Tangerang'],
    ['Cianjur', 'Serang'],
    ['Jakarta', 'Bekasi'],
    ['Tangerang', 'Cilegon'],
    ['Pandeglang', 'Rangkasbitung'],
    ['Pandeglang', 'Serang'],
    ['Pandeglang', 'Cilegon'],
    ['Pandeglang', 'Labuan'],
    ['Pandeglang', 'Merak'],
    ['Pandeglang', 'Malingping'],
    ['Pandeglang', 'Bogor'],
    ['Pandeglang', 'Depok'],
    ['Pandeglang', 'Bekasi'],
    ['Pandeglang', 'Ujung Kulon'],
    ['Pandeglang', 'Pelabuhan Ratu']
  ],

  /* ----------------------------------------------------------
     PILIHAN DI FORMULIR PENAWARAN
     ---------------------------------------------------------- */
  jenisLayanan: [
    'Muatan Penuh (FTL)',
    'Muatan Sebagian (LTL)',
    'Ekspedisi Darat',
    'Distribusi Pabrik & Distributor',
    'Pergudangan',
    'Lainnya'
  ]
};
