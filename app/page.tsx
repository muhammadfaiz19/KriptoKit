'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EncryptionForm } from '@/components/EncryptionForm';
import { ResultDisplay } from '@/components/ResultDisplay';
import { EncryptionHistory } from '@/components/EncryptionHistory';
import { ThemeToggle } from '@/components/ThemeToggle';
import { encryptDecrypt } from '@/lib/encryption';
import { HistoryItem } from '@/lib/types';
import { toast } from 'sonner';
import { ALGORITHMS } from '@/lib/constants';
import { formSchema, EncryptionFormValues } from '@/lib/schemas';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { motion } from 'framer-motion';

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
      operation: 'encrypt',
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
          toast.error('Terjadi kesalahan saat memproses.');
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
    form.reset();
  };

  return (
    <motion.main
      className="container max-w-7xl mx-auto px-4 py-6 md:py-12 lg:py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className="flex flex-col sm:flex-row items-center justify-between mb-8 md:mb-12 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-center sm:text-left">
          <motion.h1
            className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            KriptoKit
          </motion.h1>
          <motion.p
            className="mt-2 text-muted-foreground text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Alat enkripsi & dekripsi modern, cepat, dan aman.
          </motion.p>
        </div>
        <ThemeToggle />
      </motion.header>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className="lg:col-span-3 space-y-6 md:space-y-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <EncryptionForm form={form} onSubmit={handleSubmit} isLoading={isLoading} />
          {(result || isLoading) && (
            <ResultDisplay result={result} onReset={handleResetResult} timeTaken={timeTaken} />
          )}
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="lg:sticky lg:top-16">
            <EncryptionHistory
              history={history}
              onClear={handleClearHistory}
              onItemClick={handleHistoryItemClick}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.footer
        className="mt-12 md:mt-16 py-6 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/mあなたのgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            Muhammad Faiz
          </a>. All rights reserved.
        </p>
      </motion.footer>
    </motion.main>
  );
}