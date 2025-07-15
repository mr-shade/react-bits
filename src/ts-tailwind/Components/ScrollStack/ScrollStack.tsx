import React, { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
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
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{ overscrollBehavior: "contain" }}
    >
      <div className="pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
