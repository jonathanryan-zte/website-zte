# Website PT. Zenith Trans Ekspedisi

Website company profile: HTML statis, tanpa proses build, tanpa instalasi apa pun.
Cukup salin foldernya ke hosting mana pun dan situs langsung jalan.

---

## Cara melihat website di komputer Anda

Beberapa bagian (navigasi, footer, peta) dibuat oleh JavaScript, dan browser
memblokir hal itu bila file dibuka dengan dobel klik. Jalankan server kecil ini
dari dalam folder proyek:

```bash
cd "/Users/ryan/Website ZTE" && python3 -m http.server 8000
```

Lalu buka **http://localhost:8000** di browser. Tekan `Ctrl+C` untuk berhenti.

---

## Mengubah isi website

Hampir semua isi ada di satu file: **`assets/js/site-data.js`**

Buka file itu, ubah nilainya, simpan, lalu muat ulang halaman. Anda tidak perlu
menyentuh file HTML sama sekali.

Baris yang masih berisi data contoh ditandai dengan `// [GANTI]` — cari kata itu
untuk menemukan semua yang perlu Anda isi.

### Data yang sudah terisi

Kontak, alamat, dan legalitas sudah diisi dari dokumen resmi perusahaan:

| Isi | Nilai |
|---|---|
| WhatsApp / Telepon | +62 878-9622-7383 |
| Email | zenithtransekspedisi@gmail.com |
| Alamat | Jl. Raya Mabes Hankam No. 1, RT 009/RW 003, Kel. Setu, Kec. Cipayung, Jakarta Timur 13880 |
| NIB | 1008260047795 |
| NPWP | 1000 0000 1070 0715 |
| Akta Pendirian | No. 22 — 6 Agustus 2026 |
| SK Kemenkumham | AHU-0063584.AH.01.01.TAHUN 2026 |

### Yang masih perlu diisi

| Bagian di `site-data.js` | Keterangan |
|---|---|
| `kontak.mapsEmbed` | Peta lokasi kantor — lihat cara mengambilnya di bawah |
| `sosial` | Tautan Instagram / Facebook / LinkedIn / TikTok |
| `armada[].foto` | Foto kendaraan — datanya sudah terisi, tinggal fotonya |
| `armada[].spesifikasi` | Dimensi bak masih ukuran umum karoseri, cocokkan dengan unit Anda |
| `kota` dan `rute` | Kota tujuan yang benar-benar dilayani |

### Estimasi waktu di peta

Nilai `estimasi` tiap kota masih **perkiraan berdasarkan wilayah**, bukan dari
data Anda: Jabodetabek & Banten 1 hari, Jawa Barat 1–2 hari, Jawa Timur 2–3
hari. Ganti dengan SLA yang benar-benar Anda janjikan.

### Data armada

Diambil dari **Data Kendaraan per 31 Agustus 2026**: 26 unit aktif — 24 Colt
Diesel Double (2011–2021) dan 2 Colt Diesel Single (2010–2011). Halaman Armada
menampilkan dua tipe itu beserta jumlah unitnya, bukan daftar nomor polisi:
nomor polisi adalah data operasional yang tidak perlu tampil di halaman publik.

Saringan kategori otomatis tersembunyi selama tipe kendaraan kurang dari tiga —
dengan dua kartu, semuanya sudah terlihat sekaligus. Begitu Anda menambah tipe
ketiga, saringannya muncul sendiri.

Bagian **Pool & Fasilitas** mengacu pada denah pool Pondok Ranggon: 15 slot
parkir, area bengkel, gudang, kantor, mes sopir, dan pengelolaan limbah.

### Tentang angka di beranda

Perusahaan berdiri **6 Agustus 2026**, jadi empat angka di beranda sengaja
dipilih yang bisa dipertanggungjawabkan hari ini: tahun berdiri, jumlah unit
armada, jumlah kota di peta, dan janji waktu balasan penawaran.

