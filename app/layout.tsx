import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KriptoKit - Alat Kriptografi Modern",
  description:
    "Enkripsi dan dekripsi teks dengan algoritma kriptografi klasik dan modern secara mudah dan aman. Interface yang elegan dengan animasi smooth dan pengalaman pengguna yang luar biasa.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["kriptografi", "enkripsi", "dekripsi", "keamanan", "cipher", "aes", "rsa"],
  authors: [{ name: "Muhammad Faiz" }],
  creator: "Muhammad Faiz",
  openGraph: {
    title: "KriptoKit - Alat Kriptografi Modern",
    description: "Enkripsi dan dekripsi teks dengan algoritma kriptografi modern",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-float" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 blur-3xl animate-pulse-glow" />
            </div>
            
            {/* Grid pattern overlay */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
              }} />
            </div>

            <main className="relative z-10">
              {children}
            </main>
          </div>
          
          <Toaster 
            richColors 
            position="top-center" 
            expand={true}
            visibleToasts={5}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--card-foreground))',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}