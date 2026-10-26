'use client';

import Image from 'next/image';

export default function OrbitGraphic({
  style = {},
  className = '',
  size = 700,
  opacity = 0.55,
  rotation = 0
}) {
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
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        ...style
      }}
      aria-hidden="true"
    >
      <Image
        src="/images/background-orbits.png"
        alt=""
        width={1000}
        height={1000}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
        priority={size > 700}
      />
    </div>
  );
}
