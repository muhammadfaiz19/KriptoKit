import { AlgorithmType } from "./types";

export const ALGORITHMS: {
  value: AlgorithmType;
  label: string;
  description: string;
  requiresKey: boolean;
  keyPlaceholder: string;
}[] = [
    {
      value: 'aes',
      label: 'AES-256',
      description: 'Standar enkripsi simetris modern yang sangat kuat dan umum digunakan.',
      requiresKey: true,
      keyPlaceholder: 'Masukkan kunci rahasia'
    },
    {
      value: 'vigenere',
      label: 'Vigenère Cipher',
      description: 'Enkripsi polialfabetik yang menggunakan kata kunci untuk pergeseran.',
      requiresKey: true,
      keyPlaceholder: 'Masukkan kata kunci (huruf)'
    },
    {
      value: 'caesar',
      label: 'Caesar Cipher',
      description: 'Substitusi sederhana dengan menggeser huruf dalam alfabet.',
      requiresKey: true,
      keyPlaceholder: 'Masukkan jumlah pergeseran (angka)'
    },
    {
      value: 'base64',
      label: 'Base64 Encoding',
      description: 'Skema pengkodean untuk mengubah data biner menjadi teks ASCII.',
      requiresKey: false,
      keyPlaceholder: ''
    },
    {
      value: 'rot13',
      label: 'ROT13',
      description: 'Kasus khusus Caesar cipher dengan pergeseran tetap 13 posisi.',
      requiresKey: false,
      keyPlaceholder: ''
    },
    {
      value: 'atbash',
      label: 'Atbash Cipher',
      description: 'Substitusi sederhana di mana setiap huruf dipetakan ke kebalikannya.',
      requiresKey: false,
      keyPlaceholder: ''
    }
  ];