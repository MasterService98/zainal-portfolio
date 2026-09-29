# 🌐 Website Data Diri & Portofolio — Muhammad Zainal Efendi

Website data diri personal profesional bertema modern-kasual untuk **Muhammad Zainal Efendi** (Blitar, 20 Juni 2002) di bawah bendera **Zain Corp** (`@Zain_Corp.`). Didesain khusus dengan visual kaya, interaktivitas tinggi, canvas animasi, serta siap dideploy langsung ke **Vercel**.

---

## 📋 Data Diri Terintegrasi
- **Nama Lengkap:** MUHAMMAD ZAINAL EFENDI
- **Tempat, Tanggal Lahir:** Blitar, 20 Juni 2002
- **Instagram Resmi:** [@Zain_Corp.](https://instagram.com/Zain_Corp.)
- **Surel / Email:** [muhzainal980@gmail.com](mailto:muhzainal980@gmail.com)
- **Domisili:** Blitar, Jawa Timur, Indonesia

---

## ✨ Fitur-Fitur Utama & Animasi
1. **Animasi Partikel Interaktif (HTML5 Canvas)**: Efek jejaring partikel dinamis yang merespons pergerakan kursor mouse secara presisi.
2. **Kartu Foto 3D Tilt Interaktif**: Kartu persona profil dengan efek kemiringan perspektif 3 dimensi dan lencana mengambang (*floating badges*).
3. **Kalkulator Umur & Hitung Mundur Ulang Tahun Real-time**: Menghitung otomatis usia saat ini berdasarkan kelahiran 20 Juni 2002 serta sisa hari menuju hari ulang tahun berikutnya.
4. **Jam Waktu Nyata WIB (Blitar, ID)**: Sinkronisasi waktu lokal Jawa Timur (Asia/Jakarta) dengan indikator status hijau berdenyut.
5. **Efek Suara Sintetis (Web Audio API)**: Suara klik dan interaksi halus tanpa perlu mengunduh file audio eksternal, dilengkapi tombol toggle mute/unmute.
6. **Pengganti Palet Warna Aksen (Mood Switcher)**: Pilihan tema dinamis antara *Cyber Cyan & Coral*, *Sunset Amber*, dan *Emerald Clean*.
7. **Salin Email Instan (1-Click Copy)**: Tombol salin email `muhzainal980@gmail.com` dengan pop-up notifikasi *toast* estetik.
8. **Showcase Portofolio & Modal Pratinjau**: Filter karya berdasarkan kategori (Web, UI/UX, Branding) lengkap dengan popup detail proyek.
9. **Kursor Kustom Dinamis**: Titik kursor halus dan cincin pelacak dengan efek magnetik pada tombol.
10. **Formulir Kontak Cepat**: Form interaktif yang langsung menyiapkan pesan email ke surel tujuan.

---

## 🚀 Panduan Deploy ke Vercel

Proyek ini telah dilengkapi dengan `vercel.json` dan berformat *zero-configuration static build*, sehingga sangat cepat dan mudah dideploy:

### Cara 1: Menggunakan Vercel Dashboard (Rekomendasi)
1. Unggah / push folder proyek ini ke repositori akun **GitHub** atau **GitLab** Anda.
2. Buka dashboard [Vercel](https://vercel.com/) dan klik **"Add New..." > "Project"**.
3. Pilih repositori GitHub Anda dan klik **"Import"**.
4. Biarkan konfigurasi default (*Framework Preset: Other*), lalu klik tombol **"Deploy"**.
5. Website Anda akan langsung online dalam hitungan detik dengan domain gratis `.vercel.app` (serta dukungan custom domain).

### Cara 2: Menggunakan Vercel CLI di Terminal
Jika Anda telah memasang Node.js di komputer:
```bash
# Pasang Vercel CLI (jika belum ada)
npm i -g vercel

# Masuk ke direktori proyek dan deploy
vercel
```
Ikuti petunjuk di terminal (tekan Enter untuk opsi default).

---

## 📁 Struktur Berkas
```text
d:/VERCEL/
├── index.html        # Struktur semantik HTML5 lengkap dengan SEO & Open Graph
├── style.css         # Desain sistem responsif, glassmorphism, dan animasi CSS3
├── script.js         # Logika interaktif, canvas particle, 3D tilt, jam WIB & audio
├── vercel.json       # Konfigurasi routing & security headers untuk Vercel
├── favicon.svg       # Favicon kustom monogram "Z" bercahaya
└── README.md         # Dokumentasi proyek & panduan deployment
```
