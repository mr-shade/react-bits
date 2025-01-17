export const gridMotion = {
  installation: `npm i gsap`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Backgrounds/GridMotion`,
  usage: `import GridMotion from './GridMotion';
  
// note: you'll need to make sure the parent container of this component is sized properly
const items = [
  'Item 1',
  <div key='jsx-item-1'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 2',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 4',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 5',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 7',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 8',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 10',
  <div key='jsx-item-3'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 11',
  <div key='jsx-item-2'>Custom JSX Content</div>,
  'Item 13',
  <div key='jsx-item-4'>Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 14',
  // Add more items as needed
];

<GridMotion items={items} />`,
  code: `import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
const gridRef = useRef(null);
const rowRefs = useRef([]); // Array of refs for each row
const mouseXRef = useRef(window.innerWidth / 2);

const totalItems = 28;
const defaultItems = Array.from({ length: totalItems }, (_, index) => \`Item \${index + 1}\`);
const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

useEffect(() => {
  gsap.ticker.lagSmoothing(0);

  const handleMouseMove = (e) => {
    mouseXRef.current = e.clientX;
  };

  const updateMotion = () => {
    const maxMoveAmount = 300;
    const baseDuration = 0.8;
    const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

    rowRefs.current.forEach((row, index) => {
      if (row) {
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

        // Apply inertia and staggered stop
        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
    });
  };

  const removeAnimationLoop = gsap.ticker.add(updateMotion);

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    removeAnimationLoop();
  };
}, []);

return (
  <div className="noscroll loading" ref={gridRef}>
    <section
      className="intro"
      style={{
        background: \`radial-gradient(circle, \${gradientColor} 0%, transparent 100%)\`,
      }}
    >
      <div className="gridMotion-container">
        {[...Array(4)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            ref={(el) => (rowRefs.current[rowIndex] = el)}
          >
            {[...Array(7)].map((_, itemIndex) => {
              const content = combinedItems[rowIndex * 7 + itemIndex];
              return (
                <div key={itemIndex} className="row__item">
                  <div className="row__item-inner" style={{ backgroundColor: '#111' }}>
                    {typeof content === 'string' && content.startsWith('http') ? (
                      <div
                        className="row__item-img"
                        style={{
                          backgroundImage: \`url(\${content})\`,
                        }}
                      ></div>
                    ) : (
                      <div className="row__item-content">{content}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="fullview"></div>
    </section>
  </div>
);
};

export default GridMotion;`,
  css: `.noscroll {
height: 100%;
width: 100%;
overflow: hidden;
}

.intro {
width: 100%;
height: 100vh;
overflow: hidden;
position: relative;
display: flex;
align-items: center;
justify-content: center;
}

.intro::after {
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: url(../../../assets/noise.png);
background-size: 250px;
pointer-events: none;
z-index: 4;
}

.gridMotion-container {
gap: 1rem;
flex: none;
position: relative;
width: 150vw;
height: 150vh;
display: grid;
grid-template-rows: repeat(4, 1fr);
grid-template-columns: 100%;
transform: rotate(-15deg);
transform-origin: center center;
z-index: 2;
}

.row {
display: grid;
gap: 1rem;
grid-template-columns: repeat(7, 1fr);
will-change: transform, filter;
}

.row__item {
position: relative;
}

.row__item-inner {
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
border-radius: 10px;
background-color: #111;
display: flex;
align-items: center;
justify-content: center;
color: white;
font-size: 1.5rem;
}

.row__item-img {
width: 100%;
height: 100%;
background-size: cover;
background-position: 50% 50%;
position: absolute;
top: 0;
left: 0;
}

.row__item-content {
padding: 1rem;
text-align: center;
z-index: 1;
}

.fullview {
position: relative;
width: 100%;
height: 100%;
top: 0;
left: 0;
pointer-events: none;
}

.fullview .row__item-inner {
border-radius: 0px;
}`
}