**Jangan mengganti angka ini dengan jumlah pengiriman atau armada yang belum
terjadi.** Klaim semacam itu mudah dibantah calon pelanggan dan merugikan
kepercayaan. Perbarui setelah ada angka operasional yang nyata.

### Dua tagline, dua peran

Website ini memakai dua frasa brand, dan keduanya **sengaja tidak pernah
ditampilkan berdampingan** — dua tagline yang bersaing di tempat yang sama
justru saling melemahkan.

| Frasa | Perannya | Tempatnya |
|---|---|---|
| *Delivering Beyond Expectation* | Janji **hasil** — apa yang dikerjakan | Logo, eyebrow hero, data terstruktur |
| *Kawan Seperjalanan* | Janji **hubungan** — bagaimana rasanya bekerja dengan Anda | Bagiannya sendiri di Beranda |

Isi bagian "Kawan Seperjalanan" ada di `site-data.js` pada objek `kawan`.
Ketiga janji di dalamnya (`kawan.janji`) harus benar-benar bisa ditepati —
kalimat hangat tanpa bukti justru merusak kepercayaan, bukan membangunnya.
Kalau salah satu janji tidak realistis untuk dijalankan sehari-hari, ganti
kalimatnya, jangan dibiarkan.

### Peta jaringan rute

Isi peta berasal dari **data rute nyata** (162 rute aktif): 36 kota di Banten,
Jabodetabek, Jawa Barat, dan Jawa Timur, dengan 56 pasangan rute. Enam kota
ditandai `hub: true` karena di sanalah gudang muat berada — Tangerang,
Pandeglang, Bogor, Cianjur, Jakarta, dan Pasuruan.

Peta memakai proyeksi Pulau Jawa. Untuk menambah kota, hitung koordinatnya:

```
x = (bujur   - 104,5) / 11,0 × 100
y = (-5,5 - lintang) /  3,5  × 100
```

Contoh, Surabaya (bujur 112,74 / lintang −7,26) menjadi `x: 74.9, y: 50.3`.
Rumus yang sama dipakai untuk menggambar siluet pulaunya di `map.js`, jadi
titik kota selalu jatuh tepat pada daratan.

Setelah itu tambahkan rutenya di `rute`, misalnya `['Tangerang', 'Kota Baru']`.
Beri `labelAtas: true` bila nama kota bertabrakan dengan tetangganya —
labelnya akan pindah ke atas titik.

**Kalau nanti melayani luar Jawa**, proyeksi dan siluet di `map.js` perlu
diganti kembali ke skala kepulauan. Bilang saja, itu perubahan yang mudah.

### Menambah foto armada

1. Simpan fotonya di `assets/img/` — misalnya `tronton.jpg`
2. Di `site-data.js`, isi `foto: 'tronton.jpg'` pada armada yang sesuai

Selama `foto` masih kosong, kartu menampilkan ilustrasi sementara.
Ukuran foto yang pas: **1600 × 1000 piksel**, format JPG, di bawah 300 KB.

### Logo

Ada tiga berkas, semuanya diturunkan dari `LOGO ZENITH.png` milik Anda:

| Berkas | Dipakai di |
|---|---|
| `logo-mark.png` | Ikon "Z" — navigasi dan ikon tab browser |
| `logo-zenith.png` | Logo lengkap — dipakai di **mode terang** |
| `logo-zenith-dark.png` | Logo lengkap — dipakai di **mode gelap** |

Ada dua versi logo lengkap karena tulisan "EKSPEDISI" dan taglinenya berwarna
navy gelap. Di atas latar gelap tulisan itu nyaris tidak terbaca, jadi versi
`-dark` menerangkan bagian tersebut sementara warna biru dan hijau
dipertahankan apa adanya. Website memilih versi yang tepat secara otomatis.

