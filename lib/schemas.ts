import { z } from "zod";
import { ALGORITHMS } from "./constants";

export const formSchema = z.object({
    algorithm: z.enum(['caesar', 'vigenere', 'aes', 'base64', 'rot13', 'atbash']),
    text: z.string().min(1, "Teks tidak boleh kosong."),
    key: z.string().optional(),
    operation: z.enum(['encrypt', 'decrypt'])
}).superRefine((data, ctx) => {
    const algorithm = ALGORITHMS.find(a => a.value === data.algorithm);
    if (algorithm?.requiresKey && !data.key?.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kunci diperlukan untuk algoritma ini.",
            path: ["key"]
        });
    }
});

export type EncryptionFormValues = z.infer<typeof formSchema>;