'use client';

import Image from 'next/image';

/**
 * OrbitGraphic:
 * @param {object} style - Custom inline positioning & transforms
 * @param {string} className - Optional classes
 * @param {number} size - Base bounding size (px)
 * @param {number} opacity - Controlled subtle opacity (default around 0.15 - 0.28)
 * @param {number} rotation - Custom rotation in degrees
 * @param {number} scale - Custom scale factor
 * @param {string} variant - 'default' | 'concentric' | 'arcs' | 'minimal' (adds unique procedural accents)
 * @param {boolean} flip - Flip horizontally
 */
export default function OrbitGraphic({
  style = {},
  className = '',
  size = 700,
  opacity = 0.2,
  rotation = 0,
  scale = 1,
  variant = 'default',
  flip = false
}) {
  const transformParts = [];
  if (style.transform) transformParts.push(style.transform);
  if (rotation) transformParts.push(`rotate(${rotation}deg)`);
  if (scale !== 1) transformParts.push(`scale(${scale})`);
  if (flip) transformParts.push(`scaleX(-1)`);

  const mergedTransform = transformParts.length > 0 ? transformParts.join(' ') : undefined;

  return (
    <div
      className={`orbit-bg-container ${className}`}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        maxWidth: '120vw',
        maxHeight: '120vw',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: opacity,
        ...style,
        transform: mergedTransform
      }}
      aria-hidden="true"
    >
      {/* Base PNG with organic rotation & subtle presence */}
      <Image
        src="/images/background-orbits.png"
        alt=""
        width={1000}
        height={1000}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: variant === 'minimal' ? 'contrast(0.85) brightness(1.05)' : undefined
        }}
        loading="lazy"
      />

      {/* SVG Accent Overlays to make each appearance visually unique */}
      {variant === 'concentric' && (
        <svg
          viewBox="0 0 1000 1000"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <circle cx="500" cy="500" r="320" fill="none" stroke="#D6D2C7" strokeWidth="1" strokeDasharray="3 7" opacity="0.6" />
          <circle cx="500" cy="500" r="410" fill="none" stroke="#D6D2C7" strokeWidth="0.8" opacity="0.45" />
          <circle cx="500" cy="90" r="4" fill="#AEA99C" opacity="0.75" />
          <circle cx="180" cy="500" r="3" fill="#AEA99C" opacity="0.6" />
        </svg>
      )}

      {variant === 'arcs' && (
        <svg
          viewBox="0 0 1000 1000"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <path d="M 150 500 A 350 350 0 0 1 850 500" fill="none" stroke="#C9C4B8" strokeWidth="1" strokeDasharray="8 12" opacity="0.7" />
          <path d="M 500 150 A 350 350 0 0 1 500 850" fill="none" stroke="#D6D2C7" strokeWidth="0.75" opacity="0.4" />
          <circle cx="850" cy="500" r="3.5" fill="#AEA99C" opacity="0.8" />
        </svg>
      )}

      {variant === 'minimal' && (
        <svg
          viewBox="0 0 1000 1000"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <circle cx="500" cy="500" r="260" fill="none" stroke="#D6D2C7" strokeWidth="0.75" strokeDasharray="2 6" opacity="0.5" />
        </svg>
      )}
    </div>
  );
}
