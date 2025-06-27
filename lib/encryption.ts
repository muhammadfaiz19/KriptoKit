import CryptoJS from 'crypto-js';
import { AlgorithmType } from "./types";

export const encryptDecrypt = (
  algorithm: AlgorithmType,
  text: string,
  key: string,
  operation: 'encrypt' | 'decrypt'
): string => {
  switch (algorithm) {
    case 'caesar':
      const shift = parseInt(key, 10);
      if (isNaN(shift)) throw new Error("Kunci untuk Caesar Cipher harus berupa angka.");
      return caesarCipher(text, shift, operation);
    case 'vigenere':
      if (!/^[a-zA-Z]+$/.test(key)) throw new Error("Kunci untuk Vigenère Cipher hanya boleh berisi huruf.");
      return vigenereCipher(text, key, operation);
    case 'aes':
      return aesCipher(text, key, operation);
    case 'base64':
      return base64(text, operation);
    case 'rot13':
      return rot13(text);
    case 'atbash':
      return atbashCipher(text);
    default:
      throw new Error('Algoritma tidak dikenal');
  }
};

const caesarCipher = (text: string, shift: number, operation: 'encrypt' | 'decrypt'): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char.toLowerCase() < 'a' ? 65 : 97;
    const offset = operation === 'encrypt' ? shift : -shift;
    return String.fromCharCode(((char.charCodeAt(0) - base + offset) % 26 + 26) % 26 + base);
  });
};

const vigenereCipher = (text: string, key: string, operation: 'encrypt' | 'decrypt'): string => {
  let result = '';
  const keyLength = key.length;
  if (keyLength === 0) return text;
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[a-zA-Z]/.test(char)) {
      const base = char < 'a' ? 65 : 97;
      const keyChar = key[keyIndex % keyLength].toLowerCase();
      const keyOffset = keyChar.charCodeAt(0) - 97;
      const offset = operation === 'encrypt' ? keyOffset : -keyOffset;
      result += String.fromCharCode(((char.charCodeAt(0) - base + offset + 26) % 26) + base);
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
};

const aesCipher = (text: string, key: string, operation: 'encrypt' | 'decrypt'): string => {
  try {
    if (operation === 'encrypt') {
      return CryptoJS.AES.encrypt(text, key).toString();
    } else {
      const bytes = CryptoJS.AES.decrypt(text, key);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        return 'Dekripsi gagal. Kunci salah atau data korup.';
      }
      return decryptedText;
    }
  } catch (error) {
    console.error("AES Error:", error);
    return 'Terjadi error selama proses AES.';
  }
};

const base64 = (text: string, operation: 'encrypt' | 'decrypt'): string => {
  try {
    if (operation === 'encrypt') {
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    } else {
      return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);
    }
  } catch (error) {
    console.error("Base64 Error:", error);
    return 'Input bukan format Base64 yang valid.';
  }
};

const rot13 = (text: string): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char < 'a' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
};

const atbashCipher = (text: string): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char < 'a' ? 65 : 97;
    return String.fromCharCode(25 - (char.charCodeAt(0) - base) + base);
  });
};