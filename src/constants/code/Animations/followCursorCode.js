export const followCursor = {
  installation: `npm i @react-spring/web react-use-gesture`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/FollowCursor`,
  usage: `import FollowCursor from './FollowCursor'

<FollowCursor />`,
  code: `import { useRef, useEffect } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { useGesture } from "react-use-gesture";

import './FollowCursor.css';

// Utility functions for calculating rotations
const calcX = (y, ly) => \`-(y - ly - window.innerHeight / 2) / 20;\`
const calcY = (x, lx) => \`(x - lx - window.innerWidth / 2) / 20;\`

// Function to handle wheel translations
const wheel = (y) => {
const imgHeight = window.innerWidth * 0.3 - 20;
return \`translateY(\${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px\`;
};

// Utility to detect if the device is mobile
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function FollowCursor() {
const domTarget = useRef(null);

// Spring configuration for animations
const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
  () => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  })
);

const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }));

useEffect(() => {
  if (!isMobile()) {
    const handleMouseMove = (event) => {
      const px = event.clientX;
      const py = event.clientY;

      api({
        x: px - window.innerWidth / 2,
        y: py - window.innerHeight / 2,
        rotateX: calcX(py, y.get()),
        rotateY: calcY(px, x.get()),
        scale: 1.1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  } else {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }
}, [api, y, x]);

useGesture(
  {
    onDrag: ({ active, offset: [x, y] }) =>
      api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
    onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
  },
  { domTarget, eventOptions: { passive: false }, enabled: isMobile() }
);

useGesture(
  {
    onWheel: ({ event, offset: [, y] }) => {
      event.preventDefault();
      wheelApi.set({ wheelY: y });
    },
  },
  { domTarget, eventOptions: { passive: false } }
);

return (
  <div className="container">
    <animated.div
      ref={domTarget}
      className="card"
      style={{
        transform: "perspective(600px)",
        x,
        y,
        scale: to([scale, zoom], (s, z) => s + z),
        rotateX,
        rotateY,
        rotateZ,
      }}
    >
      <animated.div style={{ transform: wheelY.to(wheel) }}>
        <div>
          {/* ADD OTHER THINGS YOU NEED HERE */}
        </div>
      </animated.div>
    </animated.div>
  </div>
);
}`,
  css: `// Customize the card below as you desire

.card {
position: absolute;
width: 100px;
height: 100px;
background: url("https://res.cloudinary.com/practicaldev/image/fetch/s--8mUhEkXE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/km2w1ppw3yw9pd9na7mu.gif");
background-size: cover;
border-radius: 5px;
box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
transition:
  box-shadow 0.5s,
  opacity 0.5s;
will-change: transform;
border: 1px solid white;
overflow: hidden;
touch-action: none;
}

.card:hover {
box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
}

.card > div {
will-change: transform;
height: 100%;
margin: 0vw 0;
}

.card > div > * {
height: 100%;
background-size: cover;
background-position: center center;
margin: 0vw 0;
}`
}