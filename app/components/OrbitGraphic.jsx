'use client';

import React from 'react';

/**
 * OrbitGraphic:
 * Renders pristine, concentric geometric circles that cleanly close with perfect 360-degree continuity.
 * Eliminates jagged/broken gap artifacts while maintaining an architectural, modern Vastu aesthetic.
 *
 * @param {object} style - Custom inline positioning & transforms
 * @param {string} className - Optional classes
 * @param {number} size - Base bounding size (px)
 * @param {number} opacity - Subtle opacity (default 0.25 - 0.4)
 * @param {number} rotation - Optional rotation in degrees
 * @param {number} scale - Custom scale factor
 * @param {string} variant - 'default' | 'concentric' | 'arcs' | 'minimal'
 * @param {boolean} flip - Flip horizontally
 */
export default function OrbitGraphic({
  style = {},
  className = '',
  size = 700,
  opacity = 0.35,
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

  // Curated concentric rings with balanced line weights and subtle tone variations
  // All rings are complete 360° closed circles so their endpoints meet perfectly.
  const concentricRings = [
    { r: 140, stroke: '#8E8A80', strokeWidth: 1.2, opacity: 0.8 },
    { r: 185, stroke: '#9D998F', strokeWidth: 1.0, opacity: 0.65 },
    { r: 230, stroke: '#A9A499', strokeWidth: 1.2, opacity: 0.75 },
    { r: 275, stroke: '#B6B2A7', strokeWidth: 0.9, opacity: 0.55 },
    { r: 320, stroke: '#A39E93', strokeWidth: 1.4, opacity: 0.7 },
    { r: 365, stroke: '#BDB9AE', strokeWidth: 0.85, opacity: 0.5 },
    { r: 410, stroke: '#999489', strokeWidth: 1.2, opacity: 0.65 },
    { r: 455, stroke: '#C4BFB5', strokeWidth: 0.8, opacity: 0.45 },
    { r: 488, stroke: '#AAA59B', strokeWidth: 1.0, opacity: 0.55 }
  ];

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
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        {/* Subtle center coordinate axes ticks */}
        <line x1="500" y1="480" x2="500" y2="520" stroke="#8E8A80" strokeWidth="0.8" opacity="0.4" />
        <line x1="480" y1="500" x2="520" y2="500" stroke="#8E8A80" strokeWidth="0.8" opacity="0.4" />

        {/* Complete concentric circles - 100% closed, flawless loops */}
        {concentricRings.map((ring, idx) => (
          <circle
            key={idx}
            cx="500"
            cy="500"
            r={ring.r}
            stroke={ring.stroke}
            strokeWidth={ring.strokeWidth}
            opacity={ring.opacity}
          />
        ))}

        {/* Fine orbital node markers positioned precisely along closed orbits */}
        <circle cx="500" cy={500 - 320} r="3" fill="#8E8A80" opacity="0.6" />
        <circle cx={500 + 410} cy="500" r="2.5" fill="#8E8A80" opacity="0.5" />
        <circle cx={500 - 230} cy="500" r="2.5" fill="#8E8A80" opacity="0.5" />
        <circle cx="500" cy={500 + 455} r="2.5" fill="#8E8A80" opacity="0.45" />

        {/* Optional decorative dashed outer compass ring for rich architectural feel */}
        {(variant === 'concentric' || variant === 'default') && (
          <circle
            cx="500"
            cy="500"
            r="470"
            stroke="#9D998F"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            opacity="0.4"
          />
        )}
      </svg>
    </div>
  );
}
