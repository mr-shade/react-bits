export const infiniteScroll = {
  installation: `npm i gsap`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/InfiniteScroll`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/InfiniteScroll`,
  usage: `import InfiniteScroll from './InfiniteScroll';
  
const items = [
  { content: "Text Item 1" },
  { content: <p>Paragraph Item 2</p> },
  { content: "Text Item 3" },
  { content: <p>Paragraph Item 4</p> },
  { content: "Text Item 5" },
  { content: <p>Paragraph Item 6</p> },
  { content: "Text Item 7" },
  { content: <p>Paragraph Item 8</p> },
  { content: "Text Item 9" },
  { content: <p>Paragraph Item 10</p> },
  { content: "Text Item 11" },
  { content: <p>Paragraph Item 12</p> },
  { content: "Text Item 13" },
  { content: <p>Paragraph Item 14</p> },
];
  
<div style={{height: '500px', positon: 'relative'}}>
  <InfiniteScroll
    items={items}
    isTilted={true}
    tiltDirection='left'
    autoplay={true}
    autoplaySpeed={0.1}
    autoplayDirection="down"
    pauseOnHover={true}
  />
</div>`,
  code: `import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import './InfiniteScroll.css';

gsap.registerPlugin(Observer);

export default function InfiniteScroll({
  // ----- Layout / Style Props -----
  width = "30rem",             // Width of the outer .wrapper
  maxHeight = "100%",          // Max-height of the outer .wrapper
  negativeMargin = "-0.5em",   // Negative margin to reduce spacing between items
  // ----- Items Prop -----
  items = [],                  // Array of items with { content: ... }
  itemMinHeight = 150,         // Fixed height for each item
  // ----- Tilt Props -----
  isTilted = false,            // Whether the container is in "skewed" perspective
  tiltDirection = "left",      // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay = false,            // Whether it should automatically scroll
  autoplaySpeed = 0.5,          // Speed (pixels/frame approx.)
  autoplayDirection = "down",  // "down" or "up"
  pauseOnHover = false,        // Pause autoplay on hover
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const getTiltTransform = () => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
      : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = (itemHeight * items.length) + (itemMarginTop * (items.length - 1));

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        target.style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        target.style.cursor = "grab";
      },
      onChange: ({ deltaY, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaY : deltaY;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            y: \`+=\${distance}\`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
      }
    });

    let rafId;
    if (autoplay) {
      const directionFactor = autoplayDirection === "down" ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            y: \`+=\${speedPerFrame}\`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => (rafId = requestAnimationFrame(tick));

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          rafId && cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    isTilted,
    tiltDirection,
    negativeMargin
  ]);

  return (
    <>
      <style>
        {\`
        .infinite-scroll-wrapper {
          max-height: \${maxHeight};
        }

        .infinite-scroll-container {
          width: \${width};
        }

        .infinite-scroll-item {
          height: \${itemMinHeight}px;
          margin-top: \${negativeMargin};
        }
        \`}
      </style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={{
            transform: getTiltTransform(),
          }}
        >
          {items.map((item, i) => (
            <div
              className='infinite-scroll-item'
              key={i}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}`,
  css: `.infinite-scroll-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  border-block: 2px dotted transparent;
}

.infinite-scroll-wrapper::before,
.infinite-scroll-wrapper::after {
  content: "";
  position: absolute;
  background: linear-gradient(var(--dir, to bottom), black, transparent);
  height: 25%;
  width: 100%;
  z-index: 1;
  pointer-events: none;
}

.infinite-scroll-wrapper::before {
  top: 0;
}

.infinite-scroll-wrapper::after {
  --dir: to top;
  bottom: 0;
}

.infinite-scroll-container {
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
  padding-inline: 1rem;
  cursor: grab;
  transform-origin: center center;
}

.infinite-scroll-item {
  --accent-color: #ffffff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  border: 2px solid var(--accent-color);
  user-select: none;
  box-sizing: border-box;
  position: relative;
}`,
  tailwind: `import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export default function InfiniteScroll({
  // ----- Layout / Style Props -----
  width = "30rem",             // Width of the outer wrapper
  maxHeight = "100%",          // Max-height of the outer wrapper
  negativeMargin = "-0.5em",   // Negative margin to reduce spacing between items
  // ----- Items Prop -----
  items = [],                  // Array of items with { content: ... }
  itemMinHeight = 150,         // Fixed height for each item
  // ----- Tilt Props -----
  isTilted = false,            // Whether the container is in "skewed" perspective
  tiltDirection = "left",      // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay = false,            // Whether it should automatically scroll
  autoplaySpeed = 0.5,          // Speed (pixels/frame approx.)
  autoplayDirection = "down",  // "down" or "up"
  pauseOnHover = false,        // Pause autoplay on hover
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const getTiltTransform = () => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
      : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight =
      itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        target.style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        target.style.cursor = "grab";
      },
      onChange: ({ deltaY, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaY : deltaY;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            y: \`+=\${distance}\`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
      },
    });

    let rafId;
    if (autoplay) {
      const directionFactor = autoplayDirection === "down" ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            y: \`+=\${speedPerFrame}\`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => (rafId = requestAnimationFrame(tick));

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          rafId && cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    isTilted,
    tiltDirection,
    negativeMargin,
  ]);

  return (
    <div
      className="relative flex items-center justify-center w-full overflow-hidden overscroll-none border-t-2 border-b-2 border-t-dotted border-b-dotted border-transparent"
      ref={wrapperRef}
      style={{ maxHeight }}
    >
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

      {/* Container */}
      <div
        className="flex flex-col overscroll-contain px-4 cursor-grab origin-center"
        ref={containerRef}
        style={{
          width,
          transform: getTiltTransform(),
        }}
      >
        {items.map((item, i) => (
          <div
            className="flex items-center justify-center p-4 text-xl font-semibold text-center border-2 border-white rounded-[15px] select-none box-border relative"
            key={i}
            style={{
              height: \`\${itemMinHeight}px\`,
              marginTop: negativeMargin,
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}`
}