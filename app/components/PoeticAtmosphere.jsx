'use client';

import React from 'react';

/**
 * SunbeamGlow:
 * Vague, gentle shafts of morning light passing through a space.
 * Relevant to: "What you see is only part of the space" (Light, Direction, Flow).
 */
export function SunbeamGlow({ style = {}, className = '' }) {
  return (
    <div
      className={`sunbeam-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '520px',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        ...style
      }}
      aria-hidden="true"
    >
      <div className="sunbeam-ray ray-1" />
      <div className="sunbeam-ray ray-2" />
      <div className="sunbeam-ray ray-3" />
      <div className="dust-mote mote-1" />
      <div className="dust-mote mote-2" />
      <div className="dust-mote mote-3" />
    </div>
  );
}

/**
 * WindLeavesStream:
 * A subtle, poetic drift of a few tiny leaves/petals carried on gentle natural airflow.
 * Relevant to: "The Space on Your Side — Energy, Light and Flow" (Book section).
 */
export function WindLeavesStream({ style = {}, className = '' }) {
  return (
    <div
      className={`wind-leaves-canvas ${className}`}
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
      {/* 4 tiny drifting leaves with gentle 3D flutter */}
      <div className="leaf-track leaf-1">
        <svg viewBox="0 0 16 10" className="leaf-svg" fill="none">
          <path
            d="M 1 5 C 4 1, 11 1, 15 5 C 11 9, 4 9, 1 5 Z"
            fill="#B3AD9F"
            opacity="0.45"
          />
          <path d="M 1 5 Q 8 4 15 5" stroke="#9A9486" strokeWidth="0.5" opacity="0.35" />
        </svg>
      </div>

      <div className="leaf-track leaf-2">
        <svg viewBox="0 0 14 9" className="leaf-svg" fill="none">
          <path
            d="M 1 4.5 C 3.5 1, 9.5 1, 13 4.5 C 9.5 8, 3.5 8, 1 4.5 Z"
            fill="#B3AD9F"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="leaf-track leaf-3">
        <svg viewBox="0 0 12 8" className="leaf-svg" fill="none">
          <path
            d="M 1 4 C 3 1, 8.5 1, 11 4 C 8.5 7, 3 7, 1 4 Z"
            fill="#B3AD9F"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="leaf-track leaf-4">
        <svg viewBox="0 0 10 7" className="leaf-svg" fill="none">
          <path
            d="M 1 3.5 C 2.5 1, 7 1, 9 3.5 C 7 6, 2.5 6, 1 3.5 Z"
            fill="#B3AD9F"
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * EnergyPulseRing:
 * A breathing concentric aura representing spatial clarity and balance.
 * Relevant to: "Before you change your space... understand it. The first step is clarity."
 */
export function EnergyPulseRing({ style = {}, className = '' }) {
  return (
    <div
      className={`pulse-ring-canvas ${className}`}
      style={{
        position: 'absolute',
        top: '50%',
        right: '6%',
        transform: 'translateY(-50%)',
        width: '320px',
        height: '320px',
        pointerEvents: 'none',
        zIndex: 1,
        ...style
      }}
      aria-hidden="true"
    >
      <div className="pulse-circle circle-1" />
      <div className="pulse-circle circle-2" />
      <div className="pulse-circle circle-3" />
      <div className="compass-tick tick-n">N</div>
      <div className="compass-tick tick-e">E</div>
    </div>
  );
}
