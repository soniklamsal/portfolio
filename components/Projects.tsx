'use client';

import Image from 'next/image';
import { HiArrowRight, HiX } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                },
                defaults: { ease: 'power2.out' }
            });

            // Section fade in
            tl.fromTo(
                sectionRef.current,
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                }
            );

            // Title animation
            tl.fromTo(
                titleRef.current,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                },
                '-=0.3'
            );

            // Project cards cascading animation
            const cards = Array.from(containerRef.current?.children || []);

            cards.forEach((card, index) => {
                const image = card.querySelector('.projects__img');
                const name = card.querySelector('.projects__name');
                const description = card.querySelector('.projects__description');
                const button = card.querySelector('.projects__button');

                // Card entrance
                tl.fromTo(
                    card,
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'expo.out'
                    },
                    `-=${0.6 - index * 0.15}`
                );

                // Image zoom out reveal
                if (image) {
                    tl.fromTo(
                        image,
                        {
                            scale: 1.1,
                            filter: 'brightness(0.7)'
                        },
                        {
                            scale: 1,
                            filter: 'brightness(1)',
                            duration: 0.7,
                            ease: 'power2.out'
                        },
                        `-=${0.8}`
                    );
                }

                // Content hierarchy animation
                if (name) {
                    tl.fromTo(
                        name,
                        {
                            y: 20,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.4
                        },
                        `-=${0.6}`
                    );
                }

                if (description) {
                    tl.fromTo(
                        description,
                        {
                            y: 15,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.4
                        },
                        `-=${0.5}`
                    );
                }

                if (button) {
                    tl.fromTo(
                        button,
                        {
                            y: 10,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5
                        },
                        `-=${0.4}`
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Modal animation
    useEffect(() => {
        if (isModalOpen && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                {
                    opacity: 0,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                }
            );
        }
    }, [isModalOpen]);

    const openModal = (videoSrc: string) => {
        setCurrentVideo(videoSrc);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideo(null);
        document.body.style.overflow = 'auto';
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleProjectClick = (e: React.MouseEvent, project: any) => {
        if (project.video) {
            e.preventDefault();
            openModal(project.video);
        }
    };

    const projects = [
        {
            id: 1,
            name: 'RWUA – Headless CMS Web Application',
            image: '/rwua_screenshot.jpg',
            description: 'Full-stack web application for women empowerment using Next.js, GraphQL, Apollo Client, and Faust.js. Implemented WordPress ACF for dynamic content management.',
            link: 'https://rwua-project.vercel.app/',
        },
        {
            id: 2,
            name: 'Ghumaudulau – Travel Booking Platform',
            image: '/ghumaudulau.jpg',
            description: 'Full-stack travel booking platform with Stripe payment integration, dynamic destination pages, and blog section. Built with modern UI/UX principles.',
            link: '#',
            video: 'https://res.cloudinary.com/dr54mqokd/video/upload/v1777817153/ghumaudulau___t1gy6o.mp4'
        },
        {
            id: 3,
            name: 'SajiloTravel – Nepal Tours & Travel',
            image: '/sajilotravels.jpg',
            description: 'MERN stack travel website inspired by Nepal tours and travel platforms. Features tour packages, booking system, and destination guides with responsive design.',
            link: '#',
            video: 'https://res.cloudinary.com/dr54mqokd/video/upload/v1777816425/sajilotravel_klrrbv.mp4'
        },
    ];

    return (
        <>
            <section className="projects section" id="projects" ref={sectionRef}>
                <h2 className="section__title" ref={titleRef}>RECENT PROJECTS</h2>
                <div className="projects__container container grid" ref={containerRef}>
                    {projects.map((project) => (
                        <article key={project.id} className="projects__card projects__card--animated">
                            <div className="projects__img-wrapper">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    width={400}
                                    height={300}
                                    className="projects__img"
                                />
                            </div>
                            <h3 className="projects__name">{project.name}</h3>
                            <p className="projects__description">{project.description}</p>
                            <a
                                href={project.link}
                                target={project.video ? undefined : "_blank"}
                                rel={project.video ? undefined : "noopener noreferrer"}
                                className="projects__button projects__button--animated"
                                onClick={(e) => handleProjectClick(e, project)}
                            >
                                <span>{project.video ? 'Watch Demo' : 'Visit Project'}</span>
                                <HiArrowRight className="projects__icon" />
                            </a>
                        </article>
                    ))}
                </div>
            </section>

            {/* Video Modal */}
            {isModalOpen && currentVideo && (
                <div className="video-modal" onClick={closeModal}>
                    <div className="video-modal__overlay"></div>
                    <div
                        className="video-modal__content"
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="video-modal__close"
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            <HiX size={24} />
                        </button>
                        <video
                            ref={videoRef}
                            controls
                            autoPlay
                            className="video-modal__video"
                        >
                            <source src={currentVideo} type="video/mp4" />
                            <source src={currentVideo.replace('.mp4', '.webm')} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </>
    );
}
