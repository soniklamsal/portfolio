'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState<'success' | 'error'>('success');
    const [isLoading, setIsLoading] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const statusRef = useRef<HTMLParagraphElement>(null);

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
                    duration: 0.6
                }
            );

            // Title animation - soft and welcoming
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
                '-=0.3'
            );

            // Form inputs sequential reveal
            const formElements = formRef.current?.querySelectorAll('.contact__input, .contact__button');

            if (formElements) {
                tl.fromTo(
                    Array.from(formElements),
                    {
                        y: 25,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.07
                    },
                    '-=0.4'
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Input focus animations
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1.01,
            borderColor: 'var(--first-color)',
            boxShadow: '0 4px 12px rgba(255, 59, 59, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1,
            borderColor: 'transparent',
            boxShadow: '0 0 0 rgba(255, 59, 59, 0)',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Button press effect
        const button = e.currentTarget.querySelector('.contact__button');
        if (button) {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }

        setIsLoading(true);
        setStatus('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('Message sent successfully!');
                setStatusType('success');

                // Status message animation
                if (statusRef.current) {
                    gsap.fromTo(
                        statusRef.current,
                        {
                            y: 20,
                            opacity: 0,
                            scale: 0.98
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            ease: 'power3.out'
                        }
                    );
                }

                // Clear form
                setFormData({ name: '', email: '', message: '' });

                // Remove message after 5 seconds
                setTimeout(() => {
                    if (statusRef.current) {
                        gsap.to(statusRef.current, {
                            opacity: 0,
                            y: -10,
                            duration: 0.4,
                            onComplete: () => setStatus('')
                        });
                    }
                }, 5000);
            } else {
                setStatus(`Error: ${data.error || 'Failed to send message'}`);
                setStatusType('error');

                // Status message animation
                if (statusRef.current) {
                    gsap.fromTo(
                        statusRef.current,
                        {
                            y: 20,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: 'power3.out'
                        }
                    );
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('Network error. Please try again later.');
            setStatusType('error');

            // Status message animation
            if (statusRef.current) {
                gsap.fromTo(
                    statusRef.current,
                    {
                        y: 20,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out'
                    }
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="contact section" id="contact" ref={sectionRef}>
            <h2 className="section__title" ref={titleRef}>CONTACT ME</h2>
            <form className="contact__form container" onSubmit={handleSubmit} ref={formRef}>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="contact__input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="contact__input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                />
                <textarea
                    placeholder="Message"
                    className="contact__input contact__textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                />
                <button type="submit" className="contact__button button" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                </button>
                {status && (
                    <p className={`contact__status contact__status--${statusType}`} ref={statusRef}>
                        {statusType === 'success' ? (
                            <HiCheckCircle size={20} />
                        ) : (
                            <HiXCircle size={20} />
                        )}
                        <span>{status}</span>
                    </p>
                )}
            </form>
        </section>
    );
}
