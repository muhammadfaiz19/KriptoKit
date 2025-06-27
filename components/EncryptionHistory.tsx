
import { HistoryItem } from "../lib/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { History as HistoryIcon, Trash2 } from "lucide-react"; 
import { ALGORITHMS } from "../lib/constants";

interface EncryptionHistoryProps {
    history: HistoryItem[];
    onClear: () => void;
    onItemClick: (item: HistoryItem) => void;
}

export function EncryptionHistory({ history, onClear, onItemClick }: EncryptionHistoryProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <HistoryIcon className="h-6 w-6 flex-shrink-0" />
                        <CardTitle>Riwayat</CardTitle>
                    </div>
                    {history.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={onClear}>
                            <Trash2 className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Hapus</span>
                        </Button>
                    )}
                </div>
                <CardDescription>
                    Klik item untuk memuat ulang konfigurasi dan hasilnya.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {history.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12 px-4 border-2 border-dashed rounded-lg">
                        <HistoryIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold">Riwayat Kosong</h3>
                        <p className="mt-1 text-sm">Hasil proses enkripsi Anda akan muncul di sini.</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[40vh] md:max-h-[500px] overflow-y-auto pr-2">
                        {history.map((item) => { 
                            const algorithmLabel = ALGORITHMS.find(a => a.value === item.algorithm)?.label || item.algorithm;
                            return (
                                <div
                                    key={item.id}
                                    className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                                    onClick={() => onItemClick(item)}
                                    title="Klik untuk memuat ulang"
                                >
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold capitalize">{item.operation} <span className="font-normal text-muted-foreground">({algorithmLabel})</span></span>
                                        <span className="text-muted-foreground">
                                            {new Date(item.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate pt-1">
                                        <span className="font-medium text-foreground">Input:</span> {item.text}
                                    </p>
                                    {item.key && (
                                        <p className="text-sm text-muted-foreground truncate">
                                            <span className="font-medium text-foreground">Kunci:</span> {item.key}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}