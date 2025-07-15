import React, { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./ScrollStack.css";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  const stackCompletedRef = useRef(false);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    let cards = Array.from(
      scroller.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const animations: any = {
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
            scrub: 0.5,
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
              scrub: 0.5,
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
      if (autoScrollRef.current) {
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
