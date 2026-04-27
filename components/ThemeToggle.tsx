'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="theme-toggle-shadcn"
                aria-label="Toggle theme"
                disabled
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="theme-toggle-shadcn"
            aria-label="Toggle theme"
        >
            <Sun
                className="h-[1.2rem] w-[1.2rem] transition-all"
                style={{
                    transform: isDark ? 'rotate(-90deg) scale(0)' : 'rotate(0deg) scale(1)',
                    opacity: isDark ? 0 : 1
                }}
            />
            <Moon
                className="absolute h-[1.2rem] w-[1.2rem] transition-all"
                style={{
                    transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
                    opacity: isDark ? 1 : 0
                }}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
