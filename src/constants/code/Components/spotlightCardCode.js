export const spotlightCard = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/SpotlightCard`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/SpotlightCard`,
  usage: `import SpotlightCard from './SpotlightCard';
  
<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
<i class="fa fa-lock"></i>
<h2>Enhanced Security</h2>
<p>Our state of the art software offers peace of mind through the strictest security measures.</p>
<button>Learn more</button>
</SpotlightCard>`,
  code: `import { useRef } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
const divRef = useRef(null);

const handleMouseMove = (e) => {
  const rect = divRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  divRef.current.style.setProperty("--mouse-x", \`\${x}px\`);
  divRef.current.style.setProperty("--mouse-y", \`\${y}px\`);
  divRef.current.style.setProperty("--spotlight-color", spotlightColor);
};

return (
  <div
    ref={divRef}
    onMouseMove={handleMouseMove}
    className={\`card-spotlight \${className}\`}
  >
    {children}
  </div>
);
};

export default SpotlightCard;`,
  css: `.card-spotlight {
position: relative;
border-radius: 1.5rem;
border: 1px solid #222;
background-color: #111;
padding: 2rem;
overflow: hidden;
--mouse-x: 50%;
--mouse-y: 50%;
--spotlight-color: rgba(255, 255, 255, 0.05);
}

.card-spotlight::before {
content: "";
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);
opacity: 0;
transition: opacity 0.5s ease;
pointer-events: none;
}

.card-spotlight:hover::before,
.card-spotlight:focus-within::before {
opacity: 0.6;
}`,
  tailwind: `import { useRef, useState } from "react";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
const divRef = useRef(null);
const [isFocused, setIsFocused] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 });
const [opacity, setOpacity] = useState(0);

const handleMouseMove = (e) => {
  if (!divRef.current || isFocused) return;

  const rect = divRef.current.getBoundingClientRect();
  setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
};

const handleFocus = () => {
  setIsFocused(true);
  setOpacity(0.6);
};

const handleBlur = () => {
  setIsFocused(false);
  setOpacity(0);
};

const handleMouseEnter = () => {
  setOpacity(0.6);
};

const handleMouseLeave = () => {
  setOpacity(0);
};

return (
  <div
    ref={divRef}
    onMouseMove={handleMouseMove}
    onFocus={handleFocus}
    onBlur={handleBlur}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className={\`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 \${className}\`}
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
      style={{
        opacity,
        background: \`radial-gradient(circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 80%)\`,
      }}
    />
    {children}
  </div>
);
};

export default SpotlightCard;`
}