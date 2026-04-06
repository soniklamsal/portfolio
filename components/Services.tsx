'use client';

import { FaCode, FaDatabase, FaCreditCard, FaServer, FaPalette } from 'react-icons/fa';
import { MdChat } from 'react-icons/md';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                },
                defaults: { ease: 'power3.out' }
            });

            // Section fade in
            tl.fromTo(
                sectionRef.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9
                }
            );

            // Title animation with blur
            tl.fromTo(
                titleRef.current,
                {
                    y: 30,
                    opacity: 0,
                    filter: 'blur(8px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: 'expo.out'
                },
                '-=0.5'
            );

            // Service cards grid animation
            const cards = Array.from(containerRef.current?.children || []);

            cards.forEach((card, index) => {
                const icon = card.querySelector('.services__icon');
                const name = card.querySelector('.services__name');
                const description = card.querySelector('.services__description');

                // Card entrance - locking into place
                tl.fromTo(
                    card,
                    {
                        y: 40,
                        opacity: 0,
                        scale: 0.96
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        ease: 'expo.out'
                    },
                    `-=${0.5 - index * 0.1}`
                );

                // Icon animation with subtle rotation
                if (icon) {
                    tl.fromTo(
                        icon,
                        {
                            scale: 0.8,
                            opacity: 0,
                            rotation: -5
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            rotation: 0,
                            duration: 0.6,
                            ease: 'back.out(1.2)'
                        },
                        `-=${0.6}`
                    );
                }

                // Service name
                if (name) {
                    tl.fromTo(
                        name,
                        {
                            y: 15,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5
                        },
                        `-=${0.5}`
                    );
                }

                // Description
                if (description) {
                    tl.fromTo(
                        description,
                        {
                            y: 10,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5
                        },
                        `-=${0.45}`
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Subtle parallax tilt on mouse move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.querySelectorAll('.services__card--animated');

            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - cardCenterX) / rect.width;
                const deltaY = (e.clientY - cardCenterY) / rect.height;

                gsap.to(card, {
                    rotateY: deltaX * 2,
                    rotateX: -deltaY * 2,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        };

        const handleMouseLeave = () => {
            const cards = document.querySelectorAll('.services__card--animated');
            cards.forEach((card) => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const services = [
        {
            id: 1,
            name: 'Full Stack Web Development',
            description: 'Building complete web applications from frontend to backend using Next.js, React, Node.js, Express.js, and MongoDB with TypeScript.',
            icon: FaCode
        },
        {
            id: 2,
            name: 'Headless CMS Integration',
            description: 'Implementing and integrating Headless CMS solutions like WordPress with modern frontend frameworks for dynamic content management.',
            icon: FaDatabase
        },
        {
            id: 3,
            name: 'Payment Gateway Integration',
            description: 'Integrating secure payment solutions including Stripe and eSewa for e-commerce and subscription-based applications.',
            icon: FaCreditCard
        },
        {
            id: 4,
            name: 'API Development',
            description: 'Creating robust REST APIs and GraphQL endpoints for scalable and efficient data communication between frontend and backend.',
            icon: FaServer
        },
        {
            id: 5,
            name: 'Responsive UI/UX Design',
            description: 'Designing and developing responsive, user-friendly interfaces with modern design principles using Tailwind CSS and custom styling.',
            icon: FaPalette
        },
        {
            id: 6,
            name: 'Real-time Features',
            description: 'Implementing real-time functionality like chat systems, notifications, and live updates using Firebase and WebSockets.',
            icon: MdChat
        },
    ];

    return (
        <section className="services section" id="services" ref={sectionRef}>
            <h2 className="section__title" ref={titleRef}>SERVICES I OFFER</h2>
            <div className="services__container container grid" ref={containerRef}>
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <article key={service.id} className="services__card services__card--animated">
                            <Icon className="services__icon" size={32} />
                            <h3 className="services__name">{service.name}</h3>
                            <p className="services__description">{service.description}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
