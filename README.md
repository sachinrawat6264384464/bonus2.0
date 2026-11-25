# Shrijal Talkar — Modern Vastu Expert & Author

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-10.3-green?style=for-the-badge&logo=mailgun)](https://nodemailer.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

A modern, high-fashion editorial web experience built with **Next.js (App Router)** for **Shrijal Talkar**, Gold Medalist in Vastu & Author of *"The Space on Your Side"*.

🌐 **Live URL:** [shrijal.in](https://shrijal.in) | [bonus2-0.vercel.app](https://bonus2-0.vercel.app)

---

## ✨ Features

- **Luxury Editorial Design System:** Editorial typography with refined serif headers (Lora) and clean body text (Urbanist), warm ivory & alabaster background (`#FAF9F5`), deep evergreen accents (`#103F35`), terracotta highlights (`#C33F4B`), and hairline borders.
- **Intro Splash & Video Reveal:** Cinematic brand animation (`SHRIJAL_Logo_Bottom_Fill_3s.mp4`) with smooth fade-out and URL bypass (`?nosplash`) support.
- **Concentric Celestial Orbit Geometry:** Signature circular energy field graphics placed behind hero and portrait frames.
- **Ambient Poetic Atmosphere:** Floating celestial birds and subtle organic motion dynamics enhancing user immersion.
- **Interactive 2-Minute Space Check Assessment:** Interactive 3-step diagnostic wizard (Business, Home, or Both) delivering instant diagnostic insights without structural demolition.
- **Automated Consultation Lead Capture (SMTP):** Full-stack Next.js API route (`/api/consultation`) with Nodemailer sending beautifully styled HTML emails to both the client and admin upon booking submission.
- **Interactive Case Studies & PDF Downloads:** Deep-dive modal views for commercial and residential transformations with downloadable PDF case studies.
- **Published Book Showcase:** Modern 3D book mockup presentation of *"The Space on Your Side: The Modern Vastu of Energy, Light and Flow"*.
- **Multi-Resolution Favicons & Touch Icons:** High-definition ivory-backed brand icon set (`icon.png`, `apple-icon.png`, `favicon.ico`).
- **Fully Responsive & Accessible:** Pixel-perfect layout across mobile, tablet, laptop, and ultra-wide displays.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router with Turbopack) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 + Custom Vanilla CSS Variables & Design Tokens |
| **Icons** | Lucide React |
| **Email Delivery** | Nodemailer (SMTP over SSL/TLS) |
| **Fonts** | Lora & Urbanist (Google Fonts) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** or **pnpm** or **yarn**

### 2. Clone the repository
```bash
git clone https://github.com/sachinrawat6264384464/bonus2.0.git
cd bonus2.0
```

### 3. Install dependencies
```bash
npm install
```

### 4. Configure environment variables
Create a `.env.local` file in the project root:
```bash
cp .env.example .env.local
```
Add your SMTP credentials (e.g., Gmail App Password):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
ADMIN_EMAIL=your-email@gmail.com
EMAIL_FROM_NAME="Shrijal Talkar — Modern Vastu"
```

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── consultation/
│   │       └── route.js           # Consultation email API (Nodemailer SMTP)
│   ├── components/
│   │   ├── FlyingBirds.jsx        # Ambient flying bird animation
│   │   ├── IntroSplash.jsx        # 3s cinematic video splash screen
│   │   ├── OrbitGraphic.jsx       # Sacred celestial orbit SVG graphic
│   │   ├── PoeticAtmosphere.jsx   # Ambient particle and glow layer
│   │   └── ScrollAnimator.jsx     # Viewport scroll triggers & animations
│   ├── apple-icon.png             # Apple touch icon
│   ├── favicon.ico                # Root favicon
│   ├── globals.css                # Global CSS design tokens & utilities
│   ├── icon.png                   # Dynamic brand favicon
│   ├── layout.jsx                 # Root layout & font metadata
│   └── page.jsx                   # Main single-page editorial experience
├── public/
│   ├── docs/                      # Downloadable PDF case study reports
│   │   ├── story-1-stability.pdf
│   │   ├── story-2-relief.pdf
│   │   ├── story-3-obstacles.pdf
│   │   └── vastu-case-study-*.pdf
│   └── images/                    # Brand assets, portrait, book mockup, video
│       ├── book-mockup.png
│       ├── shrijal-logo.png
│       ├── shrijal-portrait.jpg
│       ├── shrijal-real-opt.png
│       └── SHRIJAL_Logo_Bottom_Fill_3s.mp4
├── .env.example                   # Environment variable template
├── next.config.mjs                # Next.js build configuration
├── package.json                   # Project scripts and dependencies
└── README.md                      # Documentation
```

---

## ⚙️ Environment Variables Reference

| Variable | Description | Default |
| :--- | :--- | :--- |
| `SMTP_HOST` / `EMAIL_HOST` | Outgoing SMTP mail server | `smtp.gmail.com` |
| `SMTP_PORT` / `EMAIL_PORT` | SMTP port (`465` for SSL, `587` for TLS) | `465` |
| `SMTP_SECURE` | Boolean flag for SSL | `true` |
| `SMTP_USER` / `EMAIL_HOST_USER` | Email account for authentication | — |
| `SMTP_PASS` / `EMAIL_HOST_PASSWORD` | App-specific password | — |
| `ADMIN_EMAIL` | Admin inbox receiving client consultation leads | — |
| `EMAIL_FROM_NAME` | Display name in outgoing email headers | `Shrijal Talkar — Modern Vastu` |

---

## 🌐 Custom Domain & DNS Setup (GoDaddy to Vercel)

To link custom domain **`shrijal.in`** to Vercel:

1. **In Vercel Dashboard:**
   - Go to **Project Settings** → **Domains**.
   - Add `shrijal.in` and `www.shrijal.in`.
2. **In GoDaddy DNS Management:**
   - **A Record**:
     - `Type`: `A`
     - `Name`: `@`
     - `Value`: `76.76.21.21`
     - `TTL`: `600 seconds` (or Default)
   - **CNAME Record**:
     - `Type`: `CNAME`
     - `Name`: `www`
     - `Value`: `cname.vercel-dns.com`
     - `TTL`: `600 seconds` (or Default)
3. **SSL Activation:**
   - Vercel automatically issues an SSL certificate (Let's Encrypt) within minutes of DNS verification, enabling secure `https://` access.

---

## 📄 License

All rights reserved © Shrijal Talkar.
