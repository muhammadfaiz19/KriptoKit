'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor, Palette, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

const themes = [
  {
    key: 'light',
    label: 'Tema Terang',
    desc: 'Tampilan cerah dan bersih',
    icon: <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />,
    bg: 'bg-amber-500/30',
    hover: 'hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-950/20 dark:hover:to-orange-950/20',
    pulse: 'bg-amber-500',
  },
  {
    key: 'dark',
    label: 'Tema Gelap',
    desc: 'Tampilan gelap dan elegan',
    icon: <Moon className="w-4 h-4 text-blue-400 group-hover:-rotate-12 transition-transform duration-300" />,
    bg: 'bg-blue-400/30',
    hover: 'hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20',
    pulse: 'bg-blue-400',
  },
  {
    key: 'system',
    label: 'Tema Sistem',
    desc: 'Ikuti pengaturan perangkat',
    icon: <Monitor className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />,
    bg: 'bg-primary/30',
    hover: 'hover:from-primary/5 hover:to-secondary/5',
    pulse: 'bg-primary',
  },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        className="bg-background/50 border-2 border-transparent hover:border-primary/20 transition-all duration-300"
      >
        <div className="h-[1.2rem] w-[1.2rem] rounded-full bg-muted animate-pulse" />
        <span className="sr-only">Loading tema...</span>
      </Button>
    )
  }

  const currentIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      light: <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />,
      dark: <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />,
      system: <Monitor className="h-[1.2rem] w-[1.2rem] text-primary" />,
    }
    return iconMap[theme as string] ?? iconMap.system
  }

  const currentLabel = {
    light: 'Tema Terang',
    dark: 'Tema Gelap',
    system: 'Tema Sistem',
  }[theme as string] ?? 'Tema Sistem'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            size="icon"
            className="group relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border-2 border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
            <motion.div
              className="relative z-10 group-hover:scale-110 transition-all duration-300"
              animate={{ rotate: theme === 'light' ? 360 : theme === 'dark' ? -360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentIcon()}
            </motion.div>
            <Sparkles className="absolute top-1 right-1 h-2 w-2 text-accent opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-300" />
            <span className="sr-only">Toggle tema</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-md border-2 border-border/50 shadow-xl"
      >
        <DropdownMenuLabel className="flex items-center space-x-2 text-sm font-semibold">
          <Palette className="w-4 h-4 text-primary" />
          <span>Pilih Tema</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent" />

        {themes.map(({ key, label, desc, icon, bg, hover, pulse }) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key)}
            className={`group flex items-center space-x-3 px-3 py-2 cursor-pointer ${hover} transition-all duration-200 rounded-md`}
          >
            <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <motion.div
                className={`absolute inset-0 ${bg} rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              {icon}
            </motion.div>
            <div className="flex-1">
              <span className="font-medium">{label}</span>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            {theme === key && (
              <motion.div
                className={`w-2 h-2 rounded-full ${pulse} animate-pulse`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="px-3 py-2 text-xs text-muted-foreground flex justify-between">
          <span>Tema Aktif:</span>
          <span className="font-medium text-foreground">{currentLabel}</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
