
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EncryptionForm } from '../components/EncryptionForm';
import { ResultDisplay } from '../components/ResultDisplay';
import { EncryptionHistory } from '../components/EncryptionHistory';
import { ThemeToggle } from '../components/ThemeToggle';
import { encryptDecrypt } from '../lib/encryption';
import { HistoryItem } from '../lib/types';
import { toast } from 'sonner';
import { ALGORITHMS } from '../lib/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formSchema, EncryptionFormValues } from '../lib/schemas';

export default function Home() {
  const [result, setResult] = useState('');
  const [timeTaken, setTimeTaken] = useState('0');
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('encryption-history', []);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EncryptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      algorithm: 'aes',
      text: '',
      key: '',
      operation: 'encrypt'
    },
  });

  const handleSubmit = (values: EncryptionFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const startTime = performance.now();
        const processedResult = encryptDecrypt(
          values.algorithm,
          values.text,
          values.key || '',
          values.operation
        );
        const endTime = performance.now();

        setTimeTaken((endTime - startTime).toFixed(2));
        setResult(processedResult);

        const newHistoryItem: HistoryItem = {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          ...values,
          key: values.key,
          result: processedResult,
        };

        setHistory((prev: HistoryItem[]) => [newHistoryItem, ...prev]);

        toast.success(
          `Teks berhasil di-${values.operation} dengan ${ALGORITHMS.find(a => a.value === values.algorithm)?.label}`
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Terjadi kesalahan yang tidak diketahui saat memproses.');
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast.success('Riwayat berhasil dihapus.');
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    form.reset({
      algorithm: item.algorithm,
      text: item.text,
      key: item.key || '',
      operation: item.operation,
    });
    setResult(item.result);
    toast.info("Data dari riwayat telah dimuat.");
  };

  const handleResetResult = () => {
    setResult('');
    setTimeTaken('0');
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">KriptoKit</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Alat enkripsi & dekripsi serbaguna.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        <div className="lg:col-span-3 space-y-6 md:space-y-8">
          <EncryptionForm
            form={form}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {(result || isLoading) && (
            <ResultDisplay
              result={result}
              onReset={handleResetResult}
              timeTaken={timeTaken}
            />
          )}
        </div>

        <div className="lg:col-span-2">
          <EncryptionHistory
            history={history}
            onClear={handleClearHistory}
            onItemClick={handleHistoryItemClick}
          />
        </div>
      </div>

      <footer className="mt-10 md:mt-16 py-6 text-center text-sm text-muted-foreground">
  <p>
    © {new Date().getFullYear()}{" "}
    <a
      href="https://github.com/muhammadfaiz19"
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4 hover:text-foreground transition-colors"
    >
      Muhammad Faiz
    </a>. All rights reserved.
  </p>
</footer>

    </main>
  );
}