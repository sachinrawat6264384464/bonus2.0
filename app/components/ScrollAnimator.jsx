'use client';

import { useEffect, useRef } from 'react';

/**
 * Premium Scroll Animation & Parallax Engine
 * - 7 Core Reveal Types: fade-in, slide-up, slide-left, slide-right, zoom-in, blur-to-clear, scale-up
 * - Intentional varied distribution for cards, sections, headers, and images
 * - Staggered delays for multi-item grids and cards
 * - Passive rAF-throttled parallax motion
 * - One-time reveal by default, with opt-in data-repeat="true"
 * - Full prefers-reduced-motion accessibility support
 */
export default function ScrollAnimator() {
  const observerRef = useRef(null);
  const parallaxElementsRef = useRef([]);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility Check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('animations-ready', 'reduced-motion');
      return;
    }

    document.documentElement.classList.add('animations-ready');

    // 2. Intelligent Auto-Assignment Recipes
    const assignAnimations = () => {
      // Helper to apply animation to an element if not already configured
      const applyAnim = (el, animType, delayMs = 0, durationMs = null, options = {}) => {
        if (!el || el.dataset.animInitialized) return;
        el.dataset.animInitialized = 'true';
        el.classList.add('scroll-reveal');

        if (!el.getAttribute('data-anim')) {
          el.setAttribute('data-anim', animType);
        }
        if (delayMs > 0 && !el.style.getPropertyValue('--anim-delay')) {
          el.style.setProperty('--anim-delay', `${delayMs}ms`);
        }
        if (durationMs && !el.style.getPropertyValue('--anim-duration')) {
          el.style.setProperty('--anim-duration', `${durationMs}ms`);
        }
        if (options.repeat) {
          el.setAttribute('data-repeat', 'true');
        }
        if (options.parallax && !el.getAttribute('data-parallax')) {
          el.setAttribute('data-parallax', options.parallax);
        }
      };

      // Helper for staggered groups
      const applyStaggered = (elements, animSequence, baseDelay = 0, stepDelay = 170) => {
        elements.forEach((el, index) => {
          const anim = animSequence[index % animSequence.length];
          const delay = baseDelay + index * stepDelay;
          applyAnim(el, anim, delay, 1400);
        });
      };

      // --- SECTION 1: HERO (#hero) ---
      const hero = document.getElementById('hero');
      if (hero) {
        applyAnim(hero.querySelector('.hero-subhead-tag'), 'fade-in', 120, 1300);
        applyAnim(hero.querySelector('.hero-title'), 'blur-to-clear', 240, 1500);
        applyAnim(hero.querySelector('.hero-lead-title'), 'slide-up', 420, 1350);
        applyAnim(hero.querySelector('.hero-description'), 'slide-up', 560, 1350);
        applyAnim(hero.querySelector('.hero-cta-group'), 'zoom-in', 700, 1300);
        applyAnim(hero.querySelector('.hero-image-wrap'), 'scale-up', 350, 1550, { parallax: '0.05' });
      }

      // --- SECTION 2: INSIGHT (#insight) ---
      const insight = document.getElementById('insight');
      if (insight) {
        applyAnim(insight.querySelector('.section-label'), 'slide-right', 50, 1300);
        applyAnim(insight.querySelector('h2'), 'slide-up', 140, 1400);
        applyAnim(insight.querySelector('.header-aside-text'), 'fade-in', 260, 1350);

        // 4 Grid boxes: alternating slide-up & zoom-in for dynamic flow
        const insightBoxes = insight.querySelectorAll('.insight-item-box');
        if (insightBoxes.length > 0) {
          applyStaggered(insightBoxes, ['slide-up', 'zoom-in', 'slide-up', 'scale-up'], 0, 170);
        }

        applyAnim(insight.querySelector('.insight-divider'), 'fade-in', 120, 1300);
        applyAnim(insight.querySelector('h3'), 'slide-up', 220, 1350);
        applyAnim(insight.querySelector('p:last-of-type'), 'fade-in', 320, 1350);
      }

      // --- SECTION 3: SPACES (#spaces) ---
      const spaces = document.getElementById('spaces');
      if (spaces) {
        applyAnim(spaces.querySelector('.split-headline-header h2'), 'slide-up', 0, 1400);
        applyAnim(spaces.querySelector('.split-headline-header p'), 'fade-in', 180, 1350);

        // 3 Cards: Left glides in from left, Center zooms up, Right glides in from right
        const spaceCards = spaces.querySelectorAll('.spaces-card');
        if (spaceCards.length >= 3) {
          applyAnim(spaceCards[0], 'slide-right', 0, 1450); // moves rightward into place
          applyAnim(spaceCards[1], 'zoom-in', 180, 1450);   // center card pops in
          applyAnim(spaceCards[2], 'slide-left', 360, 1450);  // moves leftward into place
        } else if (spaceCards.length > 0) {
          applyStaggered(spaceCards, ['slide-up', 'zoom-in', 'slide-up'], 0, 180);
        }
      }

      // --- SECTION 4: ABOUT (#about) ---
      const about = document.getElementById('about');
      if (about) {
        applyAnim(about.querySelector('.about-photo-wrap'), 'scale-up', 100, 1550, { parallax: '0.07' });
        applyAnim(about.querySelector('.section-label'), 'fade-in', 120, 1300);
        applyAnim(about.querySelector('.large-section-title'), 'blur-to-clear', 220, 1500);
        applyAnim(about.querySelector('.about-role'), 'slide-up', 320, 1350);
        applyAnim(about.querySelector('.about-content > p'), 'slide-up', 400, 1350);
        applyAnim(about.querySelector('.about-belief-intro'), 'slide-up', 460, 1350);
        applyAnim(about.querySelector('.about-content ul'), 'slide-up', 520, 1350);
        applyAnim(about.querySelector('.about-quote-box'), 'slide-left', 600, 1400);
      }

      // --- SECTION 5: SPACE CHECK (#space-check) ---
      const spaceCheck = document.getElementById('space-check');
      if (spaceCheck) {
        applyAnim(spaceCheck.querySelector('.spacecheck-left'), 'slide-right', 0, 1400);
        applyAnim(spaceCheck.querySelector('.spacecheck-right'), 'slide-left', 200, 1400);
      }

      // --- SECTION 6: THE BOOK (#book) ---
      const book = document.getElementById('book');
      if (book) {
        applyAnim(book.querySelector('.section-label'), 'slide-right', 0, 1300);
        applyAnim(book.querySelector('.large-section-title'), 'blur-to-clear', 140, 1500);
        applyAnim(book.querySelector('.book-title-tag'), 'slide-up', 240, 1350);
        applyAnim(book.querySelector('.book-subtitle-tag'), 'fade-in', 320, 1350);
        applyAnim(book.querySelector('.book-desc-content'), 'slide-up', 400, 1350);
        applyAnim(book.querySelector('.book-quote-box'), 'slide-right', 480, 1400);
        applyAnim(book.querySelector('#see-the-book-btn'), 'zoom-in', 560, 1350);
        applyAnim(book.querySelector('.book-mockup-frame'), 'image-reveal', 180, 1650, { parallax: '-0.06' });
      }

      // --- SECTION 7: CASE STUDIES / PROOF (#case-studies) ---
      const caseStudies = document.getElementById('case-studies');
      if (caseStudies) {
        applyAnim(caseStudies.querySelector('.case-studies-header-band h2'), 'blur-to-clear', 0, 1500);
        applyAnim(caseStudies.querySelector('.case-studies-header-band p'), 'fade-in', 180, 1350);

        // 3 Story Cards
        const storyCards = caseStudies.querySelectorAll('.story-card-col');
        if (storyCards.length >= 3) {
          applyAnim(storyCards[0], 'slide-right', 0, 1450);
          applyAnim(storyCards[1], 'zoom-in', 160, 1450);
          applyAnim(storyCards[2], 'slide-left', 320, 1450);
        } else if (storyCards.length > 0) {
          applyStaggered(storyCards, ['slide-up', 'zoom-in', 'slide-up'], 0, 170);
        }

        // Testimonials sub-header & 3 columns
        const storiesSubHeader = caseStudies.querySelector('#stories');
        if (storiesSubHeader) {
          applyAnim(storiesSubHeader.querySelector('h2'), 'slide-up', 0, 1400);
          applyAnim(storiesSubHeader.querySelector('p'), 'fade-in', 180, 1350);
        }
        const testimonials = caseStudies.querySelectorAll('.testimonial-col');
        if (testimonials.length > 0) {
          applyStaggered(testimonials, ['slide-up', 'scale-up', 'slide-up'], 0, 170);
        }
      }

      // --- SECTION 8: CONSULTATION BANNER (#consultation) ---
      const consultation = document.getElementById('consultation');
      if (consultation) {
        applyAnim(consultation.querySelector('.banner-title'), 'blur-to-clear', 0, 1500);
        applyAnim(consultation.querySelector('.banner-flex > div:first-child > div'), 'slide-up', 200, 1350);
        applyAnim(consultation.querySelector('.banner-flex > div:last-child'), 'zoom-in', 340, 1350);
      }

      // --- SECTION 9: FOOTER (.footer-section) ---
      const footer = document.querySelector('.footer-section');
      if (footer) {
        applyAnim(footer.querySelector('.footer-top-grid > div:first-child'), 'slide-right', 0, 1400);
        applyAnim(footer.querySelector('.footer-top-grid > div:last-child'), 'slide-left', 180, 1400);
        applyAnim(footer.querySelector('.footer-bottom-bar'), 'fade-in', 300, 1350);
      }

      // --- GENERIC CATCH-ALL FOR ANY REMAINING UNANIMATED SECTIONS OR CARDS ---
      // Distributes animations harmoniously so nothing feels static
      const animPool = ['slide-up', 'zoom-in', 'slide-left', 'slide-right', 'blur-to-clear'];
      let poolIndex = 0;

      document.querySelectorAll('.section').forEach((sec) => {
        sec.querySelectorAll('h2:not([data-animInitialized]), h3:not([data-animInitialized])').forEach((head) => {
          applyAnim(head, 'slide-up', 0);
        });
      });
    };

    // Run assignment
    assignAnimations();

    // 3. Setup Intersection Observer for Scroll Reveals
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const isRepeat = target.getAttribute('data-repeat') === 'true';

        if (entry.isIntersecting) {
          target.classList.add('is-revealed');
          if (!isRepeat) {
            observer.unobserve(target);
          }
        } else if (isRepeat) {
          target.classList.remove('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12,
    });
    observerRef.current = observer;

    // Observe all eligible .scroll-reveal elements
    const elementsToObserve = document.querySelectorAll('.scroll-reveal');
    elementsToObserve.forEach((el) => observer.observe(el));

    // 4. Hero Section Special Sync with IntroSplash
    // If IntroSplash is present, wait for its completion to reveal Hero gracefully
    const triggerHeroEntrance = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.querySelectorAll('.scroll-reveal').forEach((el) => {
          el.classList.add('is-revealed');
        });
      }
    };

    const isSplashActive = !!document.querySelector('[aria-label="Loading Shrijal Modern Vastu"]');
    if (isSplashActive) {
      window.addEventListener('intro-splash-complete', triggerHeroEntrance, { once: true });
      // Fallback timer in case video ends or user scrolls
      setTimeout(triggerHeroEntrance, 3800);
    } else {
      triggerHeroEntrance();
    }

    // 5. Parallax Scroll Handler (Passive + rAF)
    const parallaxElements = Array.from(document.querySelectorAll('[data-parallax]'));
    parallaxElementsRef.current = parallaxElements;

    const handleScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        parallaxElementsRef.current.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Only calculate when element is near or inside viewport
          if (rect.bottom >= -100 && rect.top <= viewportHeight + 100) {
            const elCenter = rect.top + rect.height / 2;
            const factor = parseFloat(el.getAttribute('data-parallax')) || 0.05;
            const offset = (elCenter - viewportCenter) * factor;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          }
        });
      });
    };

    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initial calculation
      handleScroll();
    }

    // 6. Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}

/**
 * Reusable utility hook for manual scroll animations in custom components
 */
export function useScrollAnimation(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const { anim = 'slide-up', delay = 0, repeat = false } = options;

    el.classList.add('scroll-reveal');
    el.setAttribute('data-anim', anim);
    if (delay > 0) el.style.setProperty('--anim-delay', `${delay}ms`);
    if (repeat) el.setAttribute('data-repeat', 'true');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          el.classList.remove('is-revealed');
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options]);
}

