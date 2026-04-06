'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

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
                    duration: 0.4
                }
            );

            // Title animation with blur - slower and grounded
            tl.fromTo(
                titleRef.current,
                {
                    y: 30,
                    opacity: 0,
                    filter: 'blur(6px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.4
                },
                '-=0.35'
            );

            // Timeline line animation
            if (timelineRef.current) {
                tl.fromTo(
                    timelineRef.current,
                    {
                        height: 0
                    },
                    {
                        height: '100%',
                        duration: 0.5,
                        ease: 'power3.out'
                    },
                    '-=0.2'
                );
            }

            // Experience cards timeline reveal
            const cards = Array.from(containerRef.current?.children || []).filter(
                child => child.classList.contains('experience__card')
            );

            cards.forEach((card, index) => {
                const header = card.querySelector('.experience__header');
                const company = card.querySelector('.experience__company');
                const location = card.querySelector('.experience__location');
                const profession = card.querySelector('.experience__profession');
                const date = card.querySelector('.experience__date');
                const description = card.querySelector('.experience__description');

                // Card entrance - settling into place
                tl.fromTo(
                    card,
                    {
                        x: -20,
                        y: 30,
                        opacity: 0,
                        scale: 0.98
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5
                    },
                    `-=${0.6 - index * 0.14}`
                );

                // Company name and location
                if (company) {
                    tl.fromTo(
                        company,
                        {
                            x: -10,
                            opacity: 0
                        },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.4
                        },
                        `-=${0.6}`
                    );
                }

                if (location) {
                    tl.fromTo(
                        location,
                        {
                            opacity: 0
                        },
                        {
                            opacity: 1,
                            duration: 0.5
                        },
                        `-=${0.5}`
                    );
                }

                // Profession
                if (profession) {
                    tl.fromTo(
                        profession,
                        {
                            y: 10,
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

                // Date
                if (date) {
                    tl.fromTo(
                        date,
                        {
                            opacity: 0
                        },
                        {
                            opacity: 1,
                            duration: 0.5
                        },
                        `-=${0.45}`
                    );
                }

                // Description - with reading delay
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
                        `-=${0.3}`
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const experiences = [
        {
            id: 1,
            company: 'Sarvatra Inc',
            profession: 'Fullstack Web Development Intern',
            date: 'Jan 2026 - Mar 2026',
            location: 'Kathmandu, Nepal',
            description: 'Completed a 3-month Full Stack Web Development internship where I developed responsive web applications using Next.js, Node.js, Express.js, and MongoDB. Implemented dynamic content, payment integrations, state management, and collaborated with the team on production workflows while gaining experience with Headless CMS.'
        },
    ];

    return (
        <section className="experience section" id="experience" ref={sectionRef}>
            <h2 className="section__title" ref={titleRef}>EXPERIENCE</h2>
            <div className="experience__container container" ref={containerRef}>
                <div className="experience__timeline" ref={timelineRef}></div>
                {experiences.map((exp) => (
                    <article key={exp.id} className="experience__card experience__card--animated">
                        <div className="experience__header">
                            <h3 className="experience__company">{exp.company}</h3>
                            <span className="experience__location">{exp.location}</span>
                        </div>
                        <h4 className="experience__profession">{exp.profession}</h4>
                        <span className="experience__date">{exp.date}</span>
                        <p className="experience__description">{exp.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
