import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container container">
                <h2 className="footer__logo">Sonik Lamsal</h2>
                <p className="footer__tagline">Fullstack Web Developer</p>
                <div className="footer__social">
                    <a href="https://www.linkedin.com/in/so%C3%B1ik-lmsl-965787289/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                        <FaLinkedin size={24} />
                    </a>
                    <a href="https://github.com/soniklamsal" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                        <FaGithub size={24} />
                    </a>
                    <a href="mailto:soniklamsal111@gmail.com" className="footer__social-link">
                        <MdEmail size={24} />
                    </a>
                </div>
                <p className="footer__copy">
                    &#169; 2026 Sonik Lamsal. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