Bila Anda punya berkas resmi logo versi putih dari brand guide, berkas itu
lebih baik dipakai — cukup timpa `logo-zenith-dark.png` dengan ukuran yang sama.

### Menambahkan peta lokasi kantor

Buka Google Maps → cari alamat kantor → **Bagikan** → **Sematkan peta** →
salin alamat di dalam `src="..."`, lalu tempel ke `kontak.mapsEmbed`.

---

## Struktur file

```
index.html          Beranda
tentang.html        Tentang Kami
armada.html         Armada
kontak.html         Kontak

assets/css/
  tokens.css        Warna, ukuran huruf, jarak — sumber semua gaya
  base.css          Dasar tipografi dan tata letak
  components.css    Tombol, kartu, navigasi, footer, formulir
  sections.css      Bagian-bagian halaman
  animations.css    Animasi

assets/js/
  site-data.js      >>> SEMUA ISI WEBSITE ADA DI SINI <<<
  theme.js          Mode gelap/terang
  icons.js          Kumpulan ikon
  render.js         Menyusun navigasi, footer, dan blok berulang
  nav.js            Navigasi & menu mobile
  motion.js         Animasi
  map.js            Peta jaringan rute
  armada.js         Saringan kategori armada
  form.js           Formulir penawaran → WhatsApp
```

---

## Warna

Diatur di `assets/css/tokens.css`. **Jangan menulis kode warna langsung di file
lain** — gunakan variabelnya, supaya mode gelap dan terang tetap sejalan.

Hal penting yang perlu diketahui: **`#00FF66` tidak boleh dipakai sebagai warna
teks di mode terang.** Di atas latar putih kontrasnya hanya 1,4:1 — praktis
tidak terbaca dan gagal standar aksesibilitas. Karena itu setiap mode punya
nilainya sendiri:

| Kegunaan | Mode gelap | Mode terang |
|---|---|---|
| Teks hijau | `#00FF66` | `#00803F` |
| Teks biru | `#00B8FF` | `#0077B3` |
| Isian tombol | `#00FF66` | `#00FF66` (dengan teks gelap) |

Hijau neon tetap hidup di mode terang — tapi sebagai **isian tombol**, bukan
sebagai warna huruf. Seluruh 27 pasangan warna teks/latar sudah diperiksa dan
memenuhi standar WCAG AA (minimal 4,5:1).

Perbandingan pemakaian warna mengikuti brand guide: **60% netral, 25% hijau,
10% biru, 5% putih**. Gradient hijau–biru hanya untuk momen brand — logo, judul
hero, dan satu panel ajakan per halaman. Bila dipakai di mana-mana, kesan
premiumnya justru hilang.

---

## Mengunggah ke hosting

Salin **semua isi folder ini** ke hosting Anda.

- **cPanel / hosting biasa:** unggah seluruh isi folder ke `public_html`
- **Netlify:** buka [netlify.com/drop](https://app.netlify.com/drop), seret foldernya
- **Vercel / GitHub Pages:** hubungkan repositori, tanpa pengaturan build

Tidak ada langkah build. Yang Anda lihat di komputer sama persis dengan yang
tampil di internet.

---

## Catatan teknis

- **Font** diambil dari Google Fonts. Bila internet pengunjung memblokirnya,
  huruf sistem otomatis dipakai sebagai pengganti.
- **Smooth scroll** memakai pustaka Lenis dari CDN. Bila gagal dimuat, scroll
  bawaan browser tetap berfungsi normal.
- **Formulir kontak tidak mengirim data ke server mana pun.** Isian pengunjung
  disusun menjadi pesan WhatsApp yang tetap mereka kendalikan sebelum dikirim.
- Pengunjung yang mengaktifkan **"kurangi gerakan"** di perangkatnya akan
  melihat website tanpa animasi — semua isi tetap tampil utuh.
- Animasi berat (kartu miring, parallax) otomatis dimatikan di layar ponsel.
