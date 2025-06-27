export type AlgorithmType =
  | 'caesar'
  | 'vigenere'
  | 'aes'
  | 'base64'
  | 'rot13'
  | 'atbash';

export interface HistoryItem {
  id: string;
  algorithm: AlgorithmType;
  text: string;
  key?: string;
  result: string;
  operation: 'encrypt' | 'decrypt';
  timestamp: Date;
}

export interface EncryptionFormValues {
  algorithm: AlgorithmType;
  text: string;
  key: string;
  operation: 'encrypt' | 'decrypt';
}