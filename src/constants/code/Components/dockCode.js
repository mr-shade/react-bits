export const dock = {
  installation: `npm i @react-spring/web`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/Dock`,
  usage: `import Dock from './Dock';

<Dock collapsible={false} position="left" responsive="bottom" />`,
  code: `import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Dock.css';

const Dock = ({ position = 'bottom', collapsible = false, responsive = 'bottom' }) => {
const [hoverIndex, setHoverIndex] = useState(null);
const [isDockVisible, setDockVisible] = useState(!collapsible);
const [currentPosition, setCurrentPosition] = useState(position);

const dockItems = ['🍕', '🍔', '🌭', '🌮', '🌯'];

const handleMouseEnter = (index) => {
  setHoverIndex(index);
};

const handleMouseLeave = () => {
  setHoverIndex(null);
};

const handleParentMouseEnter = () => {
  if (collapsible) {
    setDockVisible(true);
  }
};

const handleParentMouseLeave = () => {
  if (collapsible) {
    setDockVisible(false);
  }
};

useEffect(() => {
  const updatePosition = () => {
    if (responsive && window.innerWidth <= 768) {
      setCurrentPosition(responsive);
    } else {
      setCurrentPosition(position);
    }
  };

  updatePosition();

  window.addEventListener('resize', updatePosition);
  return () => window.removeEventListener('resize', updatePosition);
}, [position, responsive, collapsible]);

const getDockStyle = () => {
  const flexDirection = currentPosition === 'left' || currentPosition === 'right' ? 'column' : 'row';
  return { flexDirection };
};

const scaleSpring = (index) => {
  const translateValue = (() => {
    if (hoverIndex === index) {
      switch (currentPosition) {
        case 'left':
          return 'translateX(5px) translateY(0px)';
        case 'right':
          return 'translateX(-5px) translateY(0px)';
        case 'top':
          return 'translateX(0px) translateY(5px)';
        case 'bottom':
          return 'translateX(0px) translateY(-5px)';
        default:
          return 'translateX(0px) translateY(0px)';
      }
    } else {
      return 'translateX(0px) translateY(0px)';
    }
  })();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSpring({
    transform:
      hoverIndex === index
        ? \`scale(1.5) \${translateValue}\`
        : hoverIndex !== null && Math.abs(hoverIndex - index) === 1
          ? \`scale(1.3) translateX(0px) translateY(0px)\`
          : \`scale(1) translateX(0px) translateY(0px)\`,
    config: { tension: 200, friction: 15 },
  });
};

const visibilitySpring = useSpring({
  opacity: isDockVisible ? 1 : 0,
  config: { tension: 120, friction: 14 },
});

return (
  <div
    className={\`dock-container \${currentPosition}\`}
    onMouseEnter={handleParentMouseEnter}
    onMouseLeave={handleParentMouseLeave}
  >
    <animated.div className="dock" style={{ ...getDockStyle(), ...visibilitySpring }}>
      {dockItems.map((item, index) => (
        <animated.div
          key={item}
          className="dock-item"
          style={scaleSpring(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {item}
        </animated.div>
      ))}
    </animated.div>
  </div>
);
};

export default Dock;`,
  css: `// Adjust the CSS to fit your needs

.dock-container {
position: absolute;
width: 100%;
height: 100%;
pointer-events: none;
display: flex;
}

.dock {
display: flex;
pointer-events: auto;
border: 1px solid #ffffff1c;
padding: 0.8em;
border-radius: 20px;
transition:
  opacity 0.2s ease-out,
  transform 0.2s ease-out;
}

/* Dock item styles */
.dock-item {
background-color: #060606;
margin: 5px;
width: 50px;
height: 50px;
padding: 10px;
border-radius: 10px;
border: 1px solid #ffffff1c;
display: flex;
position: relative;
z-index: 0;
font-size: 1.5em;
align-items: center;
justify-content: center;
transition:
  transform 0.1s ease-out,
  background-color 0.3s ease-out;
will-change: transform;
cursor: pointer;
pointer-events: auto;
}

.dock-item:hover {
z-index: 2;
background-color: #111;
transition: background-color 0.3s ease;
}

/* Positioning styles */
.dock-container.left {
top: 0;
left: 1em;
justify-content: flex-start;
align-items: center;
height: 100%;
}

.dock-container.right {
top: 0;
right: 1em;
justify-content: flex-end;
align-items: center;
height: 100%;
}

.dock-container.top {
top: 1em;
left: 0;
justify-content: center;
align-items: flex-start;
width: 100%;
}

.dock-container.bottom {
bottom: 1em;
left: 0;
justify-content: center;
align-items: flex-end;
width: 100%;
}
`
}