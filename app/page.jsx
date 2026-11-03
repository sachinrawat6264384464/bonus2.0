'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import OrbitGraphic from './components/OrbitGraphic';
import IntroSplash from './components/IntroSplash';
import FlyingBirds from './components/FlyingBirds';
import ScrollAnimator from './components/ScrollAnimator';
import { SunbeamGlow, WindLeavesStream, EnergyPulseRing } from './components/PoeticAtmosphere';

export default function Home() {
  // Modal states
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isSpaceCheckOpen, setIsSpaceCheckOpen] = useState(false);
  const [selectedCaseModal, setSelectedCaseModal] = useState(null); // 'business' | 'home' | null
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Space check interactive selection in Section 9
  const [spaceCheckType, setSpaceCheckType] = useState('Business'); // 'Business' | 'Home' | 'Both'

  // Space check quiz state for modal
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    spaceType: 'Business',
    feeling: 'Stagnant or distracted',
    light: 'Moderate or artificial mostly',
    goal: 'Better growth & harmonious flow'
  });
  const [quizFinished, setQuizFinished] = useState(false);

  // Consultation form state
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    email: '',
    spaceType: 'Residential Vastu (Apartment, Villa, Living Space)',
    city: '',
    enquiry: ''
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    console.log('[Consultation Form] Submitting lead data to /api/consultation...', consultForm);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...consultForm,
          quizAnswers: quizFinished ? quizAnswers : null,
        }),
      });

      const data = await res.json();
      console.log('[Consultation Form] Server response:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation report.');
      }

      setConsultSubmitted(true);
    } catch (err) {
      console.error('[Consultation Form Error]:', err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSpaceCheckWith = (type) => {
    setSpaceCheckType(type);
    setQuizAnswers((prev) => ({ ...prev, spaceType: type }));
    setQuizStep(1);
    setQuizFinished(false);
    setIsSpaceCheckOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const storiesData = [
    {
      id: 'story-1',
      title: 'A Home That Had Everything Except Stability',
      image: '/images/story-1.jpg',
      pdfUrl: '/docs/vastu-case-study-1.pdf',
      buttonTheme: 'theme-white-pill',
      buttonText: 'Know More'
    },
    {
      id: 'story-2',
      title: 'A Home That Felt Heavy. A Search For Relief',
      image: '/images/story-2.jpg',
      pdfUrl: '/docs/vastu-case-study-2.pdf',
      buttonTheme: 'theme-green-pill',
      buttonText: 'Know More'
    },
    {
      id: 'story-3',
      title: 'A Beautiful Home. But Constant Obstacles',
      image: '/images/story-3.jpg',
      pdfUrl: '/docs/vastu-case-study-3.pdf',
      buttonTheme: 'theme-white-pill-alt',
      buttonText: 'Know More'
    }
  ];

  return (
    <div className="site-wrapper">
      {/* Intro Animation Preloader */}
      <IntroSplash />

      {/* Global Scroll Animation System */}
      <ScrollAnimator />

      {/* 1. Navigation Header */}
      <header className="header-wrapper">
        <div className="container">
          <div className="header-container">
            <a href="#" className="logo-brand flex items-center shrink-0">
              <Image
                src="/images/shrijal-logo.png"
                alt="Shrijal Modern Vastu Expert"
                width={220}
                height={64}
                priority
                className="h-8 sm:h-11 md:h-12 w-auto object-contain"
              />
            </a>

            <nav>
              <ul className="nav-links">
                <li><a href="#philosophy" className="nav-link">Philosophy</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#services" className="nav-link">Services</a></li>
                <li><a href="#approach" className="nav-link">Approach</a></li>
                <li><a href="#space-check" className="nav-link">Space Check</a></li>
                <li><a href="#book" className="nav-link">Book</a></li>
                <li><a href="#case-studies" className="nav-link">Case Studies</a></li>
                <li><a href="#client-experiences" className="nav-link">Experiences</a></li>
              </ul>
            </nav>

            <button
              onClick={() => setIsConsultOpen(true)}
              className="btn-outline-nav shrink-0"
              id="nav-consult-btn"
            >
              <span className="hidden sm:inline">Book a </span>Consultation <span>&rarr;</span>
            </button>
          </div>
        </div>
      </header>

      {/* 01 — HERO (Theme 1: Ivory) */}
      <section className="hero-section theme-ivory" id="hero">
        <div className="container" style={{ width: '100%' }}>
          <div className="hero-grid">
            <div className="hero-content reveal-on-scroll">
              <div className="hero-subhead-tag">
                <span className="name" style={{ color: '#103F35' }}>Shrijal Talkar</span>
                <span className="title">Modern Vastu Consultant &amp; Author</span>
              </div>

              <h1 className="hero-title">
                Your Space.<br />
                <em>On Your Side.</em>
              </h1>

              <h2 className="hero-lead-title">
                A contemporary perspective on the traditional principles of Vastu.
              </h2>

              <p className="hero-description" style={{ fontSize: '17px', lineHeight: '1.65' }}>
                Thoughtful guidance for homes, workplaces and the spaces that shape everyday life.
              </p>

              <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsConsultOpen(true)}
                  className="btn-primary"
                  id="hero-consult-btn"
                >
                  BOOK A CONSULTATION <span>&rarr;</span>
                </button>
                <a
                  href="#approach"
                  className="btn-outline"
                  id="hero-explore-approach-btn"
                  style={{ textDecoration: 'none' }}
                >
                  EXPLORE THE APPROACH <span>&darr;</span>
                </a>
              </div>
            </div>

            <div className="hero-image-wrap reveal-on-scroll">
              <OrbitGraphic
                size={780}
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                opacity={0.28}
                rotation={18}
                variant="arcs"
              />
              <div className="hero-image-frame">
                <Image
                  src="/images/shrijal-real-opt.png"
                  alt="Shrijal Talkar — Modern Vastu Consultant & Author"
                  width={540}
                  height={630}
                  priority
                  style={{ display: 'block', width: '100%', height: 'auto', position: 'relative', zIndex: 2 }}
                />
              </div>
            </div>
          </div>

          <div className="hero-footer-bar reveal-on-scroll">
            Rooted in tradition. Considered for modern living. &nbsp;&bull;&nbsp; Gold Medalist in Vastu &nbsp;&bull;&nbsp; Author of <em>The Space on Your Side</em>
          </div>
        </div>
      </section>

      {/* 02 — PHILOSOPHY (Theme 2: Logo Green) */}
      <section className="section theme-green" id="philosophy" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="large-section-title" style={{ marginBottom: '28px', color: '#FFFFFF' }}>
              Not every space needs changing.<br />
              <em style={{ color: '#FFFFFF' }}>Every space deserves to be understood.</em>
            </h2>

            <p style={{ fontSize: '18px', lineHeight: '1.75', color: '#E8E5DF', marginBottom: '20px' }}>
              A home or workplace is more than a floor plan. It is shaped by how people move, gather, focus and spend their time.
            </p>

            <p style={{ fontSize: '16.5px', lineHeight: '1.75', color: '#D6E6DF', maxWidth: '800px', margin: '0 auto 36px auto' }}>
              My work begins with understanding those everyday realities. I bring traditional Vastu principles into the context of contemporary spaces, with recommendations that are considered, clear and practical.
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderLeft: '4px solid #A3D4C4',
              padding: '24px 32px',
              borderRadius: '0 8px 8px 0',
              display: 'inline-block',
              maxWidth: '680px',
              textAlign: 'left'
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontStyle: 'italic', color: '#FFFFFF', lineHeight: '1.4' }}>
                &ldquo;Good guidance should create clarity, not fear.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — ABOUT SHRIJAL (Theme 3: Warm Beige) */}
      <section className="section theme-beige" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
        <SunbeamGlow />
        <FlyingBirds />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="about-grid reveal-on-scroll">
            <div className="about-photo-wrap">
              <OrbitGraphic
                size={580}
                style={{
                  top: '47%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 0 10px rgba(16, 63, 53, 0.15))'
                }}
                opacity={0.35}
                rotation={-45}
                variant="concentric"
                color="#103F35"
              />
              <div className="about-photo-frame">
                <Image
                  src="/images/shrijal-real-opt.png"
                  alt="Shrijal Talkar portrait"
                  width={520}
                  height={608}
                  style={{ display: 'block', width: '100%', height: 'auto', position: 'relative', zIndex: 2 }}
                />
              </div>
            </div>

            <div className="about-content" style={{ position: 'relative', zIndex: 4 }}>
              <h2 className="large-section-title about-section-title" style={{ marginTop: '0', marginBottom: '16px' }}>
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>A considered approach to</span><br />
                <em>Modern Vastu.</em>
              </h2>

              <div className="about-role" style={{ fontSize: '16.5px', fontWeight: '500', marginBottom: '14px', color: '#103F35' }}>
                Shrijal Talkar is a Modern Vastu Consultant and author whose practice brings traditional knowledge into the realities of modern living and working.
              </div>
              <p style={{ fontSize: '15.5px', lineHeight: '1.75', color: '#383733', marginBottom: '24px' }}>
                A Gold Medalist in Vastu, trained under Vastu-Astro expert Aashish Patidar, she approaches each consultation with careful observation and an appreciation for the people who inhabit the space.
              </p>

              <div className="about-divider" style={{ borderColor: '#DCD7CA' }}></div>

              <div className="about-quote-box" style={{ background: '#FFFFFF', borderTop: '1.5px solid #D5CFC2', borderRight: '1.5px solid #D5CFC2', borderBottom: '1.5px solid #D5CFC2', borderLeft: '4px solid #103F35', padding: '24px 28px', marginTop: '20px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontStyle: 'italic', color: '#1C1C1A', marginBottom: '8px' }}>
                  &ldquo;I don&apos;t believe every space needs changing. I believe every space deserves to be understood.&rdquo;
                </p>
                <p style={{ fontSize: '14px', color: '#5A5954', fontWeight: '500' }}>
                  &mdash; Shrijal Talkar
                </p>
              </div>

              <div style={{ marginTop: '28px' }}>
                <button
                  onClick={() => setIsConsultOpen(true)}
                  className="btn-primary"
                >
                  DISCOVER HER STORY <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — SERVICES (Theme 1: Ivory) */}
      <section className="section theme-ivory" id="services" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header reveal-on-scroll">
            <div>
              <h2 className="large-section-title">
                Different spaces demand<br />
                <em>different considerations.</em>
              </h2>
            </div>
            <p className="header-aside-text">
              Thoughtful guidance for homes, workplaces and the spaces that shape everyday life.
            </p>
          </div>

          <div className="spaces-three-col reveal-on-scroll reveal-stagger">
            {/* Residential Vastu Card */}
            <div className="spaces-card">
              <div>
                <div className="section-label">RESIDENTIAL VASTU</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-4 mb-4">
                  Residential Vastu
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[#5A5954] mb-8">
                  A home should reflect the people who live in it. Explore the layout, orientation and everyday use of your living spaces through a considered Vastu perspective.
                </p>
              </div>

              <button
                onClick={() => openSpaceCheckWith('Home')}
                className="btn-outline w-full justify-between"
                id="service-home-btn"
              >
                EXPLORE HOME VASTU <span>&rarr;</span>
              </button>
            </div>

            {/* Business Vastu Card */}
            <div className="spaces-card">
              <div>
                <div className="section-label">BUSINESS VASTU</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-4 mb-4">
                  Business Vastu
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[#5A5954] mb-8">
                  From offices to retail environments, examine the relationship between spatial arrangements, circulation and the needs of your business.
                </p>
              </div>

              <button
                onClick={() => openSpaceCheckWith('Business')}
                className="btn-outline w-full justify-between"
                id="service-business-btn"
              >
                EXPLORE BUSINESS VASTU <span>&rarr;</span>
              </button>
            </div>

            {/* New & Existing Properties Card */}
            <div className="spaces-card">
              <div>
                <div className="section-label">NEW &amp; EXISTING PROPERTIES</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-4 mb-4">
                  New &amp; Existing
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[#5A5954] mb-8">
                  Whether planning a new property or reviewing an occupied space, receive guidance that respects your plans, constraints and priorities.
                </p>
              </div>

              <button
                onClick={() => setIsConsultOpen(true)}
                className="btn-outline w-full justify-between"
                id="service-properties-btn"
              >
                DISCUSS YOUR SPACE <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — THE APPROACH (Theme 2: Logo Green) */}
      <section className="section theme-green" id="approach" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal-on-scroll" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="large-section-title" style={{ marginBottom: '16px', color: '#FFFFFF' }}>
              Understanding comes before<br />
              <em style={{ color: '#FFFFFF' }}>recommendations.</em>
            </h2>
            <p className="header-aside-text" style={{ maxWidth: '640px', margin: '0 auto', color: '#D6E6DF' }}>
              No unnecessary fear. No one-size-fits-all prescriptions. Every consultation follows a thoughtful, transparent 4-step path.
            </p>
          </div>

          <div className="approach-grid reveal-on-scroll reveal-stagger" style={{ marginTop: '48px' }}>
            <div className="approach-step-card">
              <div className="approach-step-num">01.</div>
              <h3 className="approach-step-title">A Conversation</h3>
              <p className="approach-step-desc">
                We begin with your concerns, priorities and how the space is used day to day.
              </p>
            </div>

            <div className="approach-step-card">
              <div className="approach-step-num">02.</div>
              <h3 className="approach-step-title">A Closer Assessment</h3>
              <p className="approach-step-desc">
                I study the layout, directions and relevant spatial considerations through my Vastu methodology.
              </p>
            </div>

            <div className="approach-step-card">
              <div className="approach-step-num">03.</div>
              <h3 className="approach-step-title">Thoughtful Recommendations</h3>
              <p className="approach-step-desc">
                We discuss potential adjustments, their purpose and what is practical for your space.
              </p>
            </div>

            <div className="approach-step-card">
              <div className="approach-step-num">04.</div>
              <h3 className="approach-step-title">A Clear Way Forward</h3>
              <p className="approach-step-desc">
                You leave with a better understanding of the recommendations and your options.
              </p>
            </div>
          </div>

          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ fontStyle: 'italic', color: '#D6E6DF', fontSize: '16px', fontWeight: '500' }}>
              &ldquo;No unnecessary fear. No one-size-fits-all prescriptions.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 06 — SPACE CHECK (Theme 3: Warm Beige) */}
      <section className="section theme-beige" id="space-check" style={{ position: 'relative', overflow: 'hidden' }}>
        <OrbitGraphic
          size={740}
          style={{
            bottom: '-120px',
            left: '-200px',
            pointerEvents: 'none'
          }}
          opacity={0.18}
          rotation={-60}
          variant="concentric"
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="spacecheck-grid reveal-on-scroll">
            <div className="spacecheck-left">
              <h2 className="large-section-title">
                See your space from a<br />
                <em>different perspective.</em>
              </h2>

              <p className="spacecheck-p" style={{ marginTop: '20px', marginBottom: '24px', fontSize: '16px', lineHeight: '1.7', color: '#383733' }}>
                The spaces we know best are often the ones we examine least. Answer a few thoughtful questions about your home or workplace to reflect on its layout and everyday use.
              </p>

              <button
                onClick={() => openSpaceCheckWith(spaceCheckType)}
                className="btn-primary"
                id="start-space-check-btn"
              >
                TAKE THE SPACE CHECK <span>&rarr;</span>
              </button>
            </div>

            <div className="spacecheck-right">
              <div className="spacecheck-selector-title" style={{ fontSize: '15px', color: '#5A5954', marginBottom: '12px' }}>
                Select Your Space: Business &bull; Home &bull; Both.
              </div>

              <div className="selector-options-row">
                <button
                  type="button"
                  onClick={() => setSpaceCheckType('Business')}
                  className={`selector-option-btn ${spaceCheckType === 'Business' ? 'active' : ''}`}
                >
                  Business
                </button>
                <button
                  type="button"
                  onClick={() => setSpaceCheckType('Home')}
                  className={`selector-option-btn ${spaceCheckType === 'Home' ? 'active' : ''}`}
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => setSpaceCheckType('Both')}
                  className={`selector-option-btn ${spaceCheckType === 'Both' ? 'active' : ''}`}
                >
                  Both
                </button>
              </div>

              <div className="spacecheck-bullets" style={{ marginTop: '20px', borderTop: 'none', paddingTop: '0' }}>
                <div style={{ background: '#FFFFFF', border: '1.5px solid #D5CFC2', padding: '22px 26px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)' }}>
                  <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#1C1C1A', lineHeight: '1.6', marginBottom: '14px' }}>
                    &ldquo;An introduction to looking at your surroundings more carefully&mdash;not a substitute for a personalised consultation.&rdquo;
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', fontSize: '13.5px', color: '#5A5954', fontWeight: 500, letterSpacing: '0.01em' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#103F35', opacity: 0.8, flexShrink: 0 }} aria-hidden="true" />
                      2 minutes
                    </span>
                    <span style={{ color: '#D5CFC2' }} aria-hidden="true">&bull;</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#103F35', opacity: 0.8, flexShrink: 0 }} aria-hidden="true" />
                      Thoughtful questions
                    </span>
                    <span style={{ color: '#D5CFC2' }} aria-hidden="true">&bull;</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#103F35', opacity: 0.8, flexShrink: 0 }} aria-hidden="true" />
                      Immediate reflective clarity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — THE BOOK (Theme 1: Ivory) */}
      <section className="section theme-ivory" id="book" style={{ position: 'relative', overflow: 'hidden' }}>
        <WindLeavesStream />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="book-grid reveal-on-scroll">
            <div className="book-content">
              <h2 className="large-section-title" style={{ marginTop: '0', marginBottom: '14px' }}>
                The Space on Your Side
              </h2>

              <div className="book-subtitle-tag" style={{ fontSize: '16.5px', color: '#103F35', fontWeight: 600, marginBottom: '24px' }}>
                The Modern Vastu of Energy, Light and Flow &nbsp;&bull;&nbsp; By Shrijal Talkar
              </div>

              <div className="book-desc-content">
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontStyle: 'italic', color: '#103F35', marginBottom: '20px', lineHeight: '1.4' }}>
                  &ldquo;What if Vastu began with curiosity rather than concern?&rdquo;
                </p>
                <p style={{ fontSize: '16.5px', lineHeight: '1.75', color: '#4A4944', marginBottom: '20px' }}>
                  In her book, Shrijal introduces a contemporary perspective on traditional Vastu ideas and the spaces we inhabit. An invitation to observe more closely, ask better questions and reconsider the way we relate to our surroundings.
                </p>
                <div className="book-quote-box" style={{ background: '#FFFFFF', borderTop: '1px solid #E6E4DD', borderRight: '1px solid #E6E4DD', borderBottom: '1px solid #E6E4DD', borderLeft: '4px solid #103F35', marginTop: '24px', padding: '16px 20px' }}>
                  <p style={{ fontSize: '14px', marginBottom: '4px', color: '#5A5954' }}>
                    Shrijal’s modern Vastu approach is built around one belief:
                  </p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontStyle: 'italic', color: '#103F35' }}>
                    &ldquo;Don’t fear your space. Understand it.&rdquo;
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsBookModalOpen(true)}
                className="btn-primary"
                id="see-the-book-btn"
                style={{ marginTop: '28px' }}
              >
                DISCOVER THE BOOK <span>&rarr;</span>
              </button>
            </div>

            <div className="book-mockup-frame" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <OrbitGraphic
                size={820}
                style={{
                  top: '50%',
                  right: '-180px',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  maxWidth: 'none',
                  maxHeight: 'none'
                }}
                opacity={0.35}
                rotation={80}
                variant="minimal"
              />
              <Image
                src="/images/book-mockup.png"
                alt="The Space on Your Side by Shrijal Talkar"
                width={558}
                height={666}
                style={{ display: 'block', width: '100%', maxWidth: '420px', height: 'auto', position: 'relative', zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 08 — CASE STUDIES (Theme 2: Logo Green) */}
      <section className="section theme-green" id="case-studies" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header reveal-on-scroll">
            <div>
              <h2 className="large-section-title" style={{ marginTop: '0', color: '#FFFFFF' }}>
                Every space<br />
                <em style={{ color: '#FFFFFF' }}>has a story.</em>
              </h2>
            </div>
            <div style={{ maxWidth: '620px' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#FFFFFF', marginBottom: '12px', lineHeight: '1.4' }}>
                A family&apos;s home. A newly planned workplace. An existing property seen in a different light.
              </p>
              <p className="header-aside-text" style={{ fontSize: '15.5px', lineHeight: '1.65', color: '#D6E6DF' }}>
                Explore selected consultations through the client&apos;s starting point, Shrijal&apos;s observations and the recommendations that followed.
              </p>
            </div>
          </div>

          <div className="stories-three-col reveal-on-scroll reveal-stagger" style={{ marginBottom: '0', borderBottom: 'none' }}>
            {storiesData.map((story) => (
              <a
                key={story.id}
                href={story.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="story-card-col"
                style={{ textDecoration: 'none', display: 'flex', cursor: 'pointer' }}
                aria-label={`Open ${story.title} PDF in a new tab`}
              >
                <div className="story-image-box">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 992px) 100vw, 435px"
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    className={`story-know-more-btn ${story.buttonTheme}`}
                    aria-hidden="true"
                  >
                    <span>{story.buttonText}</span>
                    <span className="story-btn-arrow">&rarr;</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — CLIENT EXPERIENCES (Theme 3: Warm Beige) */}
      <section className="section theme-beige" id="client-experiences" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header reveal-on-scroll">
            <div>
              <h2 className="large-section-title">
                The experience,<br />
                <em>in their own words.</em>
              </h2>
            </div>
            <div style={{ maxWidth: '620px' }}>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#383733', marginBottom: '8px' }}>
                A consultation is as much about being heard and understanding the recommendations as it is about the space itself.
              </p>
              <p className="header-aside-text" style={{ fontSize: '15.5px', color: '#5A5954' }}>
                Read authentic accounts from people who have worked with Shrijal.
              </p>
            </div>
          </div>

          <div className="testimonial-grid reveal-on-scroll reveal-stagger" style={{ marginTop: '0', borderTop: 'none' }}>
            <div className="testimonial-col">
              <p className="testimonial-quote">
                &ldquo;Since the changes Shrijal suggested, our office simply feels calmer. My team seems happier coming in to work.&rdquo;
              </p>
              <div className="testimonial-author">Neeta &mdash; Business Story</div>
            </div>

            <div className="testimonial-col">
              <p className="testimonial-quote">
                &ldquo;Our home feels warmer now, more peaceful. It&apos;s a lovely feeling to come back to.&rdquo;
              </p>
              <div className="testimonial-author">Shivam &mdash; Home Story</div>
            </div>

            <div className="testimonial-col">
              <p className="testimonial-quote">
                &ldquo;Shrijal helped me see how connected my work and home really are. Both feel more balanced now.&rdquo;
              </p>
              <div className="testimonial-author">Ravi &mdash; Business + Home Story</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — CONSULTATION (Theme 1: Ivory) */}
      <section className="section theme-ivory" id="consultation" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header reveal-on-scroll">
            <div>
              <h2 className="large-section-title">
                A clearer understanding<br />
                <em>of your space begins here.</em>
              </h2>
            </div>
            <div style={{ maxWidth: '600px' }}>
              <p style={{ fontSize: '17.5px', lineHeight: '1.7', color: '#4A4944', marginBottom: '16px' }}>
                Whether you are planning something new or reconsidering an existing home or workplace, start with a conversation about what matters to you.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#103F35', fontWeight: 600, letterSpacing: '0.01em' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#103F35', flexShrink: 0 }} aria-hidden="true" />
                  <span>Direct consultation with Shrijal Talkar</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#103F35', fontWeight: 600, letterSpacing: '0.01em' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#103F35', flexShrink: 0 }} aria-hidden="true" />
                  <span>Practical, considered guidance</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#103F35', fontWeight: 600, letterSpacing: '0.01em' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#103F35', flexShrink: 0 }} aria-hidden="true" />
                  <span>No fear, no unnecessary demolition</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="consult-form-wrapper reveal-on-scroll">
            {consultSubmitted ? (
              <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#103F35',
                    color: '#FFFFFF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: '0 8px 24px rgba(16, 63, 53, 0.25)'
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '700',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#103F35',
                    marginBottom: '8px'
                  }}
                >
                  REPORT SUBMITTED SUCCESSFULLY
                </div>

                <h3 className="modal-headline" style={{ marginBottom: '12px', color: '#103F35' }}>
                  Your Report Has Been Submitted Successfully!
                </h3>

                <p className="modal-subtext" style={{ fontSize: '15.5px', maxWidth: '540px', margin: '0 auto 24px auto', color: '#383531' }}>
                  A confirmation email has been dispatched to <strong style={{ color: '#103F35' }}>{consultForm.email}</strong>. You will receive your space review and consultation update within <strong>24 to 48 hours</strong>. Our team will contact you <strong>as soon as possible</strong>.
                </p>

                <div
                  style={{
                    maxWidth: '460px',
                    margin: '0 auto 24px auto',
                    backgroundColor: '#F8F6F1',
                    border: '1px solid #ECE7DE',
                    borderRadius: '10px',
                    padding: '18px 22px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '1.6'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #E8E3DA', paddingBottom: '6px' }}>
                    <span style={{ color: '#6A655C', fontWeight: '500' }}>Client Name:</span>
                    <span style={{ color: '#1C1C1A', fontWeight: '600' }}>{consultForm.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #E8E3DA', paddingBottom: '6px' }}>
                    <span style={{ color: '#6A655C', fontWeight: '500' }}>Space Type:</span>
                    <span style={{ color: '#103F35', fontWeight: '600' }}>{consultForm.spaceType}</span>
                  </div>
                  {consultForm.city && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #E8E3DA', paddingBottom: '6px' }}>
                      <span style={{ color: '#6A655C', fontWeight: '500' }}>City:</span>
                      <span style={{ color: '#1C1C1A', fontWeight: '600' }}>{consultForm.city}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6A655C', fontWeight: '500' }}>Confirmation Status:</span>
                    <span style={{ color: '#103F35', fontWeight: '600' }}>Sent to {consultForm.email}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setConsultSubmitted(false);
                    setConsultForm({ name: '', phone: '', email: '', spaceType: 'Residential Vastu (Apartment, Villa, Living Space)', city: '', enquiry: '' });
                  }}
                  className="btn-outline"
                  style={{ padding: '10px 24px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit}>
                <div className="form-row-grid">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Sharma"
                      className="form-input"
                      value={consultForm.name}
                      onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Contact Number (Phone)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="form-input"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="form-input"
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Goa, Bengaluru"
                      className="form-input"
                      value={consultForm.city}
                      onChange={(e) => setConsultForm({ ...consultForm, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label">Type of Space</label>
                  <select
                    className="form-select"
                    value={consultForm.spaceType}
                    onChange={(e) => setConsultForm({ ...consultForm, spaceType: e.target.value })}
                  >
                    <option value="Residential Vastu (Apartment, Villa, Living Space)">Residential Vastu (Apartment, Villa, Living Space)</option>
                    <option value="Business Vastu (Office, Retail, Commercial Workspace)">Business Vastu (Office, Retail, Commercial Workspace)</option>
                    <option value="New & Existing Properties (Planning, Land, Renovations)">New &amp; Existing Properties (Planning, Land, Renovations)</option>
                    <option value="Both Business & Home Space">Both Business &amp; Home Space</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '28px' }}>
                  <label className="form-label">Your Enquiry</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your space, concerns, or what you would like to explore..."
                    className="form-textarea"
                    value={consultForm.enquiry}
                    onChange={(e) => setConsultForm({ ...consultForm, enquiry: e.target.value })}
                  ></textarea>
                </div>

                {submitError && (
                  <div style={{ color: '#C33F4B', fontSize: '14px', marginBottom: '16px', textAlign: 'center', backgroundColor: '#FDF2F4', padding: '10px 14px', borderRadius: '6px' }}>
                    {submitError}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    style={{ minWidth: '260px', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? 'SUBMITTING...' : (
                      <>
                        BOOK A CONSULTATION <span>&rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 11 — FOOTER (Theme 2: Logo Green) */}
      <footer className="footer-section theme-green">
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-left-content">
              <div className="footer-logo-badge">
                <Image
                  src="/images/shrijal-logo.png"
                  alt="Shrijal Modern Vastu Expert"
                  width={220}
                  height={64}
                  style={{ height: '44px', width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <div className="footer-brand-meta">
                <div style={{ fontWeight: '600', fontSize: '17px', color: '#FFFFFF', marginBottom: '4px' }}>Shrijal Talkar</div>
                <div style={{ color: '#E8E5DF', marginBottom: '2px' }}>Modern Vastu Consultant | Author</div>
                <div style={{ color: '#D6E6DF', fontSize: '13.5px' }}>Gold Medalist in Vastu &bull; Trained under Aashish Patidar</div>
                <div style={{ color: '#D6E6DF', fontSize: '13.5px' }}>Author of <em style={{ color: '#FFFFFF', fontStyle: 'italic', fontWeight: '500' }}>The Space on Your Side</em></div>
              </div>
            </div>

            <div className="footer-right-content">
              <h3 className="footer-slogan" style={{ fontSize: '28px', color: '#FFFFFF', marginBottom: '8px' }}>
                Your Space. On Your Side.
              </h3>
              <p className="footer-sub" style={{ marginBottom: '24px', color: '#D6E6DF' }}>
                Residential Vastu &nbsp;&bull;&nbsp; Business Vastu &nbsp;&bull;&nbsp; New &amp; Existing Properties
              </p>
              <button
                onClick={() => setIsConsultOpen(true)}
                className="btn-primary"
                id="footer-book-consult-btn"
                style={{ background: '#FFFFFF', color: '#103F35', border: 'none' }}
              >
                BOOK A CONSULTATION <span>&rarr;</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div style={{ color: '#D6E6DF' }}>&copy; 2026 Shrijal Talkar. All rights reserved.</div>
            <div className="footer-links-wrap">
              <a href="#services" className="footer-nav-link" style={{ color: '#FFFFFF' }}>Home Vastu</a>
              <a href="#services" className="footer-nav-link" style={{ color: '#FFFFFF' }}>Business Vastu</a>
              <a href="#approach" className="footer-nav-link" style={{ color: '#FFFFFF' }}>Approach</a>
              <a href="#book" className="footer-nav-link" style={{ color: '#FFFFFF' }}>Book</a>
              <a href="#case-studies" className="footer-nav-link" style={{ color: '#FFFFFF' }}>Case Studies</a>
              <a href="#consultation" className="footer-nav-link" style={{ color: '#FFFFFF' }}>Consultation</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA */}
      <button
        type="button"
        onClick={() => openSpaceCheckWith('Business')}
        className="sticky-action-pill"
        id="sticky-check-space-btn"
        aria-label="Not sure where to begin? Check your space"
      >
        <span className="sticky-pill-prompt">
          <span className="sticky-pill-dot" aria-hidden="true"></span>
          <span className="sticky-pill-label">Not sure where to begin?</span>
        </span>
        <span className="sticky-pill-cta-btn">
          <span>CHECK YOUR SPACE</span>
          <span className="sticky-pill-arrow" aria-hidden="true">&rarr;</span>
        </span>
      </button>

      {/* MODAL 1: Book a Consultation Modal */}
      {isConsultOpen && (
        <div className="modal-backdrop" onClick={() => setIsConsultOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsConsultOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {consultSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 8px 12px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#103F35',
                    color: '#FFFFFF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: '0 8px 24px rgba(16, 63, 53, 0.25)'
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>

                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '700',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#103F35',
                    marginBottom: '8px'
                  }}
                >
                  REPORT SUBMITTED SUCCESSFULLY
                </div>

                <h3 className="modal-headline" style={{ marginBottom: '12px' }}>
                  Your Report Has Been Submitted Successfully!
                </h3>

                <p
                  className="modal-subtext"
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.65',
                    color: '#383531',
                    maxWidth: '490px',
                    margin: '0 auto 24px auto'
                  }}
                >
                  A confirmation email has been sent to <strong style={{ color: '#103F35' }}>{consultForm.email}</strong>. You will receive your space review and consultation update within <strong>24 to 48 hours</strong>. Our team will contact you <strong>as soon as possible</strong>.
                </p>

                <div
                  style={{
                    backgroundColor: '#F8F6F1',
                    border: '1px solid #ECE7DE',
                    borderRadius: '10px',
                    padding: '18px 22px',
                    textAlign: 'left',
                    marginBottom: '26px',
                    fontSize: '14px',
                    lineHeight: '1.6'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #E8E3DA', paddingBottom: '6px' }}>
                    <span style={{ color: '#6A655C', fontWeight: '500' }}>Client Name:</span>
                    <span style={{ color: '#1C1C1A', fontWeight: '600' }}>{consultForm.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #E8E3DA', paddingBottom: '6px' }}>
                    <span style={{ color: '#6A655C', fontWeight: '500' }}>Contact Phone:</span>
                    <span style={{ color: '#1C1C1A', fontWeight: '600' }}>{consultForm.phone}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #E8E3DA', paddingBottom: '6px' }}>
                    <span style={{ color: '#6A655C', fontWeight: '500' }}>Space Type:</span>
                    <span style={{ color: '#103F35', fontWeight: '600' }}>{consultForm.spaceType}</span>
                  </div>
                  {consultForm.city && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #E8E3DA', paddingBottom: '6px' }}>
                      <span style={{ color: '#6A655C', fontWeight: '500' }}>City:</span>
                      <span style={{ color: '#1C1C1A', fontWeight: '600' }}>{consultForm.city}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6A655C', fontWeight: '500' }}>Confirmation Status:</span>
                    <span style={{ color: '#103F35', fontWeight: '600' }}>Sent to {consultForm.email}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setConsultSubmitted(false);
                    setIsConsultOpen(false);
                    setConsultForm({ name: '', phone: '', email: '', spaceType: 'Residential Vastu (Apartment, Villa, Living Space)', city: '', enquiry: '' });
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Close &amp; Return To Site &rarr;
                </button>
              </div>
            ) : (
              <>
                <h3 className="modal-headline">Book a Consultation</h3>
                <p className="modal-subtext">
                  Direct conversation with Shrijal Talkar for your business or home space.
                </p>

                <form onSubmit={handleConsultSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Sharma"
                      className="form-input"
                      value={consultForm.name}
                      onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="form-input"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="form-input"
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Space Type</label>
                    <select
                      className="form-select"
                      value={consultForm.spaceType}
                      onChange={(e) => setConsultForm({ ...consultForm, spaceType: e.target.value })}
                    >
                      <option value="Residential Vastu (Apartment, Villa, Living Space)">Residential Vastu (Apartment, Villa, Living Space)</option>
                      <option value="Business Vastu (Office, Retail, Commercial Workspace)">Business Vastu (Office, Retail, Commercial Workspace)</option>
                      <option value="New & Existing Properties (Planning, Land, Renovations)">New &amp; Existing Properties (Planning, Land, Renovations)</option>
                      <option value="Both Business & Home Space">Both Business &amp; Home Space</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Goa, Bengaluru"
                      className="form-input"
                      value={consultForm.city}
                      onChange={(e) => setConsultForm({ ...consultForm, city: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Enquiry</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us about your space, concerns, or what you would like to explore..."
                      className="form-textarea"
                      value={consultForm.enquiry}
                      onChange={(e) => setConsultForm({ ...consultForm, enquiry: e.target.value })}
                    ></textarea>
                  </div>

                  {submitError && (
                    <div style={{ color: '#C33F4B', fontSize: '13.5px', marginBottom: '14px', textAlign: 'center', backgroundColor: '#FDF2F4', padding: '10px 14px', borderRadius: '6px' }}>
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        Book a Consultation <span>&rarr;</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Interactive 2-Minute Space Check Quiz */}
      {isSpaceCheckOpen && (
        <div className="modal-backdrop" onClick={() => setIsSpaceCheckOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsSpaceCheckOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {!quizFinished ? (
              <div>
                <div className="section-label" style={{ marginBottom: '8px' }}>
                  2-MINUTE SPACE CHECK &bull; STEP {quizStep} OF 3
                </div>

                {quizStep === 1 && (
                  <div>
                    <h3 className="modal-headline">What kind of space are we evaluating?</h3>
                    <p className="modal-subtext">Select the primary environment you are examining.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                      {['Business / Commercial Space', 'Residence / Home Space', 'Both Work & Living Environment'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className="btn-outline"
                          style={{
                            textAlign: 'left',
                            justifyContent: 'space-between',
                            backgroundColor: quizAnswers.spaceType === opt ? '#1C1C1A' : 'transparent',
                            color: quizAnswers.spaceType === opt ? '#FFFFFF' : '#1C1C1A'
                          }}
                          onClick={() => {
                            setQuizAnswers({ ...quizAnswers, spaceType: opt });
                            setQuizStep(2);
                          }}
                        >
                          {opt} <span>&rarr;</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div>
                    <h3 className="modal-headline">What stands out in daily use?</h3>
                    <p className="modal-subtext">How does the space feel when people are working or living in it?</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                      {[
                        'Persistent feeling of stagnation or restlessness',
                        'Uneven energy — some corners feel heavy or neglected',
                        'Decision fatigue, conflicts, or unexplained friction',
                        'Space feels generally fine, but could feel much better'
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className="btn-outline"
                          style={{
                            textAlign: 'left',
                            justifyContent: 'space-between',
                            backgroundColor: quizAnswers.feeling === opt ? '#1C1C1A' : 'transparent',
                            color: quizAnswers.feeling === opt ? '#FFFFFF' : '#1C1C1A'
                          }}
                          onClick={() => {
                            setQuizAnswers({ ...quizAnswers, feeling: opt });
                            setQuizStep(3);
                          }}
                        >
                          {opt} <span>&rarr;</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 3 && (
                  <div>
                    <h3 className="modal-headline">How is natural light and movement flow?</h3>
                    <p className="modal-subtext">Modern Vastu studies light and actual movement patterns first.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                      {[
                        'Subdued natural light, heavy reliance on artificial lights',
                        'Good light, but circulation pathways feel obstructed or cluttered',
                        'High activity areas placed in low-energy or dark zones',
                        'Open layout, but lacks designated focus and resting points'
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className="btn-outline"
                          style={{
                            textAlign: 'left',
                            justifyContent: 'space-between',
                            backgroundColor: quizAnswers.light === opt ? '#1C1C1A' : 'transparent',
                            color: quizAnswers.light === opt ? '#FFFFFF' : '#1C1C1A'
                          }}
                          onClick={() => {
                            setQuizAnswers({ ...quizAnswers, light: opt });
                            setQuizFinished(true);
                          }}
                        >
                          {opt} <span>&rarr;</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="section-label" style={{ marginBottom: '8px' }}>
                  SPACE CHECK INSIGHT
                </div>
                <h3 className="modal-headline" style={{ marginBottom: '16px' }}>
                  Your space has subtle friction worth looking at.
                </h3>
                <p className="modal-subtext" style={{ marginBottom: '24px' }}>
                  Based on your responses for <strong>{quizAnswers.spaceType}</strong>:
                </p>

                <div style={{ background: '#F2EFEB', padding: '24px', borderLeft: '3px solid #1C1C1A', marginBottom: '28px' }}>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#2B2A27', marginBottom: '12px' }}>
                    <strong>Observation:</strong> You noted <em>&ldquo;{quizAnswers.feeling}&rdquo;</em> combined with <em>&ldquo;{quizAnswers.light}&rdquo;</em>.
                  </p>
                  <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: '#52514D' }}>
                    In Modern Vastu, these symptoms often point to directional energy misalignment or improper placement of key functional activities. Rather than costly demolition, targeted practical re-orientation of key zones usually brings immense balance.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setIsSpaceCheckOpen(false);
                      setIsConsultOpen(true);
                    }}
                    className="btn-primary"
                    style={{ flex: '1', justifyContent: 'center' }}
                  >
                    Discuss With Shrijal <span>&rarr;</span>
                  </button>

                  <button
                    onClick={() => {
                      setQuizStep(1);
                      setQuizFinished(false);
                    }}
                    className="btn-outline"
                  >
                    Retake Check
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Case Study Details Modal */}
      {selectedCaseModal && (
        <div className="modal-backdrop" onClick={() => setSelectedCaseModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedCaseModal(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {selectedCaseModal === 'business' ? (
              <div>
                <div className="section-label">BUSINESS CASE STUDY</div>
                <h3 className="modal-headline">A Real Business Concern. Studied Through the Space.</h3>
                <p className="modal-subtext">Commercial Office &amp; Executive Headquarters Case</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Concern</h4>
                    <p>A fast-scaling tech enterprise experienced frequent decision-making standstills and unexpected executive turnover within 8 months of moving into their new commercial floor.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Observation</h4>
                    <p>Shrijal studied the full orientation and found leadership workstations aligned directly facing high-traffic corridors with south-west energy stagnation, cutting off natural focus.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Change</h4>
                    <p>Zero civil demolition was needed. Cabin orientations were re-anchored towards beneficial geomagnetic coordinates, lighting temperature was re-balanced, and meeting flow was rerouted.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Client&apos;s Experience</h4>
                    <p>&ldquo;Within weeks, the heavy tension in boardroom debates dissipated. The space now feels grounded and decisive.&rdquo;</p>
                  </div>
                </div>

                <div style={{ marginTop: '36px' }}>
                  <button
                    onClick={() => {
                      setSelectedCaseModal(null);
                      setIsConsultOpen(true);
                    }}
                    className="btn-primary"
                  >
                    Book A Business Consultation <span>&rarr;</span>
                  </button>
                </div>
              </div>
            ) : selectedCaseModal === 'home' ? (
              <div>
                <div className="section-label">HOME STORY</div>
                <h3 className="modal-headline">A Real Home. A Real Reason to Look Closer.</h3>
                <p className="modal-subtext">Private Family Residence Renovation Case</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Concern</h4>
                    <p>A family that wanted to understand why their home no longer felt the same after renovation, experiencing persistent sleep disturbance and restlessness.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Observation</h4>
                    <p>The master bedroom headboard placement was positioned directly against an energetic shear zone, while the family gathering lounge was starved of natural morning light flow.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Change</h4>
                    <p>Practical modifications were carried out: repositioning sleeping axes, clearing magnetic blockage in the north-east corner, and recalibrating living room furniture layout without breaking walls.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Family&apos;s Experience</h4>
                    <p>&ldquo;Restful sleep returned almost immediately. The home finally feels warm, calm, and nurturing.&rdquo;</p>
                  </div>
                </div>

                <div style={{ marginTop: '36px' }}>
                  <button
                    onClick={() => {
                      setSelectedCaseModal(null);
                      setIsConsultOpen(true);
                    }}
                    className="btn-primary"
                  >
                    Book A Home Consultation <span>&rarr;</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="section-label">BUSINESS + HOME STORY</div>
                <h3 className="modal-headline">One Business Owner. Two Spaces. One Complete View.</h3>
                <p className="modal-subtext">Commercial Office &amp; Residence Integrated Case</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Concern</h4>
                    <p>A founder working 14-hour days felt the pressure of delayed business decisions following him home, creating restless evenings and depleted focus the next morning at work.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Observation</h4>
                    <p>Shrijal studied both spaces together: the office leadership desk was placed in a drained energy pocket, while the home study desk was placed right inside the master bedroom, preventing mental and energetic separation.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Change</h4>
                    <p>Re-anchored the executive workspace to a decisive geomagnetic axis, separated the home work desk completely from the bedroom rest zone, and optimized morning natural light flow without civil breaking.</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Client&apos;s Experience</h4>
                    <p>&ldquo;The tension stopped following me between work and home. Evenings feel peaceful, and boardroom clarity has returned completely.&rdquo;</p>
                  </div>
                </div>

                <div style={{ marginTop: '36px' }}>
                  <button
                    onClick={() => {
                      setSelectedCaseModal(null);
                      setIsConsultOpen(true);
                    }}
                    className="btn-primary"
                  >
                    Book A Consultation <span>&rarr;</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: Book Preview Modal */}
      {isBookModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsBookModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsBookModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="section-label">THE BOOK</div>
            <h3 className="modal-headline">The Space on Your Side</h3>
            <p className="modal-subtext">The Modern Vastu of Energy, Light and Flow &bull; By Shrijal Talkar</p>

            <div style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                In <em>The Space on Your Side</em>, Shrijal Talkar strips away superstitious dogma to present the timeless architectural principles of Vastu through a modern, actionable lens.
              </p>
              <h4 style={{ color: 'var(--text-primary)', marginTop: '8px' }}>Core Chapters:</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Chapter 1:</strong> The Invisible Architecture of Daily Life</li>
                <li><strong>Chapter 2:</strong> Direction &amp; Geomagnetic Equilibrium</li>
                <li><strong>Chapter 3:</strong> Light: The Regulator of Human Rhythm</li>
                <li><strong>Chapter 4:</strong> Flow Patterns in Modern Commercial Workplaces</li>
                <li><strong>Chapter 5:</strong> Corrections Without Demolition</li>
              </ul>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
              <button
                onClick={() => {
                  alert('Thank you for your interest! Pre-orders and dispatch details will be sent to you.');
                  setIsBookModalOpen(false);
                }}
                className="btn-primary"
              >
                Inquire For Copy <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
