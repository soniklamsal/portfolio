# Contact Form Setup Guide

This portfolio includes a secure contact form that sends emails using SMTP without exposing credentials on the client side.

## Features

- ✅ Server-side email sending using Next.js API routes
- ✅ Secure SMTP integration with Nodemailer
- ✅ Environment variables for credential protection
- ✅ Form validation (email format, required fields, minimum length)
- ✅ User feedback (success, error, loading states)
- ✅ Premium GSAP animations
- ✅ Works with Next.js 13+ App Router

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed:
- `nodemailer` - SMTP email client
- `@types/nodemailer` - TypeScript types

### 2. Configure Environment Variables

Create a `.env.local` file in the `my-app` directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 3. Choose an SMTP Provider

#### Option A: Gmail (Free, Production-Ready)

**Setup Steps:**

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Factor Authentication (Security → 2-Step Verification)
3. Generate an App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
4. Update `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_EMAIL=your-gmail@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

**Gmail Limits:**
- 500 emails per day (free account)
- 2000 emails per day (Google Workspace)

---

#### Option B: Mailtrap (Free, Testing Only)

Perfect for development and testing without sending real emails.

**Setup Steps:**

1. Sign up at: https://mailtrap.io/
2. Go to Email Testing → Inboxes → My Inbox
3. Select "Nodemailer" from integrations
4. Copy the credentials
5. Update `.env.local`:
   ```env
   SMTP_HOST=sandbox.smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_SECURE=false
   SMTP_EMAIL=your-mailtrap-username
   SMTP_PASSWORD=your-mailtrap-password
   ```

**Mailtrap Features:**
- Catches all emails (no real delivery)
- View emails in web interface
- Perfect for testing
- Free tier: 500 emails/month

---

#### Option C: Other Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your-email@outlook.com
SMTP_PASSWORD=your-password
```

**Yahoo Mail:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
```
*Note: Yahoo also requires app passwords*

**SendGrid (Recommended for Production):**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```
- Sign up: https://sendgrid.com/
- Free tier: 100 emails/day
- Excellent deliverability

---

### 4. Run the Application

```bash
npm run dev
```

Visit: http://localhost:3000

### 5. Test the Contact Form

1. Scroll to the "CONTACT ME" section
2. Fill in the form:
   - Name (minimum 2 characters)
   - Email (valid format)
   - Message (minimum 10 characters)
3. Click "Send Message"
4. Watch for feedback:
   - Loading state: "Sending..."
   - Success: "Message sent successfully ✅"
   - Error: Specific error message

### 6. Check Your Email

- **Gmail/Outlook/Yahoo**: Check your inbox
- **Mailtrap**: Check the Mailtrap web interface
- **SendGrid**: Check SendGrid dashboard

## How It Works

### Security Architecture

```
User Browser                Next.js Server              SMTP Server
    |                            |                           |
    |-- POST /api/contact ------>|                           |
    |   (name, email, message)   |                           |
    |                            |                           |
    |                            |-- Validate Input          |
    |                            |-- Load .env credentials   |
    |                            |-- Create transporter ---->|
    |                            |                           |
    |                            |<----- Send Email ---------|
    |                            |                           |
    |<--- Success/Error ---------|                           |
```

**Key Security Features:**
- SMTP credentials stored in `.env.local` (never committed to Git)
- API route runs server-side only
- Client never sees credentials
- Input validation prevents injection
- Error messages don't expose sensitive info

### File Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API endpoint for email sending
│   └── ...
├── components/
│   └── Contact.tsx               # Contact form component
├── .env.local                    # Your SMTP credentials (DO NOT COMMIT)
├── .env.example                  # Template for environment variables
└── CONTACT_FORM_SETUP.md         # This file
```

## Validation Rules

- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Message**: Required, minimum 10 characters

## Troubleshooting

### "Email service not configured"
- Check that `.env.local` exists
- Verify all SMTP variables are set
- Restart the dev server after changing `.env.local`

### "Failed to send email"
- **Gmail**: Ensure 2FA is enabled and you're using an App Password
- **Mailtrap**: Verify credentials from Mailtrap dashboard
- Check SMTP_HOST and SMTP_PORT are correct
- Check console logs for detailed error messages

### "Invalid email format"
- Ensure email contains @ and domain
- No spaces in email address

### Emails not arriving (Gmail)
- Check Spam folder
- Verify App Password is correct (not regular password)
- Check Gmail's "Less secure app access" is not blocking

### Rate Limiting
- Gmail: Max 500 emails/day
- Mailtrap: Max 500 emails/month (free tier)
- Consider SendGrid for higher volumes

## Production Deployment

### Vercel / Netlify / Other Platforms

1. Add environment variables in platform dashboard:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_EMAIL`
   - `SMTP_PASSWORD`

2. Deploy your app

3. Test the contact form on production URL

### Security Best Practices

- ✅ Never commit `.env.local` to Git
- ✅ Use App Passwords (not account passwords)
- ✅ Rotate credentials periodically
- ✅ Monitor email sending logs
- ✅ Consider rate limiting for production
- ✅ Add CAPTCHA for spam prevention (optional)

## Additional Features to Consider

- **Email Templates**: Use HTML email templates
- **Auto-Reply**: Send confirmation email to user
- **Rate Limiting**: Prevent spam submissions
- **CAPTCHA**: Add reCAPTCHA v3
- **Database Logging**: Store submissions in database
- **Webhooks**: Integrate with Slack/Discord notifications

## Support

For issues or questions:
- Check Next.js docs: https://nextjs.org/docs
- Nodemailer docs: https://nodemailer.com/
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Mailtrap: https://mailtrap.io/

## License

This contact form implementation is part of your portfolio project.
