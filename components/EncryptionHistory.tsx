import { HistoryItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, Trash2, Clock, Lock, Unlock, Key, FileText, Sparkles } from "lucide-react";
import { ALGORITHMS } from "@/lib/constants";
import { motion } from 'framer-motion';

interface EncryptionHistoryProps {
  history: HistoryItem[];
  onClear: () => void;
  onItemClick: (item: HistoryItem) => void;
}

export function EncryptionHistory({ history, onClear, onItemClick }: EncryptionHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 border-2 border-transparent hover:border-secondary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <CardHeader className="relative z-10">
          <motion.div
            className="flex items-center justify-between gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <motion.div
                  className="absolute inset-0 bg-secondary/30 rounded-full blur-md animate-pulse-glow"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <HistoryIcon className="relative w-8 h-8 text-secondary animate-float" />
              </motion.div>
              <div>
                <CardTitle className="text-xl md:text-2xl font-bold">Riwayat Enkripsi</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {history.length > 0 ? `${history.length} operasi tersimpan` : 'Belum ada riwayat'}
                </CardDescription>
              </div>
            </div>
            {history.length > 0 && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  className="hover:text-destructive hover:bg-destructive/10 transition-all duration-300 group/btn"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Trash2 className="h-4 w-4 sm:mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <span className="hidden sm:inline">Hapus Semua</span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          {history.length === 0 ? (
            <motion.div
              className="text-center py-12 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-6">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse-glow"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="relative bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8 border-2 border-dashed border-muted-foreground/20"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HistoryIcon className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4 animate-float" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">Riwayat Masih Kosong</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    Hasil enkripsi dan dekripsi Anda akan ditampilkan di sini. 
                    <br />
                    Mulai dengan memproses teks pertama Anda!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {history.map((item, index) => {
                const algorithmLabel = ALGORITHMS.find(a => a.value === item.algorithm)?.label || item.algorithm;
                const isEncrypt = item.operation === 'encrypt';
                
                return (
                  <motion.div
                    key={item.id}
                    className="group/item relative overflow-hidden p-5 rounded-xl border-2 border-transparent hover:border-primary/20 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm"
                    onClick={() => onItemClick(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className="flex items-center justify-between mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              className={`absolute inset-0 ${isEncrypt ? 'bg-primary/30' : 'bg-secondary/30'} rounded-full blur-sm animate-pulse-glow`}
                              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            {isEncrypt ? (
                              <Lock className="relative w-5 h-5 text-primary" />
                            ) : (
                              <Unlock className="relative w-5 h-5 text-secondary" />
                            )}
                          </motion.div>
                          <div>
                            <span className="text-sm font-bold capitalize text-foreground">
                              {item.operation}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              ({algorithmLabel})
                            </span>
                          </div>
                        </div>
                        
                        <motion.div
                          className="flex items-center space-x-2 text-xs text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(item.timestamp).toLocaleString('id-ID', { 
                              dateStyle: 'short', 
                              timeStyle: 'short' 
                            })}
                          </span>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="flex items-start space-x-2">
                          <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground mb-1">
                              {isEncrypt ? 'Teks Asli:' : 'Teks Terenkripsi:'}
                            </p>
                            <p className="text-sm text-foreground truncate font-mono bg-muted/30 px-2 py-1 rounded">
                              {item.text}
                            </p>
                          </div>
                        </div>

                        {item.key && (
                          <div className="flex items-start space-x-2">
                            <Key className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-muted-foreground mb-1">Kunci:</p>
                              <p className="text-sm text-foreground truncate font-mono bg-muted/30 px-2 py-1 rounded">
                                {item.key}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>

                      <motion.div
                        className="mt-4 pt-3 border-t border-border/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Klik untuk memuat ulang
                          </p>
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Sparkles className="w-4 h-4 text-accent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          
          {history.length > 0 && (
            <motion.div
              className="mt-6 pt-4 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-center text-muted-foreground">
                Klik pada item riwayat untuk memuat ulang konfigurasi dan hasilnya
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}