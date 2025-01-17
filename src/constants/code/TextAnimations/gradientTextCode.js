export const gradientText = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/GradientText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/GradientText`,
  usage: `import GradientText from './GradientText'
  
<GradientText
colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
animationSpeed={3}
showBorder={false}
className="custom-class"
>
Add a splash of color!
</GradientText>`,
  code: `import "./GradientText.css";

export default function GradientText({
children,
className = "",
colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
animationSpeed = 8,
showBorder = false,
}) {
const gradientStyle = {
  backgroundImage: \`linear-gradient(to right, \${colors.join(", ")})\`,
  animationDuration: \`\${animationSpeed}s\`,
};

return (
  <div className={\`animated-gradient-text \${className}\`}>
    {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
    <div className="text-content" style={gradientStyle}>{children}</div>
  </div>
);
}`,
  css: `.animated-gradient-text {
position: relative;
margin: 0 auto;
display: flex;
max-width: fit-content;
flex-direction: row;
align-items: center;
justify-content: center;
border-radius: 1.25rem; /* 20px */
font-weight: 500;
backdrop-filter: blur(10px);
transition: box-shadow 0.5s ease-out;
overflow: hidden;
cursor: pointer;
}

.gradient-overlay {
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-size: 300% 100%;
animation: gradient linear infinite;
border-radius: inherit;
z-index: 0;
pointer-events: none;

&:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #060606;
  z-index: -1;
}
}

@keyframes gradient {
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
}

.text-content {
display: inline-block;
position: relative;
z-index: 2;
background-size: 300% 100%;
background-clip: text;
-webkit-background-clip: text;
color: transparent;
animation: gradient linear infinite;
}`,
  tailwind: `export default function GradientText({
children,
className = "",
colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
animationSpeed = 8,
showBorder = false,
}) {
const gradientStyle = {
  backgroundImage: \`linear-gradient(to right, \${colors.join(", ")})\`,
  animationDuration: \`\${animationSpeed}s\`,
};

return (
  <div
    className={\`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer \${className}\`}
  >
    {showBorder && (
      <div
        className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
        style={{
          ...gradientStyle,
          backgroundSize: "300% 100%",
        }}
      >
        <div
          className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
          style={{
            width: "calc(100% - 2px)",
            height: "calc(100% - 2px)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
    )}
    <div
      className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
      style={{
        ...gradientStyle,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "300% 100%",
      }}
    >
      {children}
    </div>
  </div>
);
}
  
// tailwind.config.js

module.exports = {
theme: {
  extend: {
    keyframes: {
      gradient: {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
    },
    animation: {
      gradient: 'gradient 8s linear infinite'
    },
  },
},
plugins: [],
};`
}