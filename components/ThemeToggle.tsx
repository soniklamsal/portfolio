'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="theme-toggle" aria-label="Toggle theme">
                <div className="theme-toggle__icon">
                    <HiSun size={20} />
                </div>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle"
            aria-label="Toggle theme"
        >
            <div className="theme-toggle__icon">
                {theme === 'dark' ? (
                    <HiSun size={20} className="theme-toggle__sun" />
                ) : (
                    <HiMoon size={20} className="theme-toggle__moon" />
                )}
            </div>
        </button>
    );
}
