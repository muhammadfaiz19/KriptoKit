'use client';

import * as React from "react";
import { Moon, Sun, Monitor, Palette, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="relative bg-background/50 border-2 border-transparent hover:border-primary/20 transition-all duration-300"
        disabled
      >
        <div className="h-[1.2rem] w-[1.2rem] rounded-full bg-muted animate-pulse" />
        <span className="sr-only">Loading tema...</span>
      </Button>
    );
  }

  const getCurrentIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />;
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />;
      default:
        return <Monitor className="h-[1.2rem] w-[1.2rem] text-primary" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Tema Terang';
      case 'dark':
        return 'Tema Gelap';
      default:
        return 'Tema Sistem';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="group relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-2 border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon container with smooth transitions */}
          <div className="relative z-10 transition-all duration-300 group-hover:scale-110">
            {getCurrentIcon()}
          </div>
          
          {/* Sparkle effect on hover */}
          <Sparkles className="absolute top-1 right-1 h-2 w-2 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
          
          <span className="sr-only">Toggle tema</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-md border-2 border-border/50 shadow-xl animate-fade-in"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center space-x-2 text-sm font-semibold">
          <Palette className="w-4 h-4 text-primary" />
          <span>Pilih Tema</span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className="group flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-950/20 dark:hover:to-orange-950/20 transition-all duration-200 rounded-md"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sun className="relative w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex-1">
            <span className="font-medium">Tema Terang</span>
            <p className="text-xs text-muted-foreground">Tampilan cerah dan bersih</p>
          </div>
          {theme === 'light' && (
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className="group flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20 transition-all duration-200 rounded-md"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Moon className="relative w-4 h-4 text-blue-400 group-hover:-rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex-1">
            <span className="font-medium">Tema Gelap</span>
            <p className="text-xs text-muted-foreground">Tampilan gelap dan elegan</p>
          </div>
          {theme === 'dark' && (
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="group flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 rounded-md"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Monitor className="relative w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex-1">
            <span className="font-medium">Tema Sistem</span>
            <p className="text-xs text-muted-foreground">Ikuti pengaturan perangkat</p>
          </div>
          {theme === 'system' && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="px-3 py-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Tema Aktif:</span>
            <span className="font-medium text-foreground">{getThemeLabel()}</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}