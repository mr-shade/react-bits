import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./ScrollStack.css";

gsap.registerPlugin(ScrollTrigger);

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const stackCompletedRef = useRef(false);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    let lenis = null;
    
    if (!isMobile) {
      lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        normalizeWheel: true,
        gestureDirection: 'vertical',
      });

      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    let cards = Array.from(
      scroller.querySelectorAll(".scroll-stack-card")
    );

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const animations = {
          scale: () => baseScale + i * itemScale,
          ease: "power2.out",
        };

        if (rotationAmount) {
          animations.rotation = () => i * rotationAmount;
        }

        const scaleAnimation = {
          ...animations,
          scrollTrigger: {
            scroller: isMobile ? null : scroller,
            trigger: card,
            start: `top-=${itemStackDistance * i} ${stackPosition}`,
            end: `top ${scaleEndPosition}`,
            scrub: isMobile ? 0.1 : 0.5,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        };

        gsap.to(card, scaleAnimation);

        if (blurAmount) {
          gsap.to(card, {
            filter: () =>
              `blur(${Math.max(0, (cards.length - 1 - i) * blurAmount)}px)`,
            ease: "power2.out",
            scrollTrigger: {
              scroller: isMobile ? null : scroller,
              trigger: cards[i + 1] || card,
              start: `top-=${itemStackDistance * (i + 1)} ${stackPosition}`,
              end: `top ${scaleEndPosition}`,
              scrub: isMobile ? 0.1 : 0.5,
              anticipatePin: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          });
        }

        ScrollTrigger.create({
          scroller: isMobile ? null : scroller,
          trigger: card,
          start: `top-=${itemStackDistance * i} ${stackPosition}`,
          endTrigger: ".scroll-stack-end",
          end: "top center",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onEnter: () => {
            if (i === cards.length - 1 && !stackCompletedRef.current) {
              stackCompletedRef.current = true;
              onStackComplete?.();
            }
          },
          onLeave: () => {
            if (i === cards.length - 1 && stackCompletedRef.current) {
              stackCompletedRef.current = false;
            }
          },
          onLeaveBack: () => {
            if (i === cards.length - 1 && stackCompletedRef.current) {
              stackCompletedRef.current = false;
            }
          },
        });
      });

      ScrollTrigger.refresh();
    }, scroller);

    return () => {
      ctx.revert();
      if (lenis) {
        lenis.destroy();
      }
      if (autoScrollRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearInterval(autoScrollRef.current);
      }
      stackCompletedRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
