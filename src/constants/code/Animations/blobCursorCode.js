export const blobCursor = {
  installation: `npm i @react-spring/web`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/BlobCursor`,
  usage: `import BlobCursor from './BlobCursor'
  
<BlobCursor />`,
  code: `import { useTrail, animated } from '@react-spring/web'
import { useRef, useEffect, useCallback } from 'react';

import './BlobCursor.css';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => \`translate3d(\${x}px,\${y}px,0) translate3d(-50%,-50%,0)\`;

export default function BlobCursor({ blobType = 'circle', fillColor = '#00f0ff' }) {
const [trail, api] = useTrail(3, i => ({
  xy: [0, 0],
  config: i === 0 ? fast : slow,
}));

const ref = useRef();

const updatePosition = useCallback(() => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }
  return { left: 0, top: 0 };
}, []);

const handleMove = e => {
  const { left, top } = updatePosition();
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);
  api.start({ xy: [x - left, y - top] });
};

useEffect(() => {
  const handleResize = () => {
    updatePosition();
  };

  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [updatePosition]);

return (
  <div className='container'>
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="blob">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
        <feColorMatrix
          in="blur"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
        />
      </filter>
    </svg>
    <div
      ref={ref}
      className='main'
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {trail.map((props, index) => (
        <animated.div key={index} style={{
          transform: props.xy.to(trans),
          borderRadius: blobType === 'circle' ? '50%' : '0%',
          backgroundColor: fillColor
        }} />
      ))}
    </div>
  </div>
);
}`,
  css: `.container {
width: 100%;
height: 100%;
}

.main > div {
position: absolute;
will-change: transform;
border-radius: 50%;
background: lightcoral;
box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
opacity: 0.6;
}

.main > div:nth-child(1) {
width: 60px;
height: 60px;
}

.main > div:nth-child(2) {
width: 125px;
height: 125px;
}

.main > div:nth-child(3) {
width: 75px;
height: 75px;
}

.main > div::after {
content: "";
position: absolute;
top: 20px;
left: 20px;
width: 20px;
height: 20px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.8);
}

.main > div:nth-child(2)::after {
top: 35px;
left: 35px;
width: 35px;
height: 35px;
}

.main > div:nth-child(3)::after {
top: 25px;
left: 25px;
width: 25px;
height: 25px;
}

.main {
position: absolute;
width: 100%;
height: 100%;
filter: url("#blob");
overflow: hidden;
background: transparent;
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
cursor: default;
}`
}