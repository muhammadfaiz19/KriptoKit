'use client';

import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ALGORITHMS } from "../lib/constants";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Loader2 } from "lucide-react";
import { EncryptionFormValues } from "@/lib/schemas"; 

interface EncryptionFormProps {
  onSubmit: (values: EncryptionFormValues) => void;
  isLoading?: boolean;
  form: UseFormReturn<EncryptionFormValues>;
}

export function EncryptionForm({ onSubmit, isLoading, form }: EncryptionFormProps) {
  const selectedAlgorithm = form.watch('algorithm');
  const currentAlgorithm = ALGORITHMS.find(a => a.value === selectedAlgorithm);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alat Kriptografi</CardTitle>
        <CardDescription>Pilih algoritma, masukkan teks dan kunci (jika perlu) untuk mengenkripsi atau mendekripsi.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="algorithm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Algoritma</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('key', '');
                    form.clearErrors('key');
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih algoritma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ALGORITHMS.map((algorithm) => (
                        <SelectItem key={algorithm.value} value={algorithm.value}>
                          {algorithm.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {currentAlgorithm && (
                    <p className="text-sm text-muted-foreground pt-2">
                      {currentAlgorithm.description}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Operasi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="encrypt" />
                        </FormControl>
                        <FormLabel className="font-normal">Enkripsi</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="decrypt" />
                        </FormControl>
                        <FormLabel className="font-normal">Dekripsi</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {currentAlgorithm?.requiresKey && (
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kunci</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={currentAlgorithm.keyPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch('operation') === 'encrypt'
                      ? 'Plaintext (Teks Asli)'
                      : 'Ciphertext (Teks Terenkripsi)'}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        form.watch('operation') === 'encrypt'
                          ? 'Masukkan teks yang akan dienkripsi...'
                          : 'Masukkan teks yang akan didekripsi...'
                      }
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Memproses...' : 'Proses Sekarang'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}