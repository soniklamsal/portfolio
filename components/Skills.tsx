'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                },
                defaults: { ease: 'power3.out' }
            });

            // Section container fade in
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

            // Title animation with blur
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
                    duration: 0.5
                },
                '-=0.25'
            );

            // Description animation
            tl.fromTo(
                descriptionRef.current,
                {
                    y: 20,
                    opacity: 0,
                    filter: 'blur(4px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.5
                },
                '-=0.3'
            );

            // Category cards animation with stagger
            const categories = Array.from(categoriesRef.current?.children || []);

            tl.fromTo(
                categories,
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.96,
                    filter: 'blur(4px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.5,
                    stagger: 0.08
                },
                '-=0.25'
            );

            // Animate inner content of each category
            categories.forEach((category, index) => {
                const heading = category.querySelector('h4');
                const paragraph = category.querySelector('p');

                if (heading) {
                    tl.fromTo(
                        heading,
                        {
                            y: 15,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5
                        },
                        `-=${0.5 - index * 0.12}`
                    );
                }

                if (paragraph) {
                    tl.fromTo(
                        paragraph,
                        {
                            y: 10,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.5
                        },
                        `-=${0.4 - index * 0.12}`
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const skills = [
        {
            id: 1,
            category: 'Frontend',
            items: 'Next.js, React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS'
        },
        {
            id: 2,
            category: 'Backend',
            items: 'Node.js, Express.js, REST APIs, GraphQL'
        },
        {
            id: 3,
            category: 'Database',
            items: 'MongoDB, Firebase'
        },
        {
            id: 4,
            category: 'State Management',
            items: 'Zustand, Redux'
        },
        {
            id: 5,
            category: 'CMS & Tools',
            items: 'WordPress (Headless), ACF, Postman, Cloudinary, Git/GitHub, Jest'
        },
    ];

    return (
        <div className="skills" ref={sectionRef}>
            <h3 className="skills__title" ref={titleRef}>Technical Skills</h3>
            <p className="skills__description" ref={descriptionRef}>
                Proficient in modern web technologies including TypeScript, JavaScript, Next.js, React,
                Node.js, Express.js, MongoDB, GraphQL, REST APIs, and more.
            </p>
            <div className="skills__list" ref={categoriesRef}>
                {skills.map((skill) => (
                    <div key={skill.id} className="skills__category skills__category--animated">
                        <h4>{skill.category}</h4>
                        <p>{skill.items}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
