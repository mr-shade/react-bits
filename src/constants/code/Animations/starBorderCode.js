export const starBorder = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/StarBorder`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/StarBorder`,
  usage: `import StarBorder from './StarBorder'
  
<StarBorder
as="button"
className="custom-class"
color="cyan"
speed="5s"
>
// content
</StarBorder>`,
  code: `import "./StarBorder.css";

const StarBorder = ({
as: Component = "button",
className = "",
color = "white",
speed = "6s",
children,
...rest
}) => {
return (
  <Component className={\`star-border-container \${className}\`} {...rest}>
    <div
      className="border-gradient-bottom"
      style={{
        background: \`radial-gradient(circle, \${color}, transparent 10%)\`,
        animationDuration: speed,
      }}
    ></div>
    <div
      className="border-gradient-top"
      style={{
        background: \`radial-gradient(circle, \${color}, transparent 10%)\`,
        animationDuration: speed,
      }}
    ></div>
    <div className="inner-content">{children}</div>
  </Component>
);
};

export default StarBorder;`,
  css: `.star-border-container {
display: inline-block;
padding: 1px 0;
position: relative;
border-radius: 20px;
overflow: hidden;
}

.border-gradient-bottom {
position: absolute;
width: 300%;
height: 50%;
opacity: 0.7;
bottom: -11px;
right: -250%;
border-radius: 50%;
animation: star-movement-bottom linear infinite alternate;
z-index: 0;
}

.border-gradient-top {
position: absolute;
opacity: 0.7;
width: 300%;
height: 50%;
top: -10px;
left: -250%;
border-radius: 50%;
animation: star-movement-top linear infinite alternate;
z-index: 0;
}

.inner-content {
position: relative;
background: linear-gradient(to bottom, #060606, #111);
border: 1px solid #222;
color: white;
font-size: 16px;
text-align: center;
padding: 16px 26px;
border-radius: 20px;
z-index: 1;
}

@keyframes star-movement-bottom {
0% {
  transform: translate(0%, 0%);
  opacity: 1;
}
100% {
  transform: translate(-100%, 0%);
  opacity: 0;
}
}

@keyframes star-movement-top {
0% {
  transform: translate(0%, 0%);
  opacity: 1;
}
100% {
  transform: translate(100%, 0%);
  opacity: 0;
}
}`,
  tailwind: `const StarBorder = ({
as: Component = "button",
className = "",
color = "white",
speed = "6s",
children,
...rest
}) => {
return (
  <Component className={\`relative inline-block py-[1px] overflow-hidden rounded-[20px] \${className}\`} {...rest}>
    <div
      className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
      style={{
        background: \`radial-gradient(circle, \${color}, transparent 10%)\`,
        animationDuration: speed,
      }}
    ></div>
    <div
      className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
      style={{
        background: \`radial-gradient(circle, \${color}, transparent 10%)\`,
        animationDuration: speed,
      }}
    ></div>
    <div className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
      {children}
    </div>
  </Component>
);
};

export default StarBorder;

// tailwind.config.js
module.exports = {
theme: {
  extend: {
    animation: {
      'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
      'star-movement-top': 'star-movement-top linear infinite alternate',
    },
    keyframes: {
      'star-movement-bottom': {
        '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
        '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
      },
      'star-movement-top': {
        '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
        '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
      },
    },
  },
}
}`
}