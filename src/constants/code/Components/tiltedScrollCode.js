export const tiltedScroll = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/TiltedScroll`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/TiltedScroll`,
  usage: `import TiltedScroll from './TiltedScroll'

<TiltedScroll />`,

  code: `import './TiltedScroll.css'; 

const TiltedScroll = () => {
const items = [
  { id: '1', text: 'Item' },
  { id: '2', text: 'Another Item' },
  { id: '3', text: 'Yet Another Item' },
  { id: '4', text: 'Yet Another Item' },
  { id: '5', text: 'Yet Another Item' },
  { id: '6', text: 'Yet Another Item' },
  { id: '7', text: 'Yet Another Item' },
  { id: '8', text: 'Yet Another Item' },
];

return (
  <div className="container">
    <div className="inner-container">
      <div className="scroll-grid">
        {items.map((item) => (
          <div key={item.id} className="tilted-grid-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p className="item-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default TiltedScroll;`,
  css: `.container {
display: flex;
align-items: center;
justify-content: center;
}

.inner-container {
position: relative;
width: 100%;
max-width: 1440px;
overflow: hidden;
mask-composite: intersect;
mask-image: linear-gradient(to right, transparent, black 5rem), linear-gradient(to left, transparent, black 5rem),
  linear-gradient(to bottom, transparent, black 5rem), linear-gradient(to top, transparent, black 5rem);
}

.scroll-grid {
margin: auto;
display: grid;
height: 250px;
width: 300px;
animation: skew-scroll 20s linear infinite;
grid-template-columns: repeat(1, 1fr);
gap: 1.25rem;
}

.scroll-grid.sm-grid-cols-2 {
width: 600px;
grid-template-columns: repeat(2, 1fr);
}

.tilted-grid-item {
display: flex;
align-items: center;
cursor: pointer;
gap: 0.5rem;
border-radius: 0.375rem;
border: 1px solid #222;
padding: 1rem 1.25rem;
box-shadow: 0 4px 6px rgba(146, 146, 146, 0.1);
transition: 0.3s ease;
}

.tilted-grid-item:hover {
transform: translate(-0.25rem, -0.25rem) scale(1.025);
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.tilted-grid-item.dark {
border-color: #fff;
}

.icon {
height: 1.5rem;
width: 1.5rem;
margin-right: 10px;
}

.item-text {
color: #fff;
}

@keyframes skew-scroll {
0% {
  transform: rotateX(20deg) rotateZ(-20deg) skewX(20deg);
}
100% {
  transform: rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateY(-100%);
}
}`,
  tailwind: `const TiltedScroll = () => {
const items = [
  { id: "1", text: "Item" },
  { id: "2", text: "Another Item" },
  { id: "3", text: "Yet Another Item" },
  { id: "4", text: "Yet Another Item" },
  { id: "5", text: "Yet Another Item" },
  { id: "6", text: "Yet Another Item" },
  { id: "7", text: "Yet Another Item" },
  { id: "8", text: "Yet Another Item" },
];

return (
  <div className="flex items-center justify-center">
    <div className="relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_5rem),linear-gradient(to_left,transparent,black_5rem),linear-gradient(to_bottom,transparent,black_5rem),linear-gradient(to_top,transparent,black_5rem)]">
      <div className="grid h-[250px] w-[300px] gap-5 animate-skew-scroll grid-cols-1 sm:w-[300px] sm:grid-cols-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 cursor-pointer rounded-md border border-gray-800 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 mr-2"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p className="text-white">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default TiltedScroll;

//tailwind.config.js
module.exports = {
theme: {
  extend: {
    animation: {
      'skew-scroll': 'skew-scroll 20s linear infinite',
    },
    keyframes: {
      'skew-scroll': {
        '0%': {
          transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)',
        },
        '100%': {
          transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateY(-100%)',
        },
      },
    },
  },
},
plugins: [],
};`
}