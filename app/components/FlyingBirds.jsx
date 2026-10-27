'use client';

import React from 'react';

/**
 * FlyingBirds:
 * Elegant, minimalist silhouettes of distant birds gliding gracefully across the sky,
 * evoking ancient natural rhythm, wisdom, openness, and gentle airflow.
 */
export default function FlyingBirds({ className = '', style = {} }) {
  return (
    <div
      className={`flying-birds-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        ...style
      }}
      aria-hidden="true"
    >
      {/* Flight flock 1: High distant glide from right to upper-left */}
      <div className="bird-track track-1">
        <svg className="bird-svg bird-size-lg" viewBox="0 0 28 14" fill="none">
          <path
            className="bird-wings"
            d="M 1 8 C 6 2, 11 3, 14 7 C 17 3, 22 2, 27 8 C 22 5, 17 6, 14 9 C 11 6, 6 5, 1 8 Z"
            fill="#8E897E"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* Bird 2: Companion slightly behind and higher */}
      <div className="bird-track track-2">
        <svg className="bird-svg bird-size-md" viewBox="0 0 28 14" fill="none">
          <path
            className="bird-wings"
            d="M 1 8 C 6 2, 11 3, 14 7 C 17 3, 22 2, 27 8 C 22 5, 17 6, 14 9 C 11 6, 6 5, 1 8 Z"
            fill="#8E897E"
            opacity="0.45"
          />
        </svg>
      </div>

      {/* Bird 3: Distant solitary bird higher up */}
      <div className="bird-track track-3">
        <svg className="bird-svg bird-size-sm" viewBox="0 0 28 14" fill="none">
          <path
            className="bird-wings"
            d="M 1 8 C 6 2, 11 3, 14 7 C 17 3, 22 2, 27 8 C 22 5, 17 6, 14 9 C 11 6, 6 5, 1 8 Z"
            fill="#8E897E"
            opacity="0.38"
          />
        </svg>
      </div>

      {/* Bird 4: Tiny trailing bird */}
      <div className="bird-track track-4">
        <svg className="bird-svg bird-size-xs" viewBox="0 0 28 14" fill="none">
          <path
            className="bird-wings"
            d="M 1 8 C 6 2, 11 3, 14 7 C 17 3, 22 2, 27 8 C 22 5, 17 6, 14 9 C 11 6, 6 5, 1 8 Z"
            fill="#8E897E"
            opacity="0.32"
          />
        </svg>
      </div>
    </div>
  );
}
