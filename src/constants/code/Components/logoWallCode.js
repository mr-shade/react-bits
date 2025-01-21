export const logoWall = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/LogoWall`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/LogoWall`,
  usage: `import LogoWall from './LogoWall';
import reactbits from "../../assets/logos/reactbits-icon.svg";

const logoImgs = [
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" }
];

<div style={{height: '600px', width: '100%', position: 'relative'}}>
  <LogoWall
    items={logoImgs}
    direction='horizontal'
    pauseOnHover={true}
    size='clamp(8rem, 1rem + 20vmin, 25rem)'
    duration='60s'
    bgColor='#060606'
    bgAccentColor='#111111'
  />  
</div>`,
  code: `import { useState } from "react";
import "./LogoWall.css";

function LogoWall({
  items = [],
  direction = "horizontal",
  pauseOnHover = false,
  size = "clamp(8rem, 1rem + 30vmin, 25rem)",
  duration = "60s",
  textColor = "#ffffff",
  bgColor = "#060606",
  bgAccentColor = "#111111"
}) {
  const [isPaused, setIsPaused] = useState(false);

  const wrapperClass = [
    "wrapper",
    direction === "vertical" && "wrapper--vertical"
  ]
    .filter(Boolean)
    .join(" ");

  const marqueeClass = [
    "marquee",
    direction === "vertical" && "marquee--vertical",
    isPaused && "paused"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={wrapperClass}
      style={{
        "--size": size,
        "--duration": duration,
        "--color-text": textColor,
        "--color-bg": bgColor,
        "--color-bg-accent": bgAccentColor
      }}
    >
      {/* First Marquee */}
      <div
        className={marqueeClass}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div className="marquee__group">
          {items.map((item, idx) => (
            <img key={idx} src={item.imgUrl} alt={item.altText} />
          ))}
        </div>
        <div className="marquee__group" aria-hidden="true">
          {items.map((item, idx) => (
            <img key={\`dup1-\${idx}\`} src={item.imgUrl} alt={item.altText} />
          ))}
        </div>
      </div>

      {/* Second Marquee (reverse) */}
      <div
        className={\`\${marqueeClass} marquee--reverse\`}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div className="marquee__group">
          {items.map((item, idx) => (
            <img key={\`rev-\${idx}\`} src={item.imgUrl} alt={item.altText} />
          ))}
        </div>
        <div className="marquee__group" aria-hidden="true">
          {items.map((item, idx) => (
            <img key={\`dup2-\${idx}\`} src={item.imgUrl} alt={item.altText} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default LogoWall;`,
  css: `:root {
  --color-text: #ffffff;
  --color-bg: #060606;
  --color-bg-accent: #111111;
  --size: clamp(10rem, 1rem + 40vmin, 30rem);
  --gap: calc(var(--size) / 14);
  --duration: 60s;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  margin: 0 auto;
  max-width: 100%;
  padding: 20px 10px;

  color: var(--color-text);
  background-color: var(--color-bg);
}

.wrapper--vertical {
  flex-direction: row;
  justify-content: center;
  height: 100%;
}

.marquee {
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  justify-content: flex-start;
  width: 100%;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-size: cover;
  mask-repeat: no-repeat;
}

.marquee--vertical {
  flex-direction: column;
  height: 100%;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-size: cover;
  mask-repeat: no-repeat;
}

.marquee__group {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);
  animation: scroll-x var(--duration) linear infinite;
}

.marquee--reverse .marquee__group {
  animation-direction: reverse;
  animation-delay: -3s;
}

.marquee__group {
  min-width: 100%;
}

.marquee--vertical .marquee__group {
  min-width: auto;
  min-height: 100%;
  flex-direction: column;
  animation-name: scroll-y;
}

@keyframes scroll-x {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes scroll-y {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

.paused .marquee__group {
  animation-play-state: paused !important;
}

.marquee__group img {
  width: var(--size);
  background: var(--color-bg-accent);
  aspect-ratio: 16/9;
  padding: calc(var(--size) / 10);
  border-radius: 0.5rem;
  object-fit: contain;
}

.marquee--vertical .marquee__group img {
  aspect-ratio: 1;
  width: calc(var(--size) / 1.5);
  padding: calc(var(--size) / 6);
}`,
  tailwind: `import { useState } from "react";
  
function LogoWall({
  items = [],
  direction = "horizontal",
  pauseOnHover = false,
  size = "clamp(8rem, 1rem + 30vmin, 25rem)",
  duration = "60s",
  textColor = "#ffffff",
  bgColor = "#060606",
  bgAccentColor = "#111111"
}) {
  const [isPaused, setIsPaused] = useState(false);

  const wrapperClass = [
    "flex",
    "flex-col",
    "gap-[calc(var(--size)/14)]",
    "mx-auto",
    "max-w-full",
    "p-[20px_10px]",
    // Apply text and bg from CSS variables if desired
    // (We do that inline style below)
    direction === "vertical" && "flex-row justify-center h-full"
  ]
    .filter(Boolean)
    .join(" ");

  const marqueeClass = [
    "relative",
    "flex",
    "overflow-hidden",
    "select-none",
    "gap-[calc(var(--size)/14)]",
    "justify-start",
    "w-full",
    "mask-horizontal",
    direction === "vertical" && "flex-col h-full mask-vertical",
    isPaused && "paused"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={wrapperClass}
      style={{
        ["--size"]: size,
        ["--duration"]: duration,
        ["--color-text"]: textColor,
        ["--color-bg"]: bgColor,
        ["--color-bg-accent"]: bgAccentColor,
        color: "var(--color-text)",
        backgroundColor: "var(--color-bg)"
      }}
    >
      <div
        className={marqueeClass}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div
          className={[
            "flex-shrink-0",
            "flex",
            "items-center",
            "justify-around",
            "gap-[calc(var(--size)/14)]",
            "min-w-full",
            "animate-scrollX",
            direction === "vertical" && "flex-col min-h-full animate-scrollY"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {items.map((item, idx) => (
            <img
              key={idx}
              src={item.imgUrl}
              alt={item.altText}
              className={[
                "bg-[var(--color-bg-accent)]",
                "rounded-md",
                "object-contain",
                "aspect-video",
                \`w-[var(--size)] p-[calc(var(--size)/10)]\`,
                direction === "vertical" &&
                "aspect-square w-[calc(var(--size)/1.5)] p-[calc(var(--size)/6)]"
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          className={[
            "flex-shrink-0",
            "flex",
            "items-center",
            "justify-around",
            "gap-[calc(var(--size)/14)]",
            "min-w-full",
            "animate-scrollX",
            direction === "vertical" && "flex-col min-h-full animate-scrollY"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {items.map((item, idx) => (
            <img
              key={\`dup1-\${idx}\`}
              src={item.imgUrl}
              alt={item.altText}
              className={[
                "bg-[var(--color-bg-accent)]",
                "rounded-md",
                "object-contain",
                "aspect-video",
                \`w-[var(--size)] p-[calc(var(--size)/10)]\`,
                direction === "vertical" &&
                "aspect-square w-[calc(var(--size)/1.5)] p-[calc(var(--size)/6)]"
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </div>

      <div
        className={
          marqueeClass + " marquee--reverse"
        }
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div
          className={[
            "flex-shrink-0",
            "flex",
            "items-center",
            "justify-around",
            "gap-[calc(var(--size)/14)]",
            "min-w-full",
            "animate-scrollX reverse-x",
            direction === "vertical" && "flex-col min-h-full animate-scrollY reverse-x"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {items.map((item, idx) => (
            <img
              key={\`rev-\${idx}\`}
              src={item.imgUrl}
              alt={item.altText}
              className={[
                "bg-[var(--color-bg-accent)]",
                "rounded-md",
                "object-contain",
                "aspect-video",
                \`w-[var(--size)] p-[calc(var(--size)/10)]\`,
                direction === "vertical" &&
                "aspect-square w-[calc(var(--size)/1.5)] p-[calc(var(--size)/6)]"
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          className={[
            "flex-shrink-0",
            "flex",
            "items-center",
            "justify-around",
            "gap-[calc(var(--size)/14)]",
            "min-w-full",
            "animate-scrollX reverse-x",
            direction === "vertical" && "flex-col min-h-full animate-scrollY reverse-x"
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {items.map((item, idx) => (
            <img
              key={\`dup2-\${idx}\`}
              src={item.imgUrl}
              alt={item.altText}
              className={[
                "bg-[var(--color-bg-accent)]",
                "rounded-md",
                "object-contain",
                "aspect-video",
                \`w-[var(--size)] p-[calc(var(--size)/10)]\`,
                direction === "vertical" &&
                "aspect-square w-[calc(var(--size)/1.5)] p-[calc(var(--size)/6)]"
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default LogoWall;

// ALSO NEEDED:
//
// KEYFRAME ANIMATION:
//
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}"
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         scrollX: {
//           "0%": { transform: "translateX(0)" },
//           "100%": { transform: "translateX(-100%)" }
//         },
//         scrollY: {
//           "0%": { transform: "translateY(0)" },
//           "100%": { transform: "translateY(-100%)" }
//         }
//       },
//       animation: {
//         scrollX: "scrollX var(--duration) linear infinite",
//         scrollY: "scrollY var(--duration) linear infinite"
//       }
//     }
//   },
//   plugins: []
// };
//
// @layer utility snippet:
//
// @layer utilities {
//   .mask-horizontal {
//     @apply [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(0,0,0,0)_100%)]
//            [mask-size:cover]
//            [mask-repeat:no-repeat];
//   }
//
//   .mask-vertical {
//     @apply [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(0,0,0,0)_100%)]
//            [mask-size:cover]
//            [mask-repeat:no-repeat];
//   }
//
//   .paused .animate-scrollX,
//   .paused .animate-scrollY {
//     animation-play-state: paused !important;
//   }
//
//   .reverse-x {
//     animation-direction: reverse;
//     animation-delay: -3s;
//   }
// }`
}