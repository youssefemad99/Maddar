/**
 * MADAR (مدار) - Official Website JavaScript (v2.0)
 * Features:
 * - GSAP & ScrollTrigger with Lenis smooth scroll
 * - Preloader with exact Orbit Math & Najdi Door parting reveal
 * - Hero Orbit backdrop with continuous rotation & scroll scrub
 * - 6 Coded Interactive Demo Models with micro-interactions
 * - Clean commitments strip (zero fake reviews / ratings / brackets)
 * - Sample testimonials preview support (?preview=sample)
 * - Direct contact card with one-click phone copy (+20 121 252 9087)
 * - Unified Gulf & Egypt phone auto-formatting & validation
 * - WhatsApp booking sync with prefilled messages
 * - Saudi PDPL Cookie banner & bilingual toggle
 */

(function () {
  'use strict';

  // --- Unified Production Defaults (Strictly per Brief v2) ---
  const DEFAULT_CONTENT = {
    brand: {
      nameAr: "مدار",
      nameEn: "MADAR",
      taglineAr: "حيث تدور الفكرة حول عميلها",
      taglineEn: "Where Ideas Orbit Your Vision"
    },
    contact: {
      phone: "+20 121 252 9087",
      whatsapp: "+20 121 252 9087",
      whatsappRaw: "201212529087",
      telUrl: "tel:+201212529087",
      email: "contact@madar.sa",
      domain: "madar.sa",
      commercialRegistry: "معروف / وثيقة عمل حر معتمدة",
      responsePromise: "نرد خلال 24 ساعة",
      whatsappPrefill: "السلام عليكم، أبغى أحجز استشارة مع مدار"
    },
    features: [
      { title: "3 تخصصات في مكان واحد", desc: "مونتاج، مواقع، وجرافيك متكامل" },
      { title: "تواصل مباشر مع الفريق", desc: "استجابة وتنسيق سريع عبر واتساب" },
      { title: "هوية سعودية في كل تفصيلة", desc: "فهم عميق لذائقة السوق والمستهلك" },
      { title: "استشارة أولى استكشافية", desc: "جلسة ضيافة ونقاش مجاني للمشروع" }
    ]
  };

  const DEFAULT_TESTIMONIALS = []; // Clean state: no fake reviews

  let appContent = DEFAULT_CONTENT;
  let appTestimonials = DEFAULT_TESTIMONIALS;
  let currentLang = 'ar';
  let lenisInstance = null;

  // --- Initialize Application ---
  document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch dynamic content if available over HTTP
    try {
      const [resContent, resTestimonials] = await Promise.all([
        fetch('content.json').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('testimonials.json').then(r => r.ok ? r.json() : null).catch(() => null)
      ]);
      if (resContent) appContent = Object.assign({}, DEFAULT_CONTENT, resContent);
      if (resTestimonials && Array.isArray(resTestimonials) && resTestimonials.length > 0) {
        appTestimonials = resTestimonials;
      }
    } catch (e) {
      console.log('Serving from embedded production configuration.');
    }

    // 2. Initialize modules
    initSmoothScroll();
    initLivingBackground();
    initThemeToggle();
    initMadarScrollReveal();
    initPreloader();
    initNavbar();
    initScrollProgress();
    initHeroOrbit();
    initInteractiveDemos();
    initPortfolioFilters();
    initOrbitTimeline();
    initProcessLine();
    initTestimonialsAndCommitments();
    initDirectContactCard();
    initBookingForm();
    initFaqAccordion();
    initCookiePDPL();
    initLanguageSwitcher();
    initModalHandlers();
    injectStructuredData();
  });

  // ==========================================================================
  // 1. Smooth Scrolling (Lenis + GSAP Integration - Jitter-Free)
  // ==========================================================================
  function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (typeof Lenis !== 'undefined') {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95
      });
      window.__lenis = lenisInstance;

      if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        lenisInstance.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    }
  }

  // ==========================================================================
  // Living Saudi & Islamic Geometric Canvas Engine (Interactive, Dynamic, Continuous)
  // ==========================================================================
  function initLivingBackground() {
    const canvas = document.getElementById('madar-orbit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Interactive mouse tracking with smooth lerp
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    }, { passive: true });

    // Scroll parallax tracking
    let scrollY = window.scrollY || 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY || 0;
    }, { passive: true });

    // Helper: Draw authentic Saudi Sadu Diamond & Najdi Shurafat Hub (المذخر وشرفات الدرعية)
    function drawSaudiPatternHub(ctx, cx, cy, outerR, rotation, points, isLight, glowAlpha = 0) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      // 1. Subtle Radial Glow if illuminated or hovered
      if (glowAlpha > 0.05) {
        const glowGrad = ctx.createRadialGradient(0, 0, outerR * 0.2, 0, 0, outerR * 1.8);
        if (isLight) {
          glowGrad.addColorStop(0, `rgba(150, 95, 49, ${glowAlpha * 0.22})`);
          glowGrad.addColorStop(1, 'rgba(150, 95, 49, 0)');
        } else {
          glowGrad.addColorStop(0, `rgba(212, 154, 98, ${glowAlpha * 0.32})`);
          glowGrad.addColorStop(1, 'rgba(212, 154, 98, 0)');
        }
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(0, 0, outerR * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      const strokeCol = isLight ? `rgba(150, 95, 49, ${0.28 + glowAlpha * 0.40})` : `rgba(212, 154, 98, ${0.35 + glowAlpha * 0.45})`;
      const fillCol = isLight ? `rgba(150, 95, 49, ${0.03 + glowAlpha * 0.06})` : `rgba(212, 154, 98, ${0.05 + glowAlpha * 0.10})`;
      ctx.strokeStyle = strokeCol;
      ctx.fillStyle = fillCol;
      ctx.lineWidth = 1.1;

      // 2. Outer Sadu Stepped Diamond (المذخر - معين السدو الخارجي)
      ctx.beginPath();
      ctx.moveTo(0, -outerR);
      ctx.lineTo(outerR, 0);
      ctx.lineTo(0, outerR);
      ctx.lineTo(-outerR, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 3. Middle Stepped Sadu Diamond
      const midR = outerR * 0.68;
      ctx.beginPath();
      ctx.moveTo(0, -midR);
      ctx.lineTo(midR, 0);
      ctx.lineTo(0, midR);
      ctx.lineTo(-midR, 0);
      ctx.closePath();
      ctx.stroke();

      // 4. Najdi Triangular Shurafat on the 4 Diamond Apexes (شرفات العمارة النجدية)
      const shurafatSize = outerR * 0.16;
      ctx.fillStyle = isLight ? `rgba(150, 95, 49, ${0.35 + glowAlpha * 0.3})` : `rgba(212, 154, 98, ${0.45 + glowAlpha * 0.35})`;
      
      // Top Shurafa
      ctx.beginPath();
      ctx.moveTo(0, -outerR);
      ctx.lineTo(-shurafatSize * 0.6, -outerR - shurafatSize);
      ctx.lineTo(shurafatSize * 0.6, -outerR - shurafatSize);
      ctx.closePath();
      ctx.fill();

      // Bottom Shurafa
      ctx.beginPath();
      ctx.moveTo(0, outerR);
      ctx.lineTo(-shurafatSize * 0.6, outerR + shurafatSize);
      ctx.lineTo(shurafatSize * 0.6, outerR + shurafatSize);
      ctx.closePath();
      ctx.fill();

      // Right Shurafa
      ctx.beginPath();
      ctx.moveTo(outerR, 0);
      ctx.lineTo(outerR + shurafatSize, -shurafatSize * 0.6);
      ctx.lineTo(outerR + shurafatSize, shurafatSize * 0.6);
      ctx.closePath();
      ctx.fill();

      // Left Shurafa
      ctx.beginPath();
      ctx.moveTo(-outerR, 0);
      ctx.lineTo(-outerR - shurafatSize, -shurafatSize * 0.6);
      ctx.lineTo(-outerR - shurafatSize, shurafatSize * 0.6);
      ctx.closePath();
      ctx.fill();

      // 5. Orbital Dashed Ring (حلقة المدار الهندسية)
      ctx.beginPath();
      ctx.arc(0, 0, outerR * 0.88, 0, Math.PI * 2);
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 6. Center Najdi 8-point Star Rosette
      const starR = outerR * 0.34;
      const innerStarR = starR * 0.54;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const r = i % 2 === 0 ? starR : innerStarR;
        const a = (i * Math.PI) / 8;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // 7. Center Luminous Amber/Gold Core
      const coreR = Math.max(outerR * 0.12, 2.8);
      const coreGrad = ctx.createRadialGradient(-coreR * 0.3, -coreR * 0.3, 0, 0, 0, coreR);
      if (isLight) {
        coreGrad.addColorStop(0, '#FCFAF6');
        coreGrad.addColorStop(0.5, '#965F31');
        coreGrad.addColorStop(1, '#72451E');
      } else {
        coreGrad.addColorStop(0, '#F6DDB8');
        coreGrad.addColorStop(0.45, '#D49A62');
        coreGrad.addColorStop(1, '#8E5A31');
      }
      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      ctx.restore();
    }

    // Grid of Islamic Celestial Star Hubs
    const starHubs = [
      // Central celestial rosette
      { nx: 0.50, ny: 0.42, r: 76, speed: 0.00020, points: 16, rot: 0, phase: 0 },
      // Satellite 8-point stars
      { nx: 0.15, ny: 0.20, r: 42, speed: -0.00028, points: 8, rot: 0.4, phase: 1.1 },
      { nx: 0.85, ny: 0.22, r: 44, speed: 0.00025, points: 8, rot: 0.8, phase: 2.3 },
      { nx: 0.22, ny: 0.65, r: 46, speed: 0.00022, points: 8, rot: 1.2, phase: 3.5 },
      { nx: 0.78, ny: 0.68, r: 45, speed: -0.00024, points: 8, rot: 1.7, phase: 4.2 },
      { nx: 0.48, ny: 0.85, r: 52, speed: 0.00018, points: 8, rot: 2.1, phase: 5.1 },
      { nx: 0.08, ny: 0.88, r: 38, speed: -0.00030, points: 8, rot: 0.2, phase: 0.8 },
      { nx: 0.92, ny: 0.86, r: 40, speed: 0.00026, points: 8, rot: 1.5, phase: 2.9 }
    ];

    // Floating micro-embers (ذرات مدار الحية)
    const embers = [];
    const emberCount = 36;
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35 - 0.12,
        radius: 1.5 + Math.random() * 2.4,
        pulseOffset: Math.random() * Math.PI * 2,
        opacity: 0.35 + Math.random() * 0.55
      });
    }

    let lastTime = performance.now();
    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    function render(now) {
      if (!isVisible) {
        requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      ctx.clearRect(0, 0, width, height);

      // Subtle scroll parallax
      const scrollOffset = (scrollY * 0.14) % height;

      // Compute actual star positions for this frame
      const currentStarPositions = starHubs.map(hub => {
        let y = hub.ny * height - scrollOffset;
        if (y < -hub.r * 2) y += height + hub.r * 4;
        if (y > height + hub.r * 2) y -= height + hub.r * 4;
        const x = hub.nx * width;
        return { ...hub, x, y };
      });

      // 1. Draw Geometric Lattice Strapwork Lines between neighboring stars
      ctx.save();
      for (let i = 0; i < currentStarPositions.length; i++) {
        for (let j = i + 1; j < currentStarPositions.length; j++) {
          const s1 = currentStarPositions[i];
          const s2 = currentStarPositions[j];
          const dx = s2.x - s1.x;
          const dy = s2.y - s1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < width * 0.58) {
            const alpha = Math.max(0, (1 - dist / (width * 0.58)) * (isLight ? 0.18 : 0.22));
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = isLight ? `rgba(150, 95, 49, ${alpha})` : `rgba(212, 154, 98, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.setLineDash([6, 8]);
            ctx.stroke();

            // Diamond midpoint accent (Najdi Shurafat / Sadu)
            const mx = (s1.x + s2.x) * 0.5;
            const my = (s1.y + s2.y) * 0.5;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.arc(mx, my, 2, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? `rgba(150, 95, 49, ${alpha * 1.5})` : `rgba(212, 154, 98, ${alpha * 1.5})`;
            ctx.fill();
          }
        }
      }
      ctx.restore();

      // 2. Interactive Filaments toward Mouse
      ctx.save();
      currentStarPositions.forEach(s => {
        const distToMouse = Math.hypot(mouse.x - s.x, mouse.y - s.y);
        if (distToMouse < 240) {
          const mouseAlpha = (1 - distToMouse / 240) * (isLight ? 0.35 : 0.45);
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight ? `rgba(150, 95, 49, ${mouseAlpha})` : `rgba(212, 154, 98, ${mouseAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      });
      ctx.restore();

      // 3. Draw Islamic Star Hubs (with live rotation & breathing pulse)
      currentStarPositions.forEach(s => {
        if (!prefersReducedMotion) {
          s.rot += s.speed * 60 * dt;
        }
        const distToMouse = Math.hypot(mouse.x - s.x, mouse.y - s.y);
        const mouseProximity = Math.max(0, 1 - distToMouse / 260);

        const breathing = 1 + 0.05 * Math.sin(now * 0.0018 + s.phase);
        const currentR = s.r * breathing * (1 + mouseProximity * 0.12);

        drawSaudiPatternHub(ctx, s.x, s.y, currentR, s.rot, s.points, isLight, mouseProximity);
      });

      // 4. Draw Floating Luminous Embers along Geometric Diagonals
      embers.forEach(p => {
        if (!prefersReducedMotion) {
          p.x += p.vx * 60 * dt;
          p.y += p.vy * 60 * dt;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const pulse = 0.85 + 0.3 * Math.sin(now * 0.0025 + p.pulseOffset);
        const r = p.radius * pulse;

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(150, 95, 49, ${p.opacity * 0.15})` : `rgba(212, 154, 98, ${p.opacity * 0.25})`;
        ctx.fill();

        // Radiant core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(150, 95, 49, ${p.opacity * 0.85})` : `rgba(246, 221, 184, ${p.opacity * 0.9})`;
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  // ==========================================================================
  // Theme Toggle (Dark / Light Mode per Brief v3 Section 1)
  // ==========================================================================
  function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    function applyTheme(newTheme, persist = true) {
      document.documentElement.classList.add('theme-transitioning');
      document.documentElement.setAttribute('data-theme', newTheme);
      toggleBtn.setAttribute('aria-pressed', newTheme === 'light' ? 'true' : 'false');
      if (persist) {
        try {
          localStorage.setItem('madar-theme', newTheme);
        } catch (e) {}
      }
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 420);
    }

    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme, true);
    });
  }

  // ==========================================================================
  // 2. شاشة الدخول (Preloader with Exact Orbit Math & Majestic Najdi Door Reveal)
  // ==========================================================================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const ring = document.getElementById('preloader-ring');
    const ringOuter = document.getElementById('preloader-ring-outer');
    const ball = document.getElementById('preloader-ball');
    const wordmark = document.getElementById('preloader-wordmark');
    const captionWrap = document.getElementById('preloader-caption-wrap');
    const seamLight = document.getElementById('door-seam-light');
    const doorRight = preloader?.querySelector('.door-right');
    const doorLeft = preloader?.querySelector('.door-left');
    const centerContent = preloader?.querySelector('.preloader-center-content');
    const skipBtn = document.getElementById('skip-preloader-btn');

    if (!preloader) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      preloader.style.display = 'none';
      preloader.classList.add('loaded');
      triggerHeroAnimations();
      return;
    }

    let isDismissed = false;

    function dismissPreloader() {
      if (isDismissed) return;
      isDismissed = true;
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf([ring, ringOuter, ball, wordmark, captionWrap, seamLight, doorRight, doorLeft, centerContent, preloader]);
      }
      
      if (typeof gsap !== 'undefined') {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            preloader.style.display = 'none';
            preloader.classList.add('loaded');
          }
        });
      } else {
        preloader.classList.add('loaded');
        preloader.style.display = 'none';
      }
      setTimeout(triggerHeroAnimations, 150);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', dismissPreloader);
    }

    // GSAP Exact Orbit Math from Brief v2 Page 2:
    // Center: cx = 483.6, cy = 401.0, radius r = 206.5
    // Ring circumference: 2 * Math.PI * 206.5 ≈ 1297.5
    // Ball initial pos: (626.6, 254.6)
    // Angle a0 = Math.atan2(254.6 - 401.0, 626.6 - 483.6)
    if (typeof gsap !== 'undefined' && ring && ball) {
      const cx = 483.6;
      const cy = 401.0;
      const r = 206.5;
      const initX = 626.6;
      const initY = 254.6;
      const a0 = Math.atan2(initY - cy, initX - cx);

      const ballState = { angle: a0 };

      // Set clean initial states
      gsap.set(ring, { strokeDasharray: 1297.5, strokeDashoffset: 1297.5 });
      if (ringOuter) gsap.set(ringOuter, { opacity: 0, rotation: 0, transformOrigin: `${cx}px ${cy}px` });
      gsap.set(wordmark, { opacity: 0, y: 22, scale: 0.92 });
      if (captionWrap) gsap.set(captionWrap, { opacity: 0, y: 14 });
      if (seamLight) gsap.set(seamLight, { opacity: 0, scaleY: 0.6 });

      const tl = gsap.timeline({
        onComplete: dismissPreloader
      });

      // 1. Ring draws itself with silky ease
      tl.to(ring, {
        strokeDashoffset: 0,
        duration: 1.15,
        ease: 'power2.inOut'
      })
      // 1b. Outer dashed halo fades in & rotates
      if (ringOuter) {
        tl.to(ringOuter, {
          opacity: 0.45,
          rotation: 90,
          duration: 1.4,
          ease: 'power2.out'
        }, '<0.1');
      }

      // 2. Wordmark fades in with subtle rise & settling scale
      tl.to(wordmark, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.6')

      // 3. Bronze ball executes full 360-degree orbit with silky acceleration & deceleration
      .to(ballState, {
        angle: a0 + 2 * Math.PI,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentX = cx + r * Math.cos(ballState.angle);
          const currentY = cy + r * Math.sin(ballState.angle);
          const dx = currentX - initX;
          const dy = currentY - initY;
          ball.setAttribute('transform', `translate(${dx}, ${dy})`);
        }
      }, '-=0.5')

      // 4. Welcome caption & Sadu ribbon glide in gracefully
      if (captionWrap) {
        tl.to(captionWrap, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out'
        }, '-=0.7');
      }

      // 5. Brief poetic pause to appreciate the completed mark
      tl.to({}, { duration: 0.25 });

      // 6. Central seam lights up right before doors part
      if (seamLight) {
        tl.to(seamLight, {
          opacity: 1,
          scaleY: 1,
          duration: 0.35,
          ease: 'power2.in'
        });
      }

      // 7. Center content smoothly scales slightly and dissolves
      tl.to(centerContent, {
        opacity: 0,
        scale: 1.04,
        duration: 0.45,
        ease: 'power2.in'
      }, seamLight ? '<0.1' : '-=0.1')

      // 8. Heavy Najdi Palace doors part smoothly with majestic ease
      .to(doorRight, {
        x: '100%',
        duration: 0.95,
        ease: 'power3.inOut'
      }, '-=0.15')
      .to(doorLeft, {
        x: '-100%',
        duration: 0.95,
        ease: 'power3.inOut'
      }, '<');

      if (seamLight) {
        tl.to(seamLight, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out'
        }, '<0.1');
      }

      // 9. Fade out preloader wrapper
      tl.to(preloader, {
        opacity: 0,
        duration: 0.35,
        ease: 'power1.out',
        onComplete: () => {
          preloader.style.display = 'none';
          preloader.classList.add('loaded');
        }
      }, '-=0.3');

    } else {
      // Fallback timer if GSAP not loaded
      setTimeout(dismissPreloader, 1800);
    }
  }

  // Hero Entrance Animations
  function triggerHeroAnimations() {
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      tl.to('.hero-title-word', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out'
      })
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 18 }, 
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 
        '-=0.4'
      )
      .fromTo('.hero-ctas .btn', 
        { opacity: 0, y: 16 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, 
        '-=0.4'
      )
      .fromTo('.hero-trust-note',
        { opacity: 0, y: 12 },
        { opacity: 0.92, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.celestial-orbit-stage', 
        { opacity: 0, scale: 0.90 }, 
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }, 
        '-=0.8'
      )
      .fromTo('.floating-hero-pill', 
        { opacity: 0, y: 16, scale: 0.92 }, 
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.75, ease: 'back.out(1.5)' }, 
        '-=0.6'
      );
    } else {
      document.querySelectorAll('.hero-title-word').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }

  // ==========================================================================
  // 3. Hero Orbit Backdrop (Scroll Scrub & Rotation)
  // ==========================================================================
  function initHeroOrbit() {
    const heroBall = document.getElementById('hero-orbit-ball');
    if (!heroBall || typeof gsap === 'undefined') return;

    const cx = 483.6;
    const cy = 401.0;
    const r = 206.5;
    const initX = 626.6;
    const initY = 254.6;
    const a0 = Math.atan2(initY - cy, initX - cx);

    const orbitState = { angle: a0 };

    // Continuous smooth ambient rotation
    gsap.to(orbitState, {
      angle: a0 + 2 * Math.PI,
      duration: 24,
      repeat: -1,
      ease: 'none',
      onUpdate: () => {
        const currentX = cx + r * Math.cos(orbitState.angle);
        const currentY = cy + r * Math.sin(orbitState.angle);
        heroBall.setAttribute('transform', `translate(${currentX - initX}, ${currentY - initY})`);
      }
    });

    // Acceleration on scroll
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          orbitState.angle += self.getVelocity() * 0.0001;
        }
      });
    }
  }

  // ==========================================================================
  // 4. Navbar & Sticky States
  // ==========================================================================
  function initNavbar() {
    const header = document.getElementById('site-header');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ==========================================================================
  // 5. Scroll Progress Indicator with Bronze Ball
  // ==========================================================================
  function initScrollProgress() {
    const barFill = document.querySelector('.progress-bar-fill');
    const orbitDot = document.querySelector('.progress-orbit-dot');
    if (!barFill || !orbitDot) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;
      barFill.style.height = `${progress}%`;
      orbitDot.style.top = `${progress}%`;
    }, { passive: true });
  }

  // ==========================================================================
  // 6. Interactive Coded Demos (Micro-animations for 6 Models)
  // ==========================================================================
  function initInteractiveDemos() {
    // 1. E-Commerce Demo Add-to-Cart Button
    const ecomBtn = document.querySelector('.ecom-add-btn');
    const ecomCartIcon = document.querySelector('.ecom-cart-icon');
    let cartCount = 1;

    if (ecomBtn && ecomCartIcon) {
      ecomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartCount++;
        ecomBtn.innerHTML = `<span>✓ تمت الإضافة بنجاح!</span>`;
        ecomBtn.style.background = 'var(--bronze-ball)';
        ecomBtn.style.color = '#0B0F0E';
        ecomCartIcon.textContent = `🛒 السلة (${cartCount})`;

        setTimeout(() => {
          ecomBtn.innerHTML = `<span>+ أضف للسلة</span>`;
          ecomBtn.style.background = '';
          ecomBtn.style.color = '';
        }, 1800);
      });
    }

    // 2. Brand Board Swatches - Click to show hex tooltip
    const swatches = document.querySelectorAll('.brand-swatches .swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        const hex = swatch.getAttribute('title') || '';
        if (navigator.clipboard && hex) {
          navigator.clipboard.writeText(hex).catch(() => {});
        }
        swatch.style.transform = 'scale(1.25)';
        setTimeout(() => {
          swatch.style.transform = '';
        }, 400);
      });
    });

    // 3. Service selection connection from demo cards
    document.querySelectorAll('.btn-demo-order, [data-select-service]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.dataset.selectService;
        const serviceSelect = document.getElementById('booking-service');
        if (serviceSelect && service) {
          serviceSelect.value = service;
        }
        const bookingElem = document.getElementById('booking');
        if (bookingElem) {
          if (lenisInstance) {
            lenisInstance.scrollTo(bookingElem);
          } else {
            bookingElem.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // Portfolio Category Filtering
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 7. مسيرتنا (Orbit Timeline)
  // ==========================================================================
  function initOrbitTimeline() {
    const journeySection = document.getElementById('journey');
    const dot = document.querySelector('.journey-traveling-dot');
    const nodes = document.querySelectorAll('.timeline-node');
    if (!journeySection || !dot || !nodes.length) return;

    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      ScrollTrigger.create({
        trigger: journeySection,
        start: 'top 70%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          const progress = self.progress;
          const containerHeight = journeySection.querySelector('.journey-wrapper').offsetHeight;
          dot.style.top = `${progress * containerHeight}px`;

          nodes.forEach((node, i) => {
            const threshold = (i + 0.3) / nodes.length;
            if (progress >= threshold) {
              node.classList.add('active');
            } else {
              node.classList.remove('active');
            }
          });
        }
      });
    } else {
      nodes.forEach(node => node.classList.add('active'));
    }
  }

  // ==========================================================================
  // 8. طريقة العمل (Process Connecting Line)
  // ==========================================================================
  function initProcessLine() {
    const processSection = document.getElementById('process');
    const lineActive = document.querySelector('.process-line-active');
    const steps = document.querySelectorAll('.process-step-card');
    if (!processSection || !lineActive) return;

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: processSection,
        start: 'top 65%',
        end: 'bottom 60%',
        onUpdate: (self) => {
          lineActive.style.width = `${self.progress * 100}%`;
          steps.forEach((step, i) => {
            if (self.progress >= (i / (steps.length - 1))) {
              step.classList.add('active');
            } else {
              step.classList.remove('active');
            }
          });
        }
      });
    }
  }

  // ==========================================================================
  // 9. التزامات مدار وآراء العملاء (Zero fake reviews + Sample Preview Mode)
  // ==========================================================================
  async function initTestimonialsAndCommitments() {
    const dynamicArea = document.getElementById('testimonials-dynamic-area');
    if (!dynamicArea) return;

    // Check if ?preview=sample is in URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const isSamplePreview = urlParams.get('preview') === 'sample';

    if (isSamplePreview) {
      try {
        const sampleReviews = await fetch('testimonials.sample.json').then(r => r.ok ? r.json() : null);
        if (sampleReviews && Array.isArray(sampleReviews) && sampleReviews.length > 0) {
          renderSampleTestimonials(dynamicArea, sampleReviews);
          return;
        }
      } catch (e) {
        console.log('Sample testimonials preview not available.');
      }
    }

    // Default clean state: Commitments strip is already rendered in index.html
  }

  function renderSampleTestimonials(container, reviews) {
    const html = `
      <div class="sample-preview-banner" style="background: rgba(176, 122, 74, 0.15); border: 1px dashed var(--bronze-ball); border-radius: 8px; padding: 0.75rem 1.25rem; margin-bottom: 2rem; text-align: center; color: var(--bronze-ball); font-size: 0.9rem;">
        ⚠️ <strong>وضع المعاينة الفنية (?preview=sample):</strong> يتم عرض نماذج توضيحية لآراء العملاء (demo: true) لاختبار التخطيط والتصميم.
      </div>
      <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        ${reviews.map(r => `
          <div class="testimonial-card" style="background: var(--surface-dark); border: 1px solid var(--border-dark); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="portfolio-demo-badge"><span class="demo-badge-dot"></span><span>نموذج توضيحي</span></span>
                <span style="color: var(--bronze-ball); font-size: 0.85rem;">${r.service}</span>
              </div>
              <p style="color: var(--text-light); font-size: 0.98rem; line-height: 1.7; margin-bottom: 1rem;">"${r.quote}"</p>
            </div>
            <div style="border-top: 1px solid var(--border-dark); padding-top: 0.75rem;">
              <strong style="display: block; color: var(--logo-cream); font-size: 0.95rem;">${r.name}</strong>
              <span style="font-size: 0.82rem; color: var(--text-muted);">${r.role} — ${r.company}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    container.innerHTML = html;
  }

  // ==========================================================================
  // 10. بطاقة التواصل المباشر (Direct Contact Card with Copy Phone)
  // ==========================================================================
  function initDirectContactCard() {
    const copyBtn = document.getElementById('btn-copy-phone');
    const copyText = document.getElementById('copy-text');
    const targetPhone = appContent.contact.phone || "+20 121 252 9087";

    if (copyBtn && copyText) {
      copyBtn.addEventListener('click', async () => {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(targetPhone);
          } else {
            const tempInput = document.createElement('input');
            tempInput.value = targetPhone;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
          }

          const originalText = copyText.textContent;
          copyText.textContent = "تم النسخ! ✓";
          copyBtn.style.borderColor = "var(--bronze-ball)";
          copyBtn.style.color = "var(--bronze-ball)";

          setTimeout(() => {
            copyText.textContent = originalText;
            copyBtn.style.borderColor = "";
            copyBtn.style.color = "";
          }, 2500);
        } catch (err) {
          alert(`رقم الهاتف: ${targetPhone}`);
        }
      });
    }
  }

  // ==========================================================================
  // 11. نموذج الحجز (Validation for Gulf & Egypt + WhatsApp Sync)
  // ==========================================================================
  function initBookingForm() {
    const form = document.getElementById('madar-booking-form');
    const successMsg = document.getElementById('booking-success-msg');
    const countrySelect = document.getElementById('booking-country-code');
    const phoneInput = document.getElementById('booking-phone');
    const serviceSelect = document.getElementById('booking-service');
    const whatsappSecondaryBtn = document.getElementById('btn-success-whatsapp');

    // Phone Country Mask & Placeholder Updates
    const countryRules = {
      '+966': { mask: '5X XXX XXXX', len: 9, regex: /^5\d{8}$/, name: 'السعودية' },
      '+971': { mask: '5X XXX XXXX', len: 9, regex: /^5\d{8}$/, name: 'الإمارات' },
      '+965': { mask: 'X XXX XXXX', len: 8, regex: /^\d{8}$/, name: 'الكويت' },
      '+974': { mask: 'X XXX XXXX', len: 8, regex: /^\d{8}$/, name: 'قطر' },
      '+973': { mask: 'X XXX XXXX', len: 8, regex: /^\d{8}$/, name: 'البحرين' },
      '+968': { mask: 'X XXX XXXX', len: 8, regex: /^\d{8}$/, name: 'عُمان' },
      '+20':  { mask: '1X XXXX XXXX', len: 10, regex: /^1\d{9}$/, name: 'مصر' }
    };

    if (countrySelect && phoneInput) {
      countrySelect.addEventListener('change', () => {
        const code = countrySelect.value;
        const rule = countryRules[code] || countryRules['+966'];
        phoneInput.placeholder = rule.mask;
      });

      // Auto format input with spaces
      phoneInput.addEventListener('input', () => {
        let clean = phoneInput.value.replace(/\D/g, '');
        // Remove leading 0 if entered with country code
        if (clean.startsWith('0')) clean = clean.substring(1);

        const code = countrySelect.value;
        const rule = countryRules[code] || countryRules['+966'];
        if (clean.length > rule.len) {
          clean = clean.substring(0, rule.len);
        }

        // Simple formatting
        if (code === '+966' || code === '+971') {
          if (clean.length > 5) {
            phoneInput.value = `${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5)}`;
          } else if (clean.length > 2) {
            phoneInput.value = `${clean.slice(0, 2)} ${clean.slice(2)}`;
          } else {
            phoneInput.value = clean;
          }
        } else if (code === '+20') {
          if (clean.length > 6) {
            phoneInput.value = `${clean.slice(0, 2)} ${clean.slice(2, 6)} ${clean.slice(6)}`;
          } else if (clean.length > 2) {
            phoneInput.value = `${clean.slice(0, 2)} ${clean.slice(2)}`;
          } else {
            phoneInput.value = clean;
          }
        } else {
          if (clean.length > 4) {
            phoneInput.value = `${clean.slice(0, 4)} ${clean.slice(4)}`;
          } else {
            phoneInput.value = clean;
          }
        }
      });
    }

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('booking-name');
      const name = nameInput.value.trim();
      const rawDigits = phoneInput.value.replace(/\D/g, '');
      const code = countrySelect.value;
      const rule = countryRules[code] || countryRules['+966'];

      if (!name) {
        showFieldToast('فضلاً أدخل اسمك الكريم', nameInput);
        return;
      }

      if (!rule.regex.test(rawDigits)) {
        showFieldToast(`فضلاً أدخل رقم هاتف صحيح لـ (${rule.name}) بمثال: ${rule.mask}`, phoneInput);
        return;
      }

      const service = serviceSelect.value;
      const serviceText = serviceSelect.options[serviceSelect.selectedIndex]?.text || service;
      const budgetSelect = document.getElementById('booking-budget');
      const budgetText = budgetSelect?.options[budgetSelect.selectedIndex]?.text || '';

      // Submit loading state
      const submitBtn = form.querySelector('.btn-booking-submit');
      submitBtn.innerHTML = `
        <svg viewBox="0 0 50 50" width="22" height="22" style="animation: spin 1s linear infinite;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="80" stroke-dashoffset="60"/>
        </svg>
        <span>جاري المعالجة...</span>
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.classList.add('active');
        }

        // WhatsApp continuation link
        if (whatsappSecondaryBtn) {
          const rawPhone = appContent.contact.whatsappRaw || '201212529087';
          let msg = `السلام عليكم، أبغى أحجز استشارة مع مدار - الاسم: ${name} - الخدمة: ${serviceText}`;
          if (budgetText && !budgetText.includes('اختر')) {
            msg += ` - الميزانية: ${budgetText}`;
          }
          whatsappSecondaryBtn.href = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
        }
      }, 700);
    });
  }

  function showFieldToast(message, targetInput) {
    targetInput.focus();
    targetInput.style.borderColor = 'var(--bronze-ball)';
    alert(message);
    setTimeout(() => {
      targetInput.style.borderColor = '';
    }, 3000);
  }

  // ==========================================================================
  // 12. أسئلة شائعة (FAQ Accordion)
  // ==========================================================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const collapse = item.querySelector('.faq-answer-collapse');

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other open accordions
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherCollapse = other.querySelector('.faq-answer-collapse');
            if (otherCollapse) otherCollapse.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          collapse.style.maxHeight = null;
        } else {
          item.classList.add('active');
          collapse.style.maxHeight = `${collapse.scrollHeight}px`;
        }
      });
    });
  }

  // ==========================================================================
  // 13. نظام حماية البيانات الشخصية السعودي (PDPL Cookie Banner)
  // ==========================================================================
  function initCookiePDPL() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const settingsBtn = document.getElementById('cookie-settings-btn');
    const privacyModal = document.getElementById('privacy-modal');

    const hasConsented = localStorage.getItem('madar_cookie_consent');
    if (!hasConsented && banner) {
      setTimeout(() => {
        banner.classList.add('active');
      }, 1000);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('madar_cookie_consent', 'true');
        banner.classList.remove('active');
      });
    }

    if (settingsBtn && privacyModal) {
      settingsBtn.addEventListener('click', () => {
        privacyModal.classList.add('active');
      });
    }
  }

  // ==========================================================================
  // 14. تحويل اللغة (Bilingual Toggle)
  // ==========================================================================
  function initLanguageSwitcher() {
    const toggleBtns = document.querySelectorAll('.lang-toggle-btn');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        const html = document.documentElement;

        if (currentLang === 'en') {
          html.setAttribute('lang', 'en-US');
          html.setAttribute('dir', 'ltr');
          btn.innerHTML = `<span>العربية</span> <span style="font-size: 0.8rem;">🇸🇦</span>`;
          document.querySelectorAll('[data-i18n-en]').forEach(el => {
            el.dataset.i18nAr = el.innerText;
            el.innerText = el.dataset.i18nEn;
          });
        } else {
          html.setAttribute('lang', 'ar-SA');
          html.setAttribute('dir', 'rtl');
          btn.innerHTML = `<span>English</span> <span style="font-size: 0.8rem;">🌐</span>`;
          document.querySelectorAll('[data-i18n-en]').forEach(el => {
            if (el.dataset.i18nAr) {
              el.innerText = el.dataset.i18nAr;
            }
          });
        }
      });
    });
  }

  // ==========================================================================
  // 15. إدارة النوافذ المنبثقة والرجوع للأعلى
  // ==========================================================================
  function initModalHandlers() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
      }
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });

    const privacyTrigger = document.getElementById('open-privacy-link');
    const privacyModal = document.getElementById('privacy-modal');
    if (privacyTrigger && privacyModal) {
      privacyTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.classList.add('active');
      });
    }

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (lenisInstance) {
          lenisInstance.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }

  // ==========================================================================
  // 15-b. MADAR Scroll Reveal Engine (Subtle, Premium Fade-in on Scroll)
  // ==========================================================================
  function initMadarScrollReveal() {
    // 1. Strict prefers-reduced-motion check: show immediately without animation
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('madar-reduced-motion');
      return;
    }

    // 2. Progressive enhancement: add madar-js to <html> only after JS runs successfully
    document.documentElement.classList.add('madar-js');

    // 3. Process Group Staggers (cards, list items, stats, testimonials)
    // Up to 6 items per group with 90ms stagger
    const groups = document.querySelectorAll('[data-madar-reveal="group"], [data-madar-group]');
    groups.forEach(group => {
      const items = Array.from(group.children).filter(child => {
        return !child.matches('script, style, [aria-hidden="true"].divider');
      });

      items.slice(0, 6).forEach((item, index) => {
        if (!item.hasAttribute('data-madar-reveal')) {
          const isCard = item.classList.contains('service-card') ||
                         item.classList.contains('portfolio-card') ||
                         item.classList.contains('node-card') ||
                         item.classList.contains('process-step-card') ||
                         item.classList.contains('commitments-strip-card') ||
                         item.classList.contains('feature-strip-card') ||
                         item.classList.contains('faq-item');
          item.setAttribute('data-madar-reveal', isCard ? 'card' : 'item');
        }
        if (!item.hasAttribute('data-madar-delay')) {
          item.setAttribute('data-madar-delay', (index * 90).toString());
        }
      });
    });

    // 4. Excluded regions: navbar, preloader, hero, floating buttons, bottom mobile bar
    const excludedSelectors = [
      '#site-header',
      '#site-header *',
      '#preloader',
      '#preloader *',
      '#hero',
      '#hero *',
      '#floating-whatsapp',
      '#floating-whatsapp *',
      '#back-to-top',
      '#back-to-top *',
      '#mobile-action-bar',
      '#mobile-action-bar *',
      '#mobile-bottom-bar',
      '#mobile-bottom-bar *',
      '.mobile-bar',
      '.mobile-bar *',
      '.floating-hero-pill',
      '.floating-hero-pill *'
    ].join(',');

    const revealElements = Array.from(document.querySelectorAll('[data-madar-reveal]')).filter(el => {
      if (el.matches(excludedSelectors)) return false;
      if (el.getAttribute('data-madar-reveal') === 'group') return false;
      if (el.classList.contains('madar-revealed')) return false;
      return true;
    });

    if (revealElements.length === 0) return;

    // Apply inline transition delays if data-madar-delay is present
    revealElements.forEach(el => {
      const delay = parseInt(el.getAttribute('data-madar-delay'), 10);
      if (!isNaN(delay) && delay > 0) {
        el.style.transitionDelay = `${delay}ms`;
      }
    });

    // 5. IntersectionObserver triggering at ~85% viewport height (rootMargin: '0px 0px -15% 0px')
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.85) {
            const el = entry.target;
            el.classList.add('madar-revealed');

            const delay = parseInt(el.getAttribute('data-madar-delay'), 10) || 0;
            const settleTimeout = setTimeout(() => {
              el.classList.add('madar-settled');
              el.style.opacity = '1';
              el.style.filter = 'none';
            }, 900 + delay + 40);

            el.addEventListener('transitionend', function onEnd(e) {
              if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                clearTimeout(settleTimeout);
                el.classList.add('madar-settled');
                el.style.opacity = '1';
                el.style.filter = 'none';
                el.removeEventListener('transitionend', onEnd);
              }
            });

            // Play once only: unobserve immediately
            obs.unobserve(el);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('madar-revealed', 'madar-settled'));
    }
  }

  // ==========================================================================
  // 16. JSON-LD Schema (Compliant Structured Data without invented reviews)
  // ==========================================================================
  function injectStructuredData() {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "مدار - MADAR",
      "description": "شركة متخصصة في المونتاج وتصميم المواقع والجرافيك ديزاين في السوق السعودي والخليجي.",
      "url": "https://madar.sa/",
      "telephone": "+201212529087",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SA",
        "addressLocality": "الرياض"
      }
    };
    schemaScript.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);
  }

})();
