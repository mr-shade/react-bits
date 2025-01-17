export const shinyText = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/ShinyText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/ShinyText`,
  usage: `import ShinyText from './ShinyText';
  
<ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />`,
  code: `import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
const animationDuration = \`\${speed}s\`;

return (
  <div
    className={\`shiny-text \${disabled ? 'disabled' : ''} \${className}\`}
    style={{ animationDuration }}
  >
    {text}
  </div>
);
};

export default ShinyText;`,
  css: `.shiny-text {
color: #b5b5b5a4; /* Adjust this color to change intensity/style */
background: linear-gradient(
  120deg,
  rgba(255, 255, 255, 0) 40%,
  rgba(255, 255, 255, 0.8) 50%,
  rgba(255, 255, 255, 0) 60%
);
background-size: 200% 100%;
-webkit-background-clip: text;
background-clip: text;
display: inline-block;
animation: shine 5s linear infinite;
}

@keyframes shine {
0% {
  background-position: 100%;
}
100% {
  background-position: -100%;
}
}

.shiny-text.disabled {
animation: none;
}`,
  tailwind: `const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
const animationDuration = \`\${speed}s\`;

return (
  <div
    className={\`text-[#b5b5b5a4] bg-clip-text inline-block \${disabled ? '' : 'animate-shine'} \${className}\`}
    style={{
      backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      animationDuration: animationDuration,
    }}
  >
    {text}
  </div>
);
};

export default ShinyText;

// tailwind.config.js
module.exports = {
theme: {
  extend: {
    keyframes: {
      shine: {
        '0%': { 'background-position': '100%' },
        '100%': { 'background-position': '-100%' },
      },
    },
    animation: {
      shine: 'shine 5s linear infinite',
    },
  },
},
plugins: [],
};`
}