import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, CheckCircle, FileText, Zap, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from 'framer-motion';

interface ResultDisplayProps {
  result: string;
  onReset: () => void;
  timeTaken: string;
}

export function ResultDisplay({ result, onReset, timeTaken }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) {
      toast.error("Tidak ada hasil untuk disalin.");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success('Hasil berhasil disalin ke clipboard!');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
      toast.error('Gagal menyalin ke clipboard.');
    }
  };

  const wordCount = result ? result.split(/\s+/).filter(word => word.length > 0).length : 0;
  const charCount = result ? result.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 border-2 border-transparent hover:border-accent/20 shadow-xl hover:shadow-2xl transition-all duration-500">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
        
        <CardHeader className="relative z-10 pb-4">
          <motion.div
            className="flex items-center justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-accent/30 rounded-full blur-md animate-pulse-glow"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <FileText className="relative w-8 h-8 text-accent animate-float" />
              </motion.div>
              <div>
                <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  Hasil Proses
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {result ? 'Proses berhasil diselesaikan' : 'Menunggu hasil proses...'}
                </p>
              </div>
            </div>
            
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!result}
                  className="relative hover:bg-accent hover:text-accent-foreground hover:border-accent/50 transition-all duration-300 group/btn disabled:opacity-50"
                >
                  <motion.div
                    className="flex items-center space-x-2"
                    initial={{ scale: 1 }}
                    animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-500 animate-scale-in" />
                    ) : (
                      <Copy className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    )}
                    <span className="hidden sm:inline">
                      {copied ? 'Tersalin!' : 'Salin'}
                    </span>
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onReset}
                  className="hover:text-destructive hover:bg-destructive/10 transition-all duration-300 group/btn"
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RefreshCw className="h-4 w-4 sm:mr-2 group-hover/btn:rotate-180 group-hover/btn:scale-110 transition-all duration-300" />
                  </motion.div>
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-4">
          <motion.div
            className="relative group/content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl blur-sm opacity-0 group-hover/content:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="relative p-6 bg-gradient-to-br from-mute

d/50 to-muted/30 rounded-xl min-h-[200px] border-2 border-muted-foreground/10 hover:border-accent/20 transition-all duration-300 animate-fade-in backdrop-blur-sm"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {result ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
                    {result}
                  </div>
                  <motion.div
                    className="flex items-center space-x-2 opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"></div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    </motion.div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"></div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl animate-pulse-glow"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="relative bg-gradient-to-br from-muted/30 to-muted/20 rounded-xl p-6 border border-dashed border-muted-foreground/30"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3 animate-float" />
                      </motion.div>
                      <p className="text-muted-foreground font-medium">
                        Hasil proses akan ditampilkan di sini
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        Pilih algoritma dan masukkan teks untuk memulai
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {result && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <motion.div
                    className="absolute inset-0 bg-primary/30 rounded-full blur-sm animate-pulse-glow"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Clock className="relative w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground">Waktu Proses</p>
                  <p className="font-semibold text-sm">{timeTaken} ms</p>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-secondary/5 to-secondary/10 border border-secondary/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <motion.div
                    className="absolute inset-0 bg-secondary/30 rounded-full blur-sm animate-pulse-glow"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <FileText className="relative w-5 h-5 text-secondary" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground">Karakter</p>
                  <p className="font-semibold text-sm">{charCount.toLocaleString('id-ID')}</p>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <motion.div
                    className="absolute inset-0 bg-accent/30 rounded-full blur-sm animate-pulse-glow"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Zap className="relative w-5 h-5 text-accent" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground">Kata</p>
                  <p className="font-semibold text-sm">{wordCount.toLocaleString('id-ID')}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
        
        {result && (
          <motion.div
            className="relative z-10 pt-4 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <p className="text-xs text-muted-foreground flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Proses berhasil diselesaikan</span>
                </p>
                <motion.div
                  className="flex items-center space-x-2 text-xs text-muted-foreground"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                  <span>Siap untuk disalin atau diproses ulang</span>
                </motion.div>
              </div>
            </CardFooter>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}