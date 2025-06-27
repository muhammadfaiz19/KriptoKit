import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ResultDisplayProps {
  result: string;
  onReset: () => void;
  timeTaken: string;
}

export function ResultDisplay({ result, onReset, timeTaken }: ResultDisplayProps) {
  const handleCopy = () => {
    if (!result) {
      toast.error("Tidak ada hasil untuk disalin.");
      return;
    }
    navigator.clipboard.writeText(result);
    toast.success('Hasil berhasil disalin ke clipboard!');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Hasil</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Salin
          </Button>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-md min-h-[150px] whitespace-pre-wrap break-words font-mono text-sm">
          {result || 'Hasil proses enkripsi atau dekripsi akan ditampilkan di sini.'}
        </div>
      </CardContent>
      <CardFooter>
          <p className="text-xs text-muted-foreground">
            Waktu proses: {timeTaken} ms
          </p>
      </CardFooter>
    </Card>
  );
}