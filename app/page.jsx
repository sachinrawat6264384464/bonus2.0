'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import OrbitGraphic from './components/OrbitGraphic';
import IntroSplash from './components/IntroSplash';

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
                <li><a href="#approach" className="nav-link">Approach</a></li>
                <li><a href="#spaces" className="nav-link">Business & Home</a></li>
                <li><a href="#case-studies" className="nav-link">Case Studies</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#book" className="nav-link">Book</a></li>
                <li><a href="#space-check" className="nav-link">Space Check</a></li>
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

              <p className="hero-description">
                A clear, practical way to understand your space and make the changes that truly matter.
              </p>

              <div className="hero-cta-group">
                <button
                  onClick={() => openSpaceCheckWith('Business')}
                  className="btn-primary"
                  id="hero-check-space-btn"
                >
                  Check My Space <span>&rarr;</span>
                </button>

                <button
                  onClick={() => setIsConsultOpen(true)}
                  className="btn-outline"
                  id="hero-consult-btn"
                >
                  Book a Consultation <span>&rarr;</span>
                </button>
              </div>
            </div>

            <div className="hero-image-wrap">
              <OrbitGraphic
                size={700}
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                opacity={0.55}
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
            Gold Medalist in Vastu &nbsp;&bull;&nbsp; Author of <em>The Space on Your Side</em>
          </div>
        </div>
      </section>

      {/* 3. Section 2: What you see is only part of the space */}
      <section className="section" id="approach" style={{ position: 'relative', overflow: 'hidden' }}>
        <OrbitGraphic
          size={780}
          style={{
            top: '50%',
            right: '-240px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}
          opacity={0.35}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header">
            <h2 className="large-section-title">
              What you see is only<br />
              <em>part of the space.</em>
            </h2>
            <p className="header-aside-text">
              A space can look perfectly fine and still deserve a closer look.
            </p>
          </div>

          <div className="two-col-bordered">
            {/* Left Col */}
            <div className="bordered-col">
              <div className="section-label">WHAT YOU SEE</div>
              <div className="grid-2x2-serif">
                <div className="large-serif-item">Rooms</div>
                <div className="large-serif-item">Furniture</div>
                <div className="large-serif-item">Colours</div>
                <div className="large-serif-item">Layout</div>
              </div>
            </div>

            {/* Right Col */}
            <div className="bordered-col">
              <div className="section-label">WHAT SHRIJAL STUDIES</div>
              <div className="vertical-serif-list">
                <div className="large-serif-item">Direction</div>
                <div className="large-serif-item">Light</div>
                <div className="large-serif-item">Energy</div>
                <div className="large-serif-item">Flow</div>
                <div className="large-serif-item">How the space is used</div>
              </div>
            </div>
          </div>

          <div className="bottom-aim-row">
            <h3 className="aim-title">The aim is simple.</h3>
            <p className="aim-desc">
              To understand how the space is working before deciding what needs to change.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Section 3: Which space would you like to look at? */}
      <section className="section" id="spaces" style={{ position: 'relative', overflow: 'hidden' }}>
        <OrbitGraphic
          size={780}
          style={{
            top: '50%',
            left: '-260px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}
          opacity={0.35}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header" style={{ marginBottom: '50px' }}>
            <h2 className="large-section-title">
              Which space would you<br />
              <em>like to look at?</em>
            </h2>
          </div>

          <div className="two-col-bordered">
            {/* Business */}
            <div className="bordered-col">
              <div className="space-card-content">
                <div>
                  <div className="section-label">BUSINESS</div>
                  <h3 className="card-title-serif">
                    Your business space is used every day by people, customers, teams and decisions.
                  </h3>
                  <p className="card-body-text">
                    Shrijal studies it as a whole, not as a collection of separate rooms.
                  </p>
                </div>

                <div>
                  <div className="tags-line">
                    Office &middot; Factory &middot; Hotel &middot; Resort &middot; Commercial Space
                  </div>
                  <button
                    onClick={() => openSpaceCheckWith('Business')}
                    className="btn-outline"
                    id="check-business-btn"
                  >
                    Check My Business Space <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Home */}
            <div className="bordered-col">
              <div className="space-card-content">
                <div>
                  <div className="section-label">HOME</div>
                  <h3 className="card-title-serif">
                    Your home is where daily life happens.
                  </h3>
                  <p className="card-body-text">
                    How it is planned, used and experienced matters. Shrijal studies the full space before suggesting any change.
                  </p>
                </div>

                <div>
                  <div className="tags-line">
                    Existing Home &middot; New Home &middot; Renovation
                  </div>
                  <button
                    onClick={() => openSpaceCheckWith('Home')}
                    className="btn-outline"
                    id="check-home-btn"
                  >
                    Check My Home <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 4: Old wisdom. Today's spaces. */}
      <section className="section" id="methodology" style={{ position: 'relative', overflow: 'hidden' }}>
        <OrbitGraphic
          size={780}
          style={{
            top: '-60px',
            right: '-240px',
            pointerEvents: 'none'
          }}
          opacity={0.35}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="large-section-title">
            Old wisdom.<br />
            <em>Today&apos;s spaces.</em>
          </h2>

          <div className="wisdom-split-text">
            <p className="wisdom-big-p">
              Vastu has been studied for centuries. The way we live and work has changed.
            </p>
            <p className="wisdom-aside-p">
              Modern Vastu brings the two together. It keeps the principles of Vastu, while applying them to the way homes and businesses work today.
            </p>
          </div>

          <div className="three-col-bordered">
            <div className="method-col">
              <h3 className="method-step-title">
                First, understand what is happening.
              </h3>
              <p className="method-step-desc">
                Shrijal starts with the reason you came. What are you noticing? What has changed? What keeps coming up?
              </p>
            </div>

            <div className="method-col">
              <h3 className="method-step-title">
                Then, study the whole space.
              </h3>
              <p className="method-step-desc">
                Direction. Layout. Light. Energy. Flow. And the way people actually use the space.
              </p>
            </div>

            <div className="method-col">
              <h3 className="method-step-title">
                Then decide what really needs attention.
              </h3>
              <p className="method-step-desc">
                Some spaces need change. Some need very little. The purpose is not to find more problems. It is to find what matters. Practical corrections come first. Unnecessary demolition does not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 5: Real spaces tell you more than big promises. */}
      <section className="section" id="case-studies" style={{ position: 'relative', overflow: 'hidden' }}>
        <OrbitGraphic
          size={820}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
          opacity={0.3}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="split-headline-header">
            <h2 className="large-section-title">
              Real spaces tell you<br />
              more<br />
              <em>than big promises.</em>
            </h2>
            <p className="header-aside-text">
              Shrijal&apos;s work is best understood through the spaces she has studied. Not just what was suggested. Why it was suggested. And what happened after.
            </p>
          </div>

          <div className="case-studies-grid">
            {/* Business Case */}
            <div className="case-card">
              <div className="section-label">BUSINESS CASE</div>
              <h3 className="case-title">
                A real business concern. Studied through the space.
              </h3>
              <p className="case-intro">
                See what brought the client to Shrijal, what she noticed in the space, what was changed and how the client experienced the change.
              </p>

              <div className="case-table">
                <div className="case-table-row">
                  <div className="case-row-label">The concern</div>
                  <div className="case-row-val">What was happening in the business.</div>
                </div>
                <div className="case-table-row">
                  <div className="case-row-label">The observation</div>
                  <div className="case-row-val">What stood out when Shrijal studied the space.</div>
                </div>
                <div className="case-table-row">
                  <div className="case-row-label">The change</div>
                  <div className="case-row-val">What was practically corrected.</div>
                </div>
                <div className="case-table-row">
                  <div className="case-row-label">The client&apos;s experience</div>
                  <div className="case-row-val">What they noticed after the change.</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCaseModal('business')}
                className="btn-outline"
                id="see-business-case-btn"
              >
                See Business Case <span>&rarr;</span>
              </button>
            </div>

            {/* Home Case */}
            <div className="case-card">
              <div className="section-label">HOME CASE</div>
              <h3 className="case-title">
                A real home. A real reason to look closer.
              </h3>
              <p className="case-intro">
                See what the family was experiencing, what Shrijal found and which changes were actually worth making.
              </p>

              <div className="case-table">
                <div className="case-table-row">
                  <div className="case-row-label">The concern</div>
                  <div className="case-row-val">What did not feel right.</div>
                </div>
                <div className="case-table-row">
                  <div className="case-row-label">The observation</div>
                  <div className="case-row-val">What deserved attention in the space.</div>
                </div>
                <div className="case-table-row">
                  <div className="case-row-label">The change</div>
                  <div className="case-row-val">What was changed and what was left alone.</div>
                </div>
                <div className="case-table-row">
                  <div className="case-row-label">The family&apos;s experience</div>
                  <div className="case-row-val">What they noticed afterwards.</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCaseModal('home')}
                className="btn-outline"
                id="see-home-case-btn"
              >
                See Home Case <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section 6: Some real stories. */}
      <section className="section" id="stories">
        <div className="container">
          <div className="split-headline-header" style={{ marginBottom: '40px' }}>
            <h2 className="large-section-title">Some real stories.</h2>
            <p className="header-aside-text">
              Shared in the words of the people who live and work in them.
            </p>
          </div>

          <div className="testimonial-grid">
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

      {/* 8. Section 7: About Shrijal Talkar */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-photo-wrap">
              <OrbitGraphic
                size={680}
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                opacity={0.55}
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
              <h2 className="about-name">Shrijal Talkar</h2>
              <div className="about-role">Modern Vastu Expert &amp; Author</div>
              <div className="about-divider"></div>

              <div className="about-belief-intro">Shrijal&apos;s approach comes from one belief:</div>
              <h3 className="about-quote-big">
                Understand the space before you try to change it.
              </h3>

              <div className="about-paragraphs">
                <p>
                  She studied Vastu under leading Vastu&ndash;Astro expert Aashish Patidar and went on to become a Gold Medalist in Vastu.
                </p>
                <p>
                  Today, she works with business and home spaces through a modern, practical approach to Vastu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section 8: The Space on Your Side (Book) */}
      <section className="section" id="book" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="book-grid">
            <div className="book-content">
              <h2 className="large-section-title">
                Her thinking<br />
                also<br />
                <em>became a book.</em>
              </h2>

              <h3 className="book-title-tag">The Space on Your Side</h3>
              <div className="book-subtitle-tag">The Modern Vastu of Energy, Light and Flow</div>

              <div className="book-desc-content">
                <p>
                  The book looks at the parts of a space we often live with every day, but rarely stop to notice.
                </p>
                <div className="book-keywords-serif">
                  Light. Energy. Movement. Flow.
                </div>
                <p>
                  And how all of them come together in the way a space is used.
                </p>
                <p style={{ marginTop: '16px' }}>
                  Her approach to Modern Vastu, now in a book.
                </p>
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
                size={1050}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  maxWidth: 'none',
                  maxHeight: 'none'
                }}
                opacity={0.85}
              />
              <Image
                src="/images/book-mockup.png"
                alt="The Space on Your Side by Shrijal Talkar"
                width={558}
                height={666}
                style={{ display: 'block', width: '100%', maxWidth: '440px', height: 'auto', position: 'relative', zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Section 9: 2-Minute Space Check */}
      <section className="section" id="space-check" style={{ position: 'relative', overflow: 'hidden' }}>
        <OrbitGraphic
          size={780}
          style={{
            bottom: '-100px',
            left: '-240px',
            pointerEvents: 'none'
          }}
          opacity={0.35}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="spacecheck-grid">
            <div className="spacecheck-left">
              <h2 className="large-section-title">
                Is Your Space<br />
                <em>On Your Side?</em>
              </h2>

              <p className="spacecheck-p">
                You do not need to understand Vastu to begin.<br />
                Start with your space.
              </p>

              <h3 className="spacecheck-callout">
                Take the 2-Minute Space Check.
              </h3>

              <button
                onClick={() => openSpaceCheckWith(spaceCheckType)}
                className="btn-primary"
                id="start-space-check-btn"
              >
                Start My Space Check <span>&rarr;</span>
              </button>
            </div>

            <div className="spacecheck-right">
              <div className="spacecheck-selector-title">
                Choose what you want to look at.
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
                <p>Answer a few simple questions about the space and what you are noticing.</p>
                <p>You will first see the areas that may deserve a closer look.</p>
                <p>Then you can decide whether you want Shrijal to study them further.</p>
                <p>No technical Vastu knowledge needed. No long form to fill. Just a useful first look at your space.</p>
                <p className="conclusion">Two minutes. A clearer place to start.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Section 10: Prefer to speak directly with Shrijal? */}
      <section className="direct-speak-banner" id="consultation" style={{ position: 'relative', overflow: 'hidden' }}>
        <OrbitGraphic
          size={680}
          style={{
            top: '50%',
            right: '-160px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}
          opacity={0.4}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="banner-flex">
            <h2 className="banner-title">
              Prefer to speak directly<br />
              <em>with Shrijal?</em>
            </h2>

            <button
              onClick={() => setIsConsultOpen(true)}
              className="btn-outline"
              id="banner-consult-btn"
            >
              Book a Consultation <span>&rarr;</span>
            </button>
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
                style={{ height: '50px', width: 'auto', objectFit: 'contain', display: 'block', marginBottom: '18px' }}
              />
              <div className="footer-brand-meta">
                Modern Vastu Expert | Author<br />
                Gold Medalist in Vastu
              </div>
            </div>

            <div className="footer-right-content">
              <h3 className="footer-slogan">Your Space. On Your Side.</h3>
              <p className="footer-sub">Modern Vastu for business and home.</p>
              <button
                onClick={() => openSpaceCheckWith('Business')}
                className="btn-outline"
                id="footer-check-space-btn"
              >
                Check My Space <span>&rarr;</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>&copy; {new Date().getFullYear()} Shrijal Talkar. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#approach" className="nav-link">Approach</a>
              <a href="#spaces" className="nav-link">Spaces</a>
              <a href="#book" className="nav-link">Book</a>
              <a href="#space-check" className="nav-link">Space Check</a>
            </div>
          </div>
        </div>
      </footer>

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
            ) : (
              <div>
                <div className="section-label">HOME CASE STUDY</div>
                <h3 className="modal-headline">A Real Home. A Real Reason to Look Closer.</h3>
                <p className="modal-subtext">Private Family Residence Renovation Case</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>The Concern</h4>
                    <p>A family reported persistent sleep disturbance and unexplainable irritability after moving into their renovated duplex apartment.</p>
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
