import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./FeatureCards.css";
import CountUp from "../../../content/TextAnimations/CountUp/CountUp";

// Particle Animation Component
const ParticleCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticlesRef = useRef([]);
  const particlesInitialized = useRef(false);

  const createParticle = useCallback((x, y) => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(132, 0, 255, 1);
      border-radius: 50%;
      pointer-events: none;
      z-index: 100;
      left: ${x}px;
      top: ${y}px;
      box-shadow: 0 0 6px rgba(132, 0, 255, 0.6);
    `;
    return particle;
  }, []);

  const createMemoizedParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(
        Math.random() * rect.width,
        Math.random() * rect.height
      );
      memoizedParticlesRef.current.push(particle);
    }
    particlesInitialized.current = true;
  }, [createParticle]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
    particlesRef.current.forEach((particle) => {
      if (particle.parentNode) {
        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      }
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    // Create memoized particles if not initialized
    if (!particlesInitialized.current) {
      createMemoizedParticles();
    }

    memoizedParticlesRef.current.forEach((particle, i) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        // Clone the memoized particle
        const clonedParticle = particle.cloneNode(true);
        cardRef.current.appendChild(clonedParticle);
        particlesRef.current.push(clonedParticle);

        gsap.set(clonedParticle, { scale: 0, opacity: 0 });
        gsap.to(clonedParticle, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
        gsap.to(clonedParticle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true
        });
        gsap.to(clonedParticle, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
      }, i * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [createMemoizedParticles]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isHoveredRef.current = false;
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      clearParticles();
    };
  }, [animateParticles, clearParticles]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
};

// Global Spotlight Component  
const GlobalSpotlight = ({ gridRef }) => {
  const spotlightRef = useRef(null);
  const isInsideSectionRef = useRef(false);

  useEffect(() => {
    if (!gridRef?.current) return;
    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(132, 0, 255, 0.15) 0%, rgba(132, 0, 255, 0.08) 15%, rgba(132, 0, 255, 0.04) 25%, rgba(132, 0, 255, 0.02) 40%, rgba(132, 0, 255, 0.01) 55%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      // Check if cursor is within the features section
      const featuresSection = gridRef.current.closest('.features-section');
      const sectionRect = featuresSection?.getBoundingClientRect();
      const isInside = sectionRect &&
        e.clientX >= sectionRect.left &&
        e.clientX <= sectionRect.right &&
        e.clientY >= sectionRect.top &&
        e.clientY <= sectionRect.bottom;

      isInsideSectionRef.current = isInside;

      // Only calculate if inside the section
      if (!isInside) {
        // Hide spotlight and reset glow when outside section
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        const cards = gridRef.current.querySelectorAll(".feature-card");
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const cards = gridRef.current.querySelectorAll(".feature-card");
      let minDistance = Infinity;
      const proximityThreshold = 100;
      const fadeThreshold = 150;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(
          e.clientX - cardCenterX,
          e.clientY - cardCenterY
        );
        const effectiveDistance = Math.max(
          0,
          distance - Math.max(rect.width, rect.height) / 2
        );
        minDistance = Math.min(minDistance, effectiveDistance);

        const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
        const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
        let glowIntensity = 0;
        if (effectiveDistance <= proximityThreshold) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeThreshold) {
          const fadeRange = fadeThreshold - proximityThreshold;
          const fadeProgress = (fadeThreshold - effectiveDistance) / fadeRange;
          glowIntensity = Math.max(0, fadeProgress);
        }
        card.style.setProperty("--glow-x", `${relativeX}%`);
        card.style.setProperty("--glow-y", `${relativeY}%`);
        card.style.setProperty("--glow-intensity", glowIntensity);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      let targetOpacity = 0;
      if (minDistance <= proximityThreshold) {
        targetOpacity = 0.8; // Increased from 1 for better visibility with mix-blend-mode
      } else if (minDistance <= fadeThreshold) {
        const fadeRange = fadeThreshold - proximityThreshold;
        const fadeProgress = (fadeThreshold - minDistance) / fadeRange;
        targetOpacity = Math.max(0, fadeProgress * 0.8); // Increased multiplier
      }

      const duration = targetOpacity > 0 ? 0.2 : 0.5;
      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: duration,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      if (!gridRef?.current) return;
      isInsideSectionRef.current = false;
      const cards = gridRef.current.querySelectorAll(".feature-card");
      cards.forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (spotlightRef.current && spotlightRef.current.parentNode) {
        spotlightRef.current.parentNode.removeChild(spotlightRef.current);
      }
    };
  }, [gridRef]);

  return null;
};

const FeatureCards = () => {
  const gridRef = useRef(null);

  return (
    <div className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h3 className="features-title">Zero cost, all the cool.</h3>
          <p className="features-subtitle">Everything you need to add flair to your websites</p>
        </div>
        <GlobalSpotlight gridRef={gridRef} />
        <div className="bento-grid" ref={gridRef}>
          <ParticleCard className="feature-card card1">
            <div className="messages-gif-wrapper">
              <img src="/assets/messages.gif" alt="Messages animation" className="messages-gif" />
            </div>
            <h2><CountUp to={'100'} />%</h2>
            <h3>Free &amp; Open Source</h3>
            <p>Loved by developers around the world</p>
          </ParticleCard>

          <ParticleCard className="feature-card card2">
            <div className="components-gif-wrapper">
              <img src="/assets/components.gif" alt="Components animation" className="components-gif" />
            </div>
            <h2><CountUp to={'80'} />+</h2>
            <h3>Curated Components</h3>
            <p>Growing weekly &amp; only getting better</p>
          </ParticleCard>

          <ParticleCard className="feature-card card4">
            <div className="switch-gif-wrapper">
              <img src="/assets/switch.gif" alt="Switch animation" className="switch-gif" />
            </div>
            <h2><CountUp to={'2'} /></h2>
            <h3>Styling Options</h3>
            <p>CSS or Tailwind, switch with one click</p>
          </ParticleCard>

          <ParticleCard className="feature-card card5">
            <h2>Zero</h2>
            <h3>Bloat Included</h3>
            <p>Use only what you need, when you need it</p>
          </ParticleCard>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
