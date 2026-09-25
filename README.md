# Lompat Katak — Bangun Ruang Sisi Datar

Game kuis matematika untuk kelas IX SMP dengan mode dua tim (dapat dimainkan secara kompetitif dua tim berdampingan maupun secara mandiri pada satu layar). Setiap papan permainan memiliki level, soal, timer, nyawa, skor, jeda, serta hasil sendiri. Kode dan ilustrasi dibuat baru dengan mekanisme katak melompat ke daun jawaban; ini bukan kode atau aset Educaplay, dan tidak berafiliasi dengan Educaplay.

## Mainkan Daring (Live Demo)

Game ini dapat langsung dimainkan secara online tanpa instalasi melalui GitHub Pages:
**[https://aantriono82.github.io/loncatkatak/](https://aantriono82.github.io/loncatkatak/)**

---

## Cara Menjalankan Game Secara Mandiri (Lokal / Offline)

Game ini berbasis web murni (HTML, CSS, JavaScript) sehingga tidak membutuhkan instalasi dependensi rumit, database, API key, atau internet. Anda dapat menjalankannya dengan beberapa pilihan cara berikut:

### Cara 1: Menggunakan Local Web Server (Direkomendasikan)
Menjalankan lewat web server lokal memastikan seluruh berkas, gambar, dan pustaka KaTeX termuat optimal tanpa hambatan kebijakan keamanan browser lokal (*CORS/file protocol*).

* **Menggunakan Python (Linux / macOS / Windows):**
  Buka terminal di direktori proyek, lalu jalankan perintah:
  ```bash
  python3 -m http.server 8085
  ```
  Kemudian buka browser dan kunjungi alamat: **`http://localhost:8085`**

* **Menggunakan Node.js / npx:**
  ```bash
  npx serve .
  # atau
  npx http-server -p 8085
  ```

* **Menggunakan Ekstensi VS Code (Live Server):**
  Klik kanan pada berkas `index.html` di editor VS Code, lalu pilih **"Open with Live Server"**.

---

### Cara 2: Langsung Membuka File HTML (Offline Penuh)
1. Buka pengelola berkas (*File Explorer* / *File Manager*) dan buka folder proyek ini.
2. Klik ganda (*double-click*) pada berkas **`index.html`** untuk membukanya di browser modern (Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari).
3. Permainan langsung siap dimainkan 100% secara offline.

> [!NOTE]
> Pastikan seluruh file (`index.html`, `styles.css`, `game.js`, `engine.js`, `questions.js`, `illustrations.js`, serta folder `assets/` dan `vendor/`) tetap berada dalam satu folder yang sama dan tidak dipindahkan secara terpisah.

---

### Cara Memulai dan Kontrol Permainan
1. Pada layar awal:
   - Pilih topik bangun ruang: **Semua (Campuran)** untuk kuis komprehensif, atau pilih topik spesifik (**Kubus**, **Balok**, **Prisma**, **Limas**).
   - Pilih tingkat kesulitan:
     - **Mudah:** Konsep dasar (waktu 60 detik / soal)
     - **Sedang:** Hitungan bertahap (waktu 90 detik / soal)
     - **Sulit:** Analisis (waktu 120 detik / soal)
   - Masukkan nama pemain jika diinginkan.
2. Klik tombol **▶ Mulai Bermain**.
3. Baca soal di atas kolam, lalu pilih daun jawaban yang benar (A, B, C, atau D) menggunakan sentuhan/klik mouse atau menggunakan tombol keyboard:
   - Tombol **A, B, C, D** atau angka **1, 2, 3, 4**.
4. Gunakan tombol **Cara bermain (?)** di bilah atas untuk melihat petunjuk lengkap dan tombol **Pengaturan** di bawah untuk mengatur efek suara.
5. Tombol **Layar Penuh** (ikon kotak di pojok kanan atas) dapat digunakan untuk menampilkan game secara maksimal pada layar besar atau Interactive Flat Panel (IFP).
6. Pada akhir permainan, tekan **Lihat pembahasan** untuk meninjau hasil dengan filter interaktif (*Semua Soal*, *Perlu Dipelajari / Salah*, dan *Sudah Benar*).

## Aturan dan kontrol

- Pilih level **Mudah** (60 detik/soal), **Sedang** (90 detik/soal), atau **Sulit** (120 detik/soal) sebelum memulai. Setiap level memiliki 10 soal.
- Layout responsif menyesuaikan lebar layar, dari perangkat sentuh kecil hingga layar IFP besar.
- Tombol layar penuh membuat papan memenuhi layar.
- Setiap soal menyediakan 4 pilihan jawaban (A–D), 5 nyawa, durasi adaptif (60–120 detik/soal), sistem skor proporsional skala 100 dengan bonus sisa nyawa dan waktu tercepat saat berhasil menyeberang.
- Kriteria menang: mencapai batas tuntas/KKM (minimal 60% jawaban benar) dan tidak kehabisan nyawa.
- Soal mendukung **notasi matematika KaTeX** (pecahan, akar, pangkat) dan **ilustrasi spasial 3D/jaring-jaring** berbasis SVG vektor yang tajam.
- Jawaban salah atau waktu habis mengurangi satu nyawa, lalu lanjut ke soal berikutnya.
- Klik/sentuh daun atau gunakan tombol A/B/C/D maupun 1/2/3/4.
- Tombol pengaturan menjeda timer dan mengatur suara. Berpindah tab juga menjeda permainan.
- Layar hasil menampilkan status menang/coba lagi sesuai KKM, skor akhir beserta rincian bonus, jumlah benar, waktu, tombol main lagi, dan pembahasan lengkap beserta diagram ilustrasi.
- Layar penuh bergantung pada dukungan browser/perangkat. Efek suara baru diaktifkan setelah interaksi pengguna.
- Tidak ada login, pelacakan, papan peringkat daring, atau pengiriman hasil ke server. 100% offline-ready.

## Mengubah soal

Edit `questions.js`. Soal sudah dikelompokkan dalam `mudah`, `sedang`, dan `sulit`:

```js
{
  id: 'soal-unik',
  text: 'Volume kubus dengan rusuk $4\\text{ cm}$ adalah …',
  illustration: 'kubus-3d', // Opsional: id ilustrasi dari illustrations.js
  options: ['$16\\text{ cm}^3$', '$32\\text{ cm}^3$', '$64\\text{ cm}^3$', '$128\\text{ cm}^3$'],
  answer: 2,
  explanation: '$V = s^3 = 4^3 = 64\\text{ cm}^3$.'
}
```

`answer` adalah indeks jawaban benar: 0, 1, 2, atau 3. Urutan soal dan pilihannya diacak setiap permainan. Tambahkan ID unik untuk setiap soal. Notasi matematika diapit tanda `$ ... $`.

## Mengubah aturan atau tampilan

- `engine.js`: `CONFIG.lives`, `CONFIG.secondsPerQuestion`, `CONFIG.passingThresholdPercent`, `CONFIG.lifeBonusPoints`, `CONFIG.maxSpeedBonusPoints`.
- `illustrations.js`: pustaka diagram vektor SVG untuk bangun ruang 3D dan jaring-jaring.
- `vendor/katex/`: pustaka typesetting matematika offline (CSS, JS, dan fonts).
- `styles.css`: warna, ukuran, posisi daun, tipografi matematika, dan tampilan responsif.
- `game.js`: timer dinamis, rendering KaTeX, suara, animasi, jeda, hasil, dan interaksi.
- `index.html`: judul, teks petunjuk, dan struktur template tampilan.
- `assets/`: gambar katak, teratai, dan air yang dibuat khusus untuk game ini.

Jika jumlah soal atau aturan diubah, sesuaikan juga teks petunjuk dan layar awal di `index.html`.

## Catatan isi

Struktur visual, mekanisme, dan pokok isi 10 soal mengikuti contoh permainan yang diminta, termasuk pengulangan materi sifat prisma dan rusuk limas. Bahasa serta satuan dirapikan agar konsisten. Ilustrasi dan merek berbeda; ini bukan salinan identik aset atau kode contoh.

## Menaruh di hosting sendiri

Unggah isi folder permainan (`index.html`, CSS, JavaScript, dan `assets`) ke direktori publik web server. Tidak ada proses build atau backend.

## Pemeriksaan

Logika skor, jawaban, nyawa, urutan soal, dan alur selesai diuji dengan Node.js. Sintaks diperiksa, lalu smoke test Chrome headless dilakukan pada viewport 3840×2160 dan 800×1200; papan berhasil dibuat, dimulai, dan menjawab dengan benar. Tetap uji sentuhan, audio, dan tombol layar penuh pada IFP/perangkat tujuan sebelum penggunaan kelas.

## Asal aset

Ilustrasi orisinal dihasilkan dengan alat imagegen bawaan: katak hijau bertali ransel ungu dengan latar transparan, daun teratai hijau gelap transparan, dan tekstur permukaan kolam sian. Prompt lengkap tersedia di `ASSETS.md`.
