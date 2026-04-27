'use client';

import Image from 'next/image';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power2.out' }
            });

            // Name animation
            tl.fromTo(
                nameRef.current,
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6
                }
            );

            // Image animation
            tl.fromTo(
                imageRef.current,
                {
                    scale: 0.9,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6
                },
                '-=0.3'
            );

            // Description animation
            tl.fromTo(
                descriptionRef.current,
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5
                },
                '-=0.3'
            );

            // Social icons animation
            tl.fromTo(
                socialRef.current?.children || [],
                {
                    opacity: 0,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.1
                },
                '-=0.2'
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="about__container container" ref={containerRef}>
                <div className="about__content">
                    <h1 className="about__greeting" ref={nameRef}>
                        <div className="about__name-wrapper">
                            <span className="about__name-typewriter">Sonik Lamsal</span>
                        </div>
                    </h1>

                    <p className="about__description" ref={descriptionRef}>
                        Based in Kathmandu, Nepal. Experienced in developing full-stack web applications
                        using modern technologies like Next.js, React, Node.js, and MongoDB. Completed
                        internship at Sarvatra Inc, working on production projects with Headless CMS,
                        payment integrations, and collaborative development workflows.
                    </p>

                    <div className="about__social" ref={socialRef}>
                        <a
                            href="https://wa.me/9842416371"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about__social-link"
                            aria-label="Contact me on WhatsApp"
                        >
                            <FaWhatsapp size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/so%C3%B1ik-lmsl-965787289/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about__social-link"
                            aria-label="Connect with me on LinkedIn"
                        >
                            <FaLinkedin size={24} />
                        </a>
                        <a
                            href="https://github.com/soniklamsal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about__social-link"
                            aria-label="Check out my GitHub"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="mailto:soniklamsal111@gmail.com"
                            className="about__social-link"
                            aria-label="Send me an email"
                        >
                            <MdEmail size={24} />
                        </a>
                    </div>

                    <div className="about__buttons">
                        <a href="#contact" className="button button--animated">
                            Contact Me
                        </a>
                        <a href="/sonik___cv.pdf" download className="button button--secondary button--animated">
                            Download CV
                        </a>
                    </div>
                </div>

                <div className="about__image-desktop">
                    <div className="about__buttons about__buttons-desktop">
                        <a href="#contact" className="button button--animated">
                            Contact Me
                        </a>
                        <a href="/sonik___cv.pdf" download className="button button--secondary button--animated">
                            Download CV
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .about__name-typewriter {
                    border-right: 2px solid var(--white-color);
                    white-space: nowrap;
                    overflow: hidden;
                    display: inline-block;
                    animation: typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite;
                }

                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: var(--white-color); }
                }
            `}</style>
        </>
    );
}
