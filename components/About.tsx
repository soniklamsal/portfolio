'use client';

import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { HiDownload } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const noteRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' }
            });

            // Profile image animation - scale + blur effect
            tl.fromTo(
                imageRef.current,
                {
                    scale: 0.85,
                    opacity: 0,
                    filter: 'blur(10px)'
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'expo.out'
                }
            );

            // Name/title animation - fade in with upward motion
            tl.fromTo(
                nameRef.current,
                {
                    y: 30,
                    opacity: 0,
                    filter: 'blur(6px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8
                },
                '-=0.6'
            );

            // Contact details - staggered animation
            tl.fromTo(
                contactRef.current?.children || [],
                {
                    y: 20,
                    opacity: 0,
                    filter: 'blur(4px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.6,
                    stagger: 0.1
                },
                '-=0.4'
            );

            // Description text - fade in with delay
            tl.fromTo(
                descriptionRef.current,
                {
                    y: 20,
                    opacity: 0,
                    filter: 'blur(6px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8
                },
                '-=0.3'
            );

            // Social icons - staggered reveal
            tl.fromTo(
                socialRef.current?.children || [],
                {
                    scale: 0.8,
                    opacity: 0,
                    y: 15
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08
                },
                '-=0.4'
            );

            // Note text
            tl.fromTo(
                noteRef.current,
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                },
                '-=0.3'
            );

            // Buttons - staggered reveal
            tl.fromTo(
                buttonsRef.current?.children || [],
                {
                    y: 20,
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.12
                },
                '-=0.3'
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Subtle parallax effect on mouse move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!imageRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * 20;

            setMousePosition({ x, y });

            gsap.to(imageRef.current, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.8,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="about" ref={containerRef}>
            <div ref={imageRef} className="about__img-wrapper">
                <Image
                    src="/pp__.png"
                    alt="About Sonik"
                    width={200}
                    height={200}
                    className="about__img"
                />
            </div>

            <h3 className="about__name" ref={nameRef}>
                Sonik Lamsal - <b>Fullstack Web Developer</b>
            </h3>

            <div className="about__contact" ref={contactRef}>
                <p><MdLocationOn size={16} /> Baneshwor, Kathmandu</p>
                <p><MdPhone size={16} /> 9842416371</p>
                <p><MdEmail size={16} /> soniklamsal111@gmail.com</p>
            </div>

            <p className="about__description" ref={descriptionRef}>
                Based in Kathmandu, Nepal. Experienced in developing full-stack web applications
                using modern technologies like Next.js, React, Node.js, and MongoDB. Completed
                internship at Sarvatra Inc, working on production projects with Headless CMS,
                payment integrations, and collaborative development workflows.
            </p>

            <div className="about__links" ref={socialRef}>
                <a
                    href="https://www.linkedin.com/in/so%C3%B1ik-lmsl-965787289/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__link about__link--animated"
                >
                    <FaLinkedin size={24} />
                </a>
                <a
                    href="https://github.com/soniklamsal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__link about__link--animated"
                >
                    <FaGithub size={24} />
                </a>
                <a
                    href="mailto:soniklamsal111@gmail.com"
                    className="about__link about__link--animated"
                >
                    <MdEmail size={24} />
                </a>
            </div>

            <p className="about__note" ref={noteRef}>
                Open to freelance projects and full-time opportunities.
                Feel free to reach out via email or LinkedIn.
            </p>

            <div className="about__buttons" ref={buttonsRef}>
                <a href="#contact" className="button button--animated">
                    Contact Me
                </a>
                <a href="/Sonik-Lamsal-CV.pdf" download className="button button--secondary button--animated">
                    <HiDownload size={18} />
                    Download CV
                </a>
            </div>
        </div>
    );
}
