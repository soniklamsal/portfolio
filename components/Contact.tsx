'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

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
    const leftContentRef = useRef<HTMLDivElement>(null);
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

            // Title animation
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

            // Left content animation
            if (leftContentRef.current) {
                const leftElements = leftContentRef.current.querySelectorAll('h3, p, .contact__social');
                tl.fromTo(
                    Array.from(leftElements),
                    {
                        x: -30,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1
                    },
                    '-=0.4'
                );
            }

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

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1.01,
            borderColor: 'var(--first-color-light)',
            boxShadow: '0 4px 12px rgba(255, 59, 59, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1,
            borderColor: 'var(--border-color)',
            boxShadow: '0 0 0 rgba(255, 59, 59, 0)',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

                setFormData({ name: '', email: '', message: '' });

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
            <div className="contact__container container">
                {/* Left Content */}
                <div className="contact__info" ref={leftContentRef}>
                    <h3 className="contact__info-title">Get In Touch</h3>
                    <p className="contact__info-description">
                        I'm here to assist you! If you have any questions or need assistance, please feel free to reach out to me.
                    </p>
                    <p className="contact__info-description">
                        You can also email me at{' '}
                        <a href="mailto:soniklamsal111@gmail.com" className="contact__info-link">
                            soniklamsal111@gmail.com
                        </a>
                    </p>
                    <p className="contact__info-subtitle">Connect with me on social media:</p>
                    <div className="contact__social">
                        <a
                            href="https://twitter.com/soniklamsal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social-link"
                            aria-label="Twitter"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="https://www.instagram.com/soniklamsal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social-link"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/so%C3%B1ik-lmsl-965787289/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social-link"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={24} />
                        </a>
                        <a
                            href="https://github.com/soniklamsal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social-link"
                            aria-label="GitHub"
                        >
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="contact__form" onSubmit={handleSubmit} ref={formRef}>
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
                        {isLoading ? 'Sending...' : 'Send Message ✉'}
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
            </div>
        </section>
    );
}
