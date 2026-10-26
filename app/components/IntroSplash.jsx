'use client';

import { useState, useEffect, useRef } from 'react';

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Lock scroll while splash is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Start video playback
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }

    // Safety fallback: if video doesn't end, fade out after 3.6s
    const fallbackTimer = setTimeout(() => {
      startFadeOut();
    }, 3600);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const startFadeOut = () => {
    if (fading) return;
    setFading(true);
    // Smooth slow transition: 900ms fade out
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 900);
  };

  const handleVideoEnded = () => {
    // Hold frame for a brief moment (200ms) before slow-fading
    setTimeout(() => {
      startFadeOut();
    }, 200);
  };

  if (!visible) return null;

  return (
    <div
      onClick={startFadeOut}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fading ? 'none' : 'auto',
        cursor: 'pointer'
      }}
      aria-label="Loading Shrijal Modern Vastu"
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <video
          ref={videoRef}
          src="/images/SHRIJAL_Logo_Bottom_Fill_3s.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '40vh',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>

      {/* Subtle Skip cue */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          startFadeOut();
        }}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'transparent',
          border: 'none',
          color: '#8A8880',
          fontSize: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          padding: '8px 12px',
          fontFamily: 'inherit',
          opacity: 0.7,
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
        Skip &rarr;
      </button>
    </div>
  );
}
