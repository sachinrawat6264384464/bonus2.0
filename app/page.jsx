'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import OrbitGraphic from './components/OrbitGraphic';
import IntroSplash from './components/IntroSplash';
import FlyingBirds from './components/FlyingBirds';
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
    spaceType: 'Business Space',
    notes: ''
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setIsConsultOpen(false);
      setConsultForm({ name: '', phone: '', email: '', spaceType: 'Business Space', notes: '' });
    }, 2800);
  };

  const openSpaceCheckWith = (type) => {
    setSpaceCheckType(type);
    setQuizAnswers((prev) => ({ ...prev, spaceType: type }));
    setQuizStep(1);
    setQuizFinished(false);
    setIsSpaceCheckOpen(true);
  };

  const insightContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    if (insightContainerRef.current) {
      const items = insightContainerRef.current.querySelectorAll('.insight-reveal-item');
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-wrapper">
      {/* Intro Animation Preloader */}
      <IntroSplash />

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
                <li><a href="#insight" className="nav-link">Insight</a></li>
                <li><a href="#spaces" className="nav-link">Spaces</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#space-check" className="nav-link">Space Check</a></li>
                <li><a href="#book" className="nav-link">Book</a></li>
                <li><a href="#case-studies" className="nav-link">Proof</a></li>
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

      {/* 2. Hero Section */}
      <section className="hero-section" id="hero">
        <div className="container" style={{ width: '100%' }}>
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-subhead-tag">
                <span className="name">Shrijal Talkar</span>
                <span className="title">Modern Vastu Expert & Author</span>
              </div>

              <h1 className="hero-title">
                Your Space.<br />
                <em>On Your Side.</em>
              </h1>

              <h2 className="hero-lead-title">
                Modern Vastu for business and home.
              </h2>

              <p className="hero-description" style={{ fontSize: '17px', lineHeight: '1.65' }}>
                Because what happens at work follows you home.<br />
                And what happens at home follows you back to work.
              </p>

              <div className="hero-cta-group">
                <button
                  onClick={() => openSpaceCheckWith('Business')}
                  className="btn-primary"
                  id="hero-check-space-btn"
                >
                  CHECK MY SPACE <span>&rarr;</span>
                </button>
              </div>
            </div>

            <div className="hero-image-wrap">
              <OrbitGraphic
                size={700}
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                opacity={0.28}
                rotation={18}
                variant="arcs"
              />
              <div className="hero-image-frame">
                <Image
                  src="/images/shrijal-real-opt.png"
                  alt="Shrijal Talkar — Modern Vastu Expert & Author"
                  width={500}
                  height={580}
                  priority
                  style={{ display: 'block', width: '100%', height: 'auto', position: 'relative', zIndex: 2 }}
                />
              </div>
            </div>
          </div>

          <div className="hero-footer-bar">
            Gold Medalist in Vastu &nbsp;&bull;&nbsp; Trained under Aashish Patidar &nbsp;&bull;&nbsp; Author of <em>The Space on Your Side</em>
          </div>
        </div>
      </section>

      {/* Human Insight: Work-to-Home Tension */}
      <section className="section" id="insight" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }} ref={insightContainerRef}>
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ marginBottom: '16px' }}>HUMAN INSIGHT</div>
            <h2 className="large-section-title insight-reveal-item" style={{ marginBottom: '24px' }}>
              You may leave the office.<br />
              <em>But the office doesn’t always leave you.</em>
            </h2>

            <div className="insight-grid">
              {[
                'The pending payment.',
                'The difficult decision.',
                'The team issue.',
                'The number you missed.'
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="insight-item-box insight-reveal-item"
                  style={{ transitionDelay: `${idx * 130}ms` }}
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="insight-reveal-item" style={{ fontSize: '18px', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              You carry some of it home.<br />
              And the next morning, poor sleep, stress, or tension at home comes back with you.
            </p>

            <div className="insight-reveal-item" style={{ width: '48px', height: '1px', background: 'var(--border-strong)', margin: '24px auto' }} />

            <h3 className="insight-reveal-item" style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Two spaces. One life.
            </h3>
            <p className="insight-reveal-item" style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
              Shrijal looks at both &mdash; your business, your home, and how these spaces support the life you are building.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Section 3: Which space would you like to look at? */}
      <section className="section" id="spaces" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header" style={{ marginBottom: '50px' }}>
            <h2 className="large-section-title">
              You don’t need to know Vastu.<br />
              <em>Start with what you are noticing.</em>
            </h2>
            <p className="header-aside-text">
              Notice what is happening in the space day to day. Select your space below to understand the deeper flow.
            </p>
          </div>

          <div className="spaces-three-col">
            {/* Business Card */}
            <div className="spaces-card">
              <div>
                <div className="section-label">BUSINESS</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-4 mb-6">
                  Business
                </h3>
                <ul className="clean-bullet-list">
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Growth feels slow.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Money feels tight.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>The team feels unsettled.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Decisions feel harder.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Something just feels stuck.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openSpaceCheckWith('Business')}
                className="btn-outline w-full justify-between"
                id="check-business-btn"
              >
                CHECK MY BUSINESS <span>&rarr;</span>
              </button>
            </div>

            {/* Home Card */}
            <div className="spaces-card">
              <div>
                <div className="section-label">HOME</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-4 mb-6">
                  Home
                </h3>
                <ul className="clean-bullet-list">
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Peace feels less.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Sleep feels disturbed.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Stress stays longer.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Relationships feel harder.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>The home simply doesn’t feel the same.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openSpaceCheckWith('Home')}
                className="btn-outline w-full justify-between"
                id="check-home-btn"
              >
                CHECK MY HOME <span>&rarr;</span>
              </button>
            </div>

            {/* Both Card */}
            <div className="spaces-card">
              <div>
                <div className="section-label">BOTH</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-4 mb-6">
                  Both
                </h3>
                <ul className="clean-bullet-list">
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Work affects home.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>Home affects work.</span>
                  </li>
                  <li className="clean-bullet-item">
                    <span className="clean-bullet-dot">&bull;</span>
                    <span>And you want to understand the bigger picture.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openSpaceCheckWith('Both')}
                className="btn-outline w-full justify-between"
                id="check-both-btn"
              >
                CHECK BOTH SPACES <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Section 7: About Shrijal Talkar */}
      <section className="section" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Poetic atmosphere: Gentle sunbeam glow & birds */}
        <SunbeamGlow />
        <FlyingBirds />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="about-grid">
            <div className="about-photo-wrap">
              <OrbitGraphic
                size={660}
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                opacity={0.25}
                rotation={-45}
                variant="concentric"
              />
              <div className="about-photo-frame">
                <Image
                  src="/images/shrijal-real-opt.png"
                  alt="Shrijal Talkar portrait"
                  width={500}
                  height={580}
                  style={{ display: 'block', width: '100%', height: 'auto', position: 'relative', zIndex: 2 }}
                />
              </div>
            </div>

            <div className="about-content">
              <div className="section-label">WHY SHRIJAL</div>
              <h2 className="large-section-title" style={{ marginTop: '8px', marginBottom: '16px' }}>
                You bring the problem.<br />
                <em>Shrijal studies the space.</em>
              </h2>

              <div className="about-role" style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Shrijal Talkar is a Modern Vastu Expert and Author.
              </div>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                She studied Vastu under leading Vastu-Astro expert Aashish Patidar and became a Gold Medalist in Vastu.
              </p>

              <div className="about-divider"></div>

              <div className="about-belief-intro" style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                Her approach is simple:
              </div>

              <ul style={{ listStyle: 'none', margin: '16px 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>&bull;</span> Understand the person.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>&bull;</span> Study the space.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>&bull;</span> Find what matters.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>&bull;</span> Suggest what is practical.
                </li>
              </ul>

              <div style={{ background: '#F4F2EC', padding: '20px 24px', borderLeft: '3px solid #1C1C1A', marginTop: '20px' }}>
                <p style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  No fear. No unnecessary demolition. No complicated Vastu talk.
                </p>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                  Just clear guidance you can understand and use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Section 9: 2-Minute Space Check */}
      <section className="section" id="space-check" style={{ position: 'relative', overflow: 'hidden' }}>
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
          <div className="spacecheck-grid">
            <div className="spacecheck-left">
              <h2 className="large-section-title">
                Is your space<br />
                <em>on your side?</em>
              </h2>

              <h3 className="spacecheck-callout" style={{ fontSize: '30px', marginTop: '16px', marginBottom: '12px' }}>
                Take the 2-Minute Space Check.
              </h3>

              <p className="spacecheck-p" style={{ marginBottom: '28px', fontSize: '17px' }}>
                A simple first step for business owners.
              </p>

              <button
                onClick={() => openSpaceCheckWith(spaceCheckType)}
                className="btn-primary"
                id="start-space-check-btn"
              >
                START MY FREE SPACE CHECK <span>&rarr;</span>
              </button>
            </div>

            <div className="spacecheck-right">
              <div className="spacecheck-selector-title" style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                Choose: Business &bull; Home &bull; Both.
              </div>

              <div className="selector-options-row">
                <button
                  type="button"
                  onClick={() => setSpaceCheckType('Business')}
                  className={`selector-option-btn ${spaceCheckType === 'Business' ? 'active' : ''}`}
                >
                  Business
                </button>
                <span className="selector-divider-dot">&middot;</span>
                <button
                  type="button"
                  onClick={() => setSpaceCheckType('Home')}
                  className={`selector-option-btn ${spaceCheckType === 'Home' ? 'active' : ''}`}
                >
                  Home
                </button>
                <span className="selector-divider-dot">&middot;</span>
                <button
                  type="button"
                  onClick={() => setSpaceCheckType('Both')}
                  className={`selector-option-btn ${spaceCheckType === 'Both' ? 'active' : ''}`}
                >
                  Both
                </button>
              </div>

              <div className="spacecheck-bullets">
                <p>Answer a few simple questions.</p>
                <p>No Vastu knowledge needed. No technical terms. No fear-based predictions.</p>
                <p className="conclusion" style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '8px' }}>
                  2 minutes. One clearer view of your space.
                </p>
                <p style={{ marginTop: '8px' }}>At the end, see which areas may deserve a closer look.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section 8: The Space on Your Side (Book) */}
      <section className="section" id="book" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Vague poetic elements: Gentle leaves tumbling on natural airflow */}
        <WindLeavesStream />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="book-grid">
            <div className="book-content">
              <div className="section-label">THE BOOK</div>
              <h2 className="large-section-title" style={{ marginTop: '8px', marginBottom: '20px' }}>
                One idea<br />
                <em>became a book.</em>
              </h2>

              <h3 className="book-title-tag">The Space on Your Side</h3>
              <div className="book-subtitle-tag">
                The Modern Vastu of Energy, Light and Flow &nbsp;&bull;&nbsp; By Shrijal Talkar
              </div>

              <div className="book-desc-content">
                <p>
                  Your space is not just where life happens.<br />
                  It is part of how life happens.
                </p>
                <div className="book-keywords-serif">
                  Light. Movement. Flow. Energy.
                </div>
                <p>
                  And the way people feel and function inside a space.
                </p>
                <div style={{ marginTop: '24px', padding: '16px 20px', borderLeft: '2px solid var(--border-dark)', background: '#F5F3ED' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Shrijal’s modern Vastu approach is built around one belief:
                  </p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                    &ldquo;Don’t fear your space. Understand it.&rdquo;
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsBookModalOpen(true)}
                className="btn-outline"
                id="see-the-book-btn"
              >
                See The Book <span>&rarr;</span>
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

      {/* 6. Section 5: Real spaces tell you more than big promises. */}
      <section className="section" id="case-studies" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header">
            <div>
              <div className="section-label">07 &bull; PROOF</div>
              <h2 className="large-section-title" style={{ marginTop: '8px' }}>
                Real spaces.<br />
                <em>Real stories.</em>
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                No big promises. No dramatic claims.
              </p>
              <p className="header-aside-text">
                See what the client was facing, what Shrijal studied, what was changed, and what the client experienced after.
              </p>
            </div>
          </div>

          <div className="stories-three-col" style={{ marginBottom: '64px', borderBottom: 'none' }}>
            {/* Business Story */}
            <div className="story-card-col">
              <div>
                <div className="section-label">BUSINESS STORY</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-3 mb-4">
                  Business Story
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[#5A5954]">
                  A business owner who felt something was not moving the way it should.
                </p>
              </div>
            </div>

            {/* Home Story */}
            <div className="story-card-col">
              <div>
                <div className="section-label">HOME STORY</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-3 mb-4">
                  Home Story
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[#5A5954]">
                  A family that wanted to understand why their home no longer felt the same.
                </p>
              </div>
            </div>

            {/* Business + Home Story */}
            <div className="story-card-col">
              <div>
                <div className="section-label">BUSINESS + HOME</div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1C1A] mt-3 mb-4">
                  Business + Home
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[#5A5954]">
                  One business owner. Two spaces. One complete view.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials Sub-Header: One clean dividing line */}
          <div className="split-headline-header" id="stories" style={{ paddingTop: '40px', borderTop: '1px solid var(--border-subtle)', marginBottom: '32px' }}>
            <h2 className="large-section-title">Some real stories.</h2>
            <p className="header-aside-text">
              Shared in the words of the people who live and work in them.
            </p>
          </div>

          <div className="testimonial-grid" style={{ marginTop: '0', borderTop: 'none' }}>
            <div className="testimonial-col">
              <p className="testimonial-quote">
                &ldquo;Since the changes Shrijal suggested, our office simply feels calmer. My team seems happier coming in to work.&rdquo;
              </p>
              <div className="testimonial-author">Neeta &mdash; Business story</div>
            </div>

            <div className="testimonial-col">
              <p className="testimonial-quote">
                &ldquo;Our home feels warmer now, more peaceful. It&apos;s a lovely feeling to come back to.&rdquo;
              </p>
              <div className="testimonial-author">Shivam &mdash; Home story</div>
            </div>

            <div className="testimonial-col">
              <p className="testimonial-quote">
                &ldquo;Shrijal helped me see how connected my work and home really are. Both feel more balanced now.&rdquo;
              </p>
              <div className="testimonial-author">Ravi &mdash; Business + Home story</div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Section 10: Before you change your space... understand it. */}
      <section className="direct-speak-banner" id="consultation" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Vague poetic elements: Subtle breathing energy clarity circle */}
        <EnergyPulseRing />

        <OrbitGraphic
          size={640}
          style={{
            top: '50%',
            right: '-140px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}
          opacity={0.18}
          rotation={45}
          variant="arcs"
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="banner-flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div style={{ maxWidth: '640px' }}>
              <h2 className="banner-title" style={{ marginBottom: '16px' }}>
                Before you change your space...<br />
                <em>understand it.</em>
              </h2>
              <div style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                <p>Maybe your business needs attention.</p>
                <p>Maybe your home does.</p>
                <p>Maybe both are already fine.</p>
                <p style={{ marginTop: '12px', color: 'var(--text-primary)', fontWeight: '600' }}>
                  The first step is not a remedy. The first step is clarity.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openSpaceCheckWith('Both')}
                className="btn-primary justify-center text-center"
                id="cta-space-check-btn"
              >
                TAKE THE 2-MINUTE SPACE CHECK <span>&rarr;</span>
              </button>
              <span className="text-center text-xs uppercase tracking-widest text-[#82807A] font-medium px-2">or</span>
              <button
                onClick={() => setIsConsultOpen(true)}
                className="btn-outline justify-center text-center"
                id="banner-consult-btn"
              >
                BOOK A CONSULTATION <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Section 11: Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-left-content">
              <Image
                src="/images/shrijal-logo.png"
                alt="Shrijal Modern Vastu Expert"
                width={220}
                height={64}
                style={{ height: '48px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '18px' }}
              />
              <div className="footer-brand-meta" style={{ fontSize: '14.5px', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '16px' }}>Shrijal Talkar</div>
                <div>Modern Vastu Expert | Author</div>
                <div>Gold Medalist in Vastu</div>
                <div>Trained under Aashish Patidar</div>
                <div>Author of <em>The Space on Your Side</em></div>
              </div>
            </div>

            <div className="footer-right-content">
              <h3 className="footer-slogan">Your Space. On Your Side.</h3>
              <p className="footer-sub" style={{ marginBottom: '24px' }}>
                Business Vastu &nbsp;&bull;&nbsp; Home Vastu &nbsp;&bull;&nbsp; Business + Home
              </p>
              <button
                onClick={() => openSpaceCheckWith('Business')}
                className="btn-outline"
                id="footer-check-space-btn"
              >
                CHECK MY SPACE <span>&rarr;</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>&copy; {new Date().getFullYear()} Shrijal Talkar. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#insight" className="nav-link">Insight</a>
              <a href="#spaces" className="nav-link">Spaces</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#space-check" className="nav-link">Space Check</a>
              <a href="#book" className="nav-link">Book</a>
              <a href="#case-studies" className="nav-link">Proof</a>
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
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h3 className="modal-headline" style={{ marginBottom: '16px' }}>
                  Thank you for reaching out.
                </h3>
                <p className="modal-subtext">
                  Your consultation request has been received. Shrijal&apos;s desk will contact you shortly to schedule your discussion.
                </p>
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
                      <option value="Business Space (Office, Factory, Commercial)">Business Space (Office, Factory, Commercial)</option>
                      <option value="Home Space (Apartment, Villa, Renovation)">Home Space (Apartment, Villa, Renovation)</option>
                      <option value="Both Business & Home">Both Business &amp; Home</option>
                      <option value="Pre-Purchase Land / Architecture Layout Plan">Pre-Purchase Land / Architecture Layout Plan</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">What are you noticing in the space? (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Share brief context about what prompted you to seek a consultation..."
                      className="form-textarea"
                      value={consultForm.notes}
                      onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Confirm Consultation Request <span>&rarr;</span>
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
