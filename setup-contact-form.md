# Quick Start: Contact Form Setup

## 🚀 5-Minute Setup

### Step 1: Create Environment File
```bash
cp .env.example .env.local
```

### Step 2: Choose Your Email Provider

#### For Testing (Recommended First):
**Use Mailtrap** - No real emails sent, perfect for testing

1. Go to: https://mailtrap.io/
2. Sign up (free)
3. Click "Email Testing" → "Inboxes" → "My Inbox"
4. Select "Nodemailer" integration
5. Copy credentials to `.env.local`:

```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_EMAIL=<your-mailtrap-username>
SMTP_PASSWORD=<your-mailtrap-password>
```

#### For Production:
**Use Gmail** - Real emails, free

1. Enable 2FA: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Update `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=<16-char-app-password>
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Test the Form
1. Open: http://localhost:3000
2. Scroll to "CONTACT ME"
3. Fill and submit the form
4. Check:
   - **Mailtrap**: Web interface
   - **Gmail**: Your inbox

## ✅ That's It!

Your contact form is now fully functional and secure.

## 📚 Need More Help?

Read the full guide: `CONTACT_FORM_SETUP.md`
