'use client';

import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
    const [activeLink, setActiveLink] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');

        const scrollActive = () => {
            const scrollY = window.scrollY;

            sections.forEach(current => {
                const sectionHeight = (current as HTMLElement).offsetHeight;
                const sectionTop = (current as HTMLElement).offsetTop - 150;
                const sectionId = current.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    setActiveLink(sectionId || 'home');
                }
            });
        };

        window.addEventListener('scroll', scrollActive);
        return () => window.removeEventListener('scroll', scrollActive);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        setIsMenuOpen(false);

        const section = document.getElementById(link);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="nav-modern">
            <div className="nav-modern__container">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => handleLinkClick(e, 'home')}
                    className="nav-modern__logo"
                >
                    <Image
                        src="/pp___.jpeg"
                        alt="Sonik Lamsal"
                        width={40}
                        height={40}
                        className="nav-modern__logo-img"
                    />
                </a>

                {/* Desktop Navigation */}
                <ul className="nav-modern__menu">
                    {[
                        { id: 'home', label: 'Home' },
                        { id: 'skills', label: 'Skills' },
                        { id: 'projects', label: 'Projects' },
                        { id: 'services', label: 'Services' },
                        { id: 'experience', label: 'Experience' },
                        { id: 'contact', label: 'Contact' }
                    ].map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-modern__link ${activeLink === item.id ? 'nav-modern__link--active' : ''}`}
                                onClick={(e) => handleLinkClick(e, item.id)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className="nav-modern__actions">
                    <ThemeToggle />
                    <button
                        onClick={toggleMenu}
                        className="nav-modern__toggle"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`nav-modern__mobile ${isMenuOpen ? 'nav-modern__mobile--open' : ''}`}>
                <ul className="nav-modern__mobile-menu">
                    {[
                        { id: 'home', label: 'Home' },
                        { id: 'skills', label: 'Skills' },
                        { id: 'projects', label: 'Projects' },
                        { id: 'services', label: 'Services' },
                        { id: 'experience', label: 'Experience' },
                        { id: 'contact', label: 'Contact' }
                    ].map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-modern__mobile-link ${activeLink === item.id ? 'nav-modern__mobile-link--active' : ''}`}
                                onClick={(e) => handleLinkClick(e, item.id)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
