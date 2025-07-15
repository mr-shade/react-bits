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
    if (isMobile) {
      ScrollTrigger.normalizeScroll(true);
    }

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner'),
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: isMobile ? 1.5 : 2,
      syncTouch: true,
      touchInertiaMultiplier: 35,
      normalizeWheel: true,
    });

    let scrollTimeout;
    const updateScrollTrigger = () => {
      if (isMobile) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          ScrollTrigger.update();
        }, 16); // ~60fps
      } else {
        ScrollTrigger.update();
      }
    };

    lenis.on('scroll', updateScrollTrigger);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

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
        // Add hardware acceleration for mobile
        if (isMobile) {
          gsap.set(card, {
            willChange: "transform, filter",
            backfaceVisibility: "hidden",
            perspective: 1000,
            transformStyle: "preserve-3d",
          });
        }

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
            scroller,
            trigger: card,
            start: `top-=${itemStackDistance * i} ${stackPosition}`,
            end: `top ${scaleEndPosition}`,
            scrub: isMobile ? 0.5 : true,
            anticipatePin: 1,
            fastScrollEnd: false,
            invalidateOnRefresh: false,
          },
        };

        gsap.to(card, scaleAnimation);

        if (blurAmount) {
          gsap.to(card, {
            filter: () =>
              `blur(${Math.max(0, (cards.length - 1 - i) * blurAmount)}px)`,
            ease: "power2.out",
            scrollTrigger: {
              scroller,
              trigger: cards[i + 1] || card,
              start: `top-=${itemStackDistance * (i + 1)} ${stackPosition}`,
              end: `top ${scaleEndPosition}`,
              scrub: isMobile ? 0.5 : true,
              anticipatePin: 1,
              fastScrollEnd: false,
              invalidateOnRefresh: false,
            },
          });
        }

        ScrollTrigger.create({
          scroller,
          trigger: card,
          start: `top-=${itemStackDistance * i} ${stackPosition}`,
          endTrigger: ".scroll-stack-end",
          end: "top center",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          fastScrollEnd: false,
          invalidateOnRefresh: false,
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
      lenis.destroy();
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
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

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
        ...(isMobile && { 
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
        }),
      }}
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
