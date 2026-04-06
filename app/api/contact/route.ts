import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        if (name.trim().length < 2) {
            return NextResponse.json(
                { error: 'Name must be at least 2 characters' },
                { status: 400 }
            );
        }

        if (message.trim().length < 10) {
            return NextResponse.json(
                { error: 'Message must be at least 10 characters' },
                { status: 400 }
            );
        }

        // Check if SMTP credentials are configured
        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.error('SMTP credentials not configured');
            return NextResponse.json(
                { error: 'Email service not configured. Please contact the administrator.' },
                { status: 500 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email to yourself (portfolio owner)
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: process.env.SMTP_EMAIL, // Send to yourself
            subject: `Portfolio Contact: ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
            replyTo: email, // Allow easy reply to the sender
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
