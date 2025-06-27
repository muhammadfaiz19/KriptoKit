'use client';

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALGORITHMS } from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Lock, Unlock, Key, FileText, Cpu, Sparkles } from "lucide-react";
import { EncryptionFormValues } from "@/lib/schemas";

interface EncryptionFormProps {
  onSubmit: (values: EncryptionFormValues) => void;
  isLoading?: boolean;
  form: UseFormReturn<EncryptionFormValues>;
}

export function EncryptionForm({ onSubmit, isLoading, form }: EncryptionFormProps) {
  const selectedAlgorithm = form.watch('algorithm');
  const currentOperation = form.watch('operation');
  const currentAlgorithm = ALGORITHMS.find(a => a.value === selectedAlgorithm);

  return (
    <Card className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 border-2 border-transparent hover:border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      
      <CardHeader className="relative z-10 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse-glow"></div>
            <Cpu className="relative w-8 h-8 text-primary animate-float" />
          </div>
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Alat Kriptografi
            </CardTitle>
            <CardDescription className="text-base mt-1">
              Pilih algoritma, masukkan teks dan kunci untuk mengenkripsi atau mendekripsi dengan teknologi terdepan
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Algorithm Selection */}
            <FormField
              control={form.control}
              name="algorithm"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Algoritma Kriptografi
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('key', '');
                      form.clearErrors('key');
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm border-2 hover:border-primary/30 transition-all duration-300">
                        <SelectValue placeholder="Pilih algoritma kriptografi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="backdrop-blur-md bg-background/95 border-primary/20">
                      {ALGORITHMS.map((algorithm) => (
                        <SelectItem 
                          key={algorithm.value} 
                          value={algorithm.value}
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                            {algorithm.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {currentAlgorithm && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 animate-fade-in">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-primary">Info:</span> {currentAlgorithm.description}
                      </p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Operation Selection */}
            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base font-semibold">Pilih Operasi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <RadioGroupItem value="encrypt" id="encrypt" className="peer sr-only" />
                            <label
                              htmlFor="encrypt"
                              className="flex items-center justify-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:shadow-lg peer-checked:shadow-primary/20"
                            >
                              <Lock className="w-5 h-5 text-primary" />
                              <span className="font-medium">Enkripsi</span>
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <RadioGroupItem value="decrypt" id="decrypt" className="peer sr-only" />
                            <label
                              htmlFor="decrypt"
                              className="flex items-center justify-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:border-secondary/50 peer-checked:border-secondary peer-checked:bg-secondary/5 peer-checked:shadow-lg peer-checked:shadow-secondary/20"
                            >
                              <Unlock className="w-5 h-5 text-secondary" />
                              <span className="font-medium">Dekripsi</span>
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Key Input */}
            {currentAlgorithm?.requiresKey && (
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <Key className="w-5 h-5 text-accent" />
                      Kunci Enkripsi
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Input
                          placeholder={currentAlgorithm.keyPlaceholder}
                          className="h-12 pl-12 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm border-2 hover:border-accent/30 focus:border-accent transition-all duration-300"
                          {...field}
                        />
                        <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Text Input */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {currentOperation === 'encrypt' ? 'Teks Asli (Plaintext)' : 'Teks Terenkripsi (Ciphertext)'}
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Textarea
                        placeholder={
                          currentOperation === 'encrypt'
                            ? 'Masukkan teks yang akan dienkripsi di sini...'
                            : 'Masukkan teks terenkripsi yang akan didekripsi di sini...'
                        }
                        className="min-h-[180px] resize-y pl-12 pt-4 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-2 hover:border-primary/30 focus:border-primary transition-all duration-300 custom-scrollbar"
                        {...field}
                      />
                      <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 disabled:opacity-50 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Memproses Data...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  {currentOperation === 'encrypt' ? (
                    <Lock className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <Unlock className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  )}
                  <span>
                    {currentOperation === 'encrypt' ? 'Enkripsi Sekarang' : 'Dekripsi Sekarang'}
                  </span>
                  <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}