export const pixelTransition = {
  installation: `npm i gsap`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/PixelTransition`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/PixelTransition`,
  usage: `import PixelTransition from './PixelTransition';

<PixelTransition
  firstContent={
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>`,
  code: `import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  className = '',
  style = {},
  aspectRatio = '100%',
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = \`\${size}%\`;
        pixel.style.height = \`\${size}%\`;
        pixel.style.left = \`\${col * size}%\`;
        pixel.style.top = \`\${row * size}%\`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate) => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'none' : '';
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  };

  const handleMouseEnter = () => {
    if (!isActive) animatePixels(true);
  };
  const handleMouseLeave = () => {
    if (isActive) animatePixels(false);
  };
  const handleClick = () => {
    animatePixels(!isActive);
  };

  return (
    <div
      ref={containerRef}
      className={\`pixelated-image-card \${className}\`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default">
        {firstContent}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef}>
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

export default PixelTransition;`,
  css: `.pixelated-image-card {
  background-color: #222;
  color: var(--color-primary, #fff);
  border-radius: 15px;
  border: 2px solid #fff;
  width: 300px;
  max-width: 100%;
  position: relative;
  overflow: hidden;
}

.pixelated-image-card__default,
.pixelated-image-card__active,
.pixelated-image-card__pixels {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.pixelated-image-card__active {
  z-index: 2;
}

.pixelated-image-card__active {
  display: none;
}

.pixelated-image-card__pixels {
  pointer-events: none;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.pixelated-image-card__pixel {
  display: none;
  position: absolute;
}`,
  tailwind: `import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  className = '',
  style = {},
  aspectRatio = '100%',
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.classList.add('absolute', 'hidden');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = \`\${size}%\`;
        pixel.style.height = \`\${size}%\`;
        pixel.style.left = \`\${col * size}%\`;
        pixel.style.top = \`\${row * size}%\`;

        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate) => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'none' : '';
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  };

  const handleMouseEnter = () => {
    if (!isActive) animatePixels(true);
  };
  const handleMouseLeave = () => {
    if (isActive) animatePixels(false);
  };
  const handleClick = () => {
    animatePixels(!isActive);
  };

  return (
    <div
      ref={containerRef}
      // Combine your own className with the Tailwind classes for styling
      className={\`
        \${className}
        bg-[#222]
        text-white
        rounded-[15px]
        border-2
        border-white
        w-[300px]
        max-w-full
        relative
        overflow-hidden
      \`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />

      <div className="absolute inset-0 w-full h-full">
        {firstContent}
      </div>

      <div
        ref={activeRef}
        className="absolute inset-0 w-full h-full z-[2]"
        style={{ display: 'none' }}
      >
        {secondContent}
      </div>

      <div
        ref={pixelGridRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
      />
    </div>
  );
}

export default PixelTransition;`
}