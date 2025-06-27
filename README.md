# KriptoKit - Aplikasi Enkripsi dan Dekripsi

## Deskripsi Proyek
KriptoKit adalah aplikasi web yang dikembangkan untuk melakukan enkripsi dan dekripsi teks menggunakan algoritma kriptografi seperti AES. Proyek ini dibuat sebagai bagian dari tugas mata kuliah **Pengamanan Sistem Komputer** untuk mendemonstrasikan penerapan konsep kriptografi dalam lingkungan yang aman dan modern. Aplikasi ini menawarkan antarmuka pengguna yang intuitif, responsif, dan dilengkapi dengan animasi halus menggunakan Framer Motion untuk meningkatkan pengalaman pengguna.

## Tujuan Proyek
- Mengimplementasikan algoritma kriptografi untuk enkripsi dan dekripsi teks.
- Menyediakan alat yang mudah digunakan untuk simulasi proses kriptografi.
- Meningkatkan estetika antarmuka dengan animasi modern menggunakan Framer Motion.
- Mempelajari dan menerapkan praktik pengembangan web yang aman dan responsif.

## Fitur
- **Pilihan Algoritma**: Mendukung enkripsi dan dekripsi menggunakan algoritma AES (dapat diperluas dengan algoritma lain).
- **Operasi Enkripsi/Dekripsi**: Pilih antara enkripsi atau dekripsi dengan antarmuka yang ramah pengguna.
- **Input Kunci**: Mendukung input kunci untuk algoritma yang memerlukannya.
- **Riwayat Operasi**: Menyimpan riwayat operasi enkripsi/dekripsi dengan detail seperti algoritma, teks, kunci, dan hasil.
- **Statistik Proses**: Menampilkan waktu proses, jumlah karakter, dan jumlah kata dari hasil operasi.
- **Tema Dinamis**: Mendukung tema terang, gelap, dan sistem dengan toggle tema yang elegan.
- **Animasi Interaktif**: Animasi fade, slide, dan hover menggunakan Framer Motion untuk pengalaman visual yang menarik.
- **Responsif**: Antarmuka dioptimalkan untuk desktop dan perangkat mobile.
- **Notifikasi**: Feedback instan melalui toast notifikasi menggunakan Sonner.

## Teknologi yang Digunakan
- **Frontend**: Next.js 14 (React Framework), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui untuk komponen UI yang modern dan dapat disesuaikan
- **Animasi**: Framer Motion untuk efek visual seperti fade, slide, dan hover
- **Manajemen Formulir**: React Hook Form dengan validasi menggunakan Zod
- **Penyimpanan Lokal**: Custom hook `useLocalStorage` untuk menyimpan riwayat
- **Notifikasi**: Sonner untuk notifikasi toast
- **Ikona**: Lucide React untuk ikon yang estetis
- **Kriptografi**: Implementasi algoritma enkripsi/dekripsi menggunakan pustaka bawaan JavaScript

## Prasyarat
Sebelum menjalankan proyek, pastikan Anda memiliki:
- Node.js (versi 18 atau lebih baru)
- npm atau yarn sebagai package manager
- Git untuk mengkloning repositori

## Cara Menjalankan Proyek
1. **Kloning Repositori**
   ```bash
   git clone https://github.com/muhammadfaiz19/KriptoKit.git
   cd KriptoKit
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan Aplikasi**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

4. **Bangun untuk Produksi** (opsional)
   ```bash
   npm run build
   npm run start
   # atau
   yarn build
   yarn start
   ```

## Struktur Direktori
```
KriptoKit/
├── app/                    # Halaman utama Next.js
│   └── page.tsx
├── components/             # Komponen React
│   ├── EncryptionForm.tsx
│   ├── EncryptionHistory.tsx
│   ├── ResultDisplay.tsx
│   └── ThemeToggle.tsx
├── lib/                    # Utilitas dan konstanta
│   ├── constants.ts
│   ├── encryption.ts
│   ├── schemas.ts
│   └── types.ts
├── hooks/                  # Custom hooks
│   └── useLocalStorage.ts
├── styles/                 # Styling
│   └── global.css
├── public/                 # Aset statis
├── README.md               # Dokumentasi proyek
└── package.json            # Konfigurasi dependensi
```

## Cara Menggunakan
1. Buka aplikasi di browser (`http://localhost:3000`).
2. Pilih algoritma kriptografi (misalnya, AES) dari dropdown.
3. Pilih operasi (enkripsi atau dekripsi).
4. Masukkan kunci (jika diperlukan) dan teks yang akan diproses.
5. Klik tombol "Enkripsi Sekarang" atau "Dekripsi Sekarang" untuk memproses.
6. Lihat hasilnya di bagian "Hasil Proses", termasuk statistik seperti waktu proses, jumlah karakter, dan kata.
7. Riwayat operasi akan ditampilkan di sisi kanan (atau bawah pada perangkat mobile).
8. Klik item riwayat untuk memuat ulang konfigurasi sebelumnya.
9. Gunakan toggle tema untuk beralih antara tema terang, gelap, atau sistem.

## Kontribusi
Proyek ini dibuat untuk keperluan akademik, tetapi kontribusi tetap diterima! Untuk berkontribusi:
1. Fork repositori ini.
2. Buat branch baru (`git checkout -b fitur-baru`).
3. Lakukan perubahan dan commit (`git commit -m "Menambahkan fitur baru"`).
4. Push ke branch (`git push origin fitur-baru`).
5. Buat Pull Request di [GitHub](https://github.com/muhammadfaiz19/KriptoKit).


## Kontak
Jika ada pertanyaan atau saran, silakan hubungi melalui [GitHub Issues](https://github.com/muhammadfaiz19/KriptoKit/issues) atau email mfaiz2727@gmail.com.
