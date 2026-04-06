import { HiDownload } from 'react-icons/hi';

export default function Info() {
    return (
        <div className="info">
            <h2 className="info__name">Sonik Lamsal</h2>
            <p className="info__description">
                Full Stack Web Developer with hands-on experience in Next.js, Node.js, Express.js, MongoDB, and TypeScript.
                Skilled in building responsive, scalable web applications, integrating payment systems, and managing dynamic
                content with Headless CMS. Passionate about creating user-focused solutions and contributing to collaborative
                full-stack projects.
            </p>
            <a href="/Sonik-Lamsal-CV.pdf" download className="button">
                <HiDownload size={18} />
                Download CV
            </a>
        </div>
    );
}
