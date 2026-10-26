import './globals.css';

export const metadata = {
  title: 'Shrijal Talkar — Modern Vastu Expert & Author | Your Space. On Your Side.',
  description: 'Modern Vastu for business and home. A clear, practical way to understand your space and make the changes that truly matter.',
  openGraph: {
    title: 'Shrijal Talkar — Modern Vastu Expert & Author',
    description: 'Modern Vastu for business and home. Your Space. On Your Side.',
    images: ['/images/shrijal-portrait.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
