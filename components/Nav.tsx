'use client';

import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
    const [activeLink, setActiveLink] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');

        const scrollActive = () => {
            const scrollY = window.scrollY;

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 150;
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
        <nav className="nav">
            <div className="nav__container container">
                <button className="nav__toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
                <ThemeToggle />
                <ul className={`nav__list ${isMenuOpen ? 'nav__list--open' : ''}`}>
                    <li>
                        <a
                            href="#home"
                            className={`nav__link ${activeLink === 'home' ? 'active-link' : ''}`}
                            onClick={(e) => handleLinkClick(e, 'home')}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#projects"
                            className={`nav__link ${activeLink === 'projects' ? 'active-link' : ''}`}
                            onClick={(e) => handleLinkClick(e, 'projects')}
                        >
                            Projects
                        </a>
                    </li>
                    <li>
                        <a
                            href="#services"
                            className={`nav__link ${activeLink === 'services' ? 'active-link' : ''}`}
                            onClick={(e) => handleLinkClick(e, 'services')}
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="#experience"
                            className={`nav__link ${activeLink === 'experience' ? 'active-link' : ''}`}
                            onClick={(e) => handleLinkClick(e, 'experience')}
                        >
                            Experience
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className={`nav__link ${activeLink === 'contact' ? 'active-link' : ''}`}
                            onClick={(e) => handleLinkClick(e, 'contact')}
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
