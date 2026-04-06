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

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power2.out' }
            });

            // Profile image animation - simple fade and scale
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
                }
            );

            // Name/title animation - simple fade up
            tl.fromTo(
                nameRef.current,
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4
                },
                '-=0.3'
            );

            // Contact details - staggered fade
            tl.fromTo(
                contactRef.current?.children || [],
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.05
                },
                '-=0.2'
            );

            // Description text - simple fade
            tl.fromTo(
                descriptionRef.current,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.4
                },
                '-=0.2'
            );

            // Social icons - staggered fade
            tl.fromTo(
                socialRef.current?.children || [],
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.05
                },
                '-=0.2'
            );

            // Note text
            tl.fromTo(
                noteRef.current,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.3
                },
                '-=0.15'
            );

            // Buttons - staggered fade
            tl.fromTo(
                buttonsRef.current?.children || [],
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.05
                },
                '-=0.15'
            );
        }, containerRef);

        return () => ctx.revert();
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
                <span className="about__name-highlight">Sonik Lamsal</span> - <b>Fullstack Web Developer</b>
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
                <a href="/sonik___cv.pdf" download className="button button--secondary button--animated">
                    <HiDownload size={18} />
                    Download CV
                </a>
            </div>
        </div>
    );
}
