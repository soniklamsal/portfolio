import Image from 'next/image';

export default function Perfil() {
    return (
        <div className="perfil">
            <Image
                src="/home-perfil.png"
                alt="Sonik Lamsal"
                width={300}
                height={300}
                className="perfil__img"
            />
            <h1 className="perfil__name">
                Sonik <br /> Lamsal
            </h1>
            <p className="perfil__title">FULLSTACK WEB DEVELOPER</p>
            <div className="perfil__buttons">
                <a href="#projects" className="button">
                    Projects
                </a>
                <a href="#contact" className="button">
                    Contact
                </a>
            </div>
        </div>
    );
}
