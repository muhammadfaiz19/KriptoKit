import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, CheckCircle, FileText, Zap, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

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
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error)
      toast.error('Gagal menyalin ke clipboard.');
    }
  };

  const wordCount = result ? result.split(/\s+/).filter(word => word.length > 0).length : 0;
  const charCount = result ? result.length : 0;

  return (
    <Card className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 border-2 border-transparent hover:border-accent/20 shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-md animate-pulse-glow"></div>
              <FileText className="relative w-8 h-8 text-accent animate-float" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                Hasil Proses
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {result ? 'Proses berhasil diselesaikan' : 'Menunggu hasil proses...'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!result}
              className="relative hover:bg-accent hover:text-accent-foreground hover:border-accent/50 transition-all duration-300 group/btn disabled:opacity-50"
            >
              <div className="flex items-center space-x-2">
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500 animate-scale-in" />
                ) : (
                  <Copy className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                )}
                <span className="hidden sm:inline">
                  {copied ? 'Tersalin!' : 'Salin'}
                </span>
              </div>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="hover:text-destructive hover:bg-destructive/10 transition-all duration-300 group/btn"
            >
              <RefreshCw className="h-4 w-4 sm:mr-2 group-hover/btn:rotate-180 group-hover/btn:scale-110 transition-all duration-300" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-4">
        {/* Main result display */}
        <div className="relative group/content">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl blur-sm opacity-0 group-hover/content:opacity-100 transition-opacity duration-300"></div>
          <div className="relative p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl min-h-[200px] border-2 border-muted-foreground/10 hover:border-accent/20 transition-all duration-300 animate-fade-in backdrop-blur-sm">
            {result ? (
              <div className="space-y-4">
                {/* Result text */}
                <div className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
                  {result}
                </div>
                
                {/* Visual separator */}
                <div className="flex items-center space-x-2 opacity-50">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"></div>
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl animate-pulse-glow"></div>
                  <div className="relative bg-gradient-to-br from-muted/30 to-muted/20 rounded-xl p-6 border border-dashed border-muted-foreground/30">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3 animate-float" />
                    <p className="text-muted-foreground font-medium">
                      Hasil proses akan ditampilkan di sini
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-2">
                      Pilih algoritma dan masukkan teks untuk memulai
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm animate-pulse-glow"></div>
                <Clock className="relative w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Waktu Proses</p>
                <p className="font-semibold text-sm">{timeTaken} ms</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-secondary/5 to-secondary/10 border border-secondary/20">
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/30 rounded-full blur-sm animate-pulse-glow"></div>
                <FileText className="relative w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Karakter</p>
                <p className="font-semibold text-sm">{charCount.toLocaleString('id-ID')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-sm animate-pulse-glow"></div>
                <Zap className="relative w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Kata</p>
                <p className="font-semibold text-sm">{wordCount.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {result && (
        <CardFooter className="relative z-10 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between w-full">
            <p className="text-xs text-muted-foreground flex items-center space-x-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Proses berhasil diselesaikan</span>
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-accent animate-pulse" />
              <span>Siap untuk disalin atau diproses ulang</span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}