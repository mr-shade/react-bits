export const elasticSlider = {
  installation: `npm i framer-motion`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/ElasticSlider`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/ElasticSlider`,
  usage: `import ElasticSlider from './ElasticSlider'
  
<ElasticSlider
leftIcon={<>...your icon...</>}
rightIcon={<>...your icon...</>}
startingValue={500}
defaultValue={750}
maxValue={1000}
isStepped
stepSize={10}
/>`,
  code: `import {
animate,
motion,
useMotionValue,
useMotionValueEvent,
useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import './ElasticSlider.css';

const MAX_OVERFLOW = 50;

export function ElasticSlider({
defaultValue = 50,
startingValue = 0,
maxValue = 100,
className = "",
isStepped = false,
stepSize = 1,
leftIcon = <>-</>,
rightIcon = <>+</>,
}) {
return (
  <div className={\`slider-container \${className}\`}>
    <Slider
      defaultValue={defaultValue}
      startingValue={startingValue}
      maxValue={maxValue}
      isStepped={isStepped}
      stepSize={stepSize}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  </div>
);
}

function Slider({
defaultValue,
startingValue,
maxValue,
isStepped,
stepSize,
leftIcon,
rightIcon,
}) {
const [value, setValue] = useState(defaultValue);
const sliderRef = useRef(null);
const [region, setRegion] = useState("middle");
const clientX = useMotionValue(0);
const overflow = useMotionValue(0);
const scale = useMotionValue(1);

useEffect(() => {
  setValue(defaultValue);
}, [defaultValue]);

useMotionValueEvent(clientX, "change", (latest) => {
  if (sliderRef.current) {
    const { left, right } = sliderRef.current.getBoundingClientRect();
    let newValue;

    if (latest < left) {
      setRegion("left");
      newValue = left - latest;
    } else if (latest > right) {
      setRegion("right");
      newValue = latest - right;
    } else {
      setRegion("middle");
      newValue = 0;
    }

    overflow.jump(decay(newValue, MAX_OVERFLOW));
  }
});

const handlePointerMove = (e) => {
  if (e.buttons > 0 && sliderRef.current) {
    const { left, width } = sliderRef.current.getBoundingClientRect();
    let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

    if (isStepped) {
      newValue = Math.round(newValue / stepSize) * stepSize;
    }

    newValue = Math.min(Math.max(newValue, startingValue), maxValue);
    setValue(newValue);
    clientX.jump(e.clientX);
  }
};

const handlePointerDown = (e) => {
  handlePointerMove(e);
  e.currentTarget.setPointerCapture(e.pointerId);
};

const handlePointerUp = () => {
  animate(overflow, 0, { type: "spring", bounce: 0.5 });
};

const getRangePercentage = () => {
  const totalRange = maxValue - startingValue;
  if (totalRange === 0) return 0;

  return ((value - startingValue) / totalRange) * 100;
};

return (
  <>
    <motion.div
      onHoverStart={() => animate(scale, 1.2)}
      onHoverEnd={() => animate(scale, 1)}
      onTouchStart={() => animate(scale, 1.2)}
      onTouchEnd={() => animate(scale, 1)}
      style={{
        scale,
        opacity: useTransform(scale, [1, 1.2], [0.7, 1]),
      }}
      className="slider-wrapper"
    >
      <motion.div
        animate={{
          scale: region === "left" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(() =>
            region === "left" ? -overflow.get() / scale.get() : 0,
          ),
        }}
      >
        {leftIcon}
      </motion.div>

      <div
        ref={sliderRef}
        className="slider-root"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <motion.div
          style={{
            scaleX: useTransform(() => {
              if (sliderRef.current) {
                const { width } = sliderRef.current.getBoundingClientRect();
                return 1 + overflow.get() / width;
              }
            }),
            scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
            transformOrigin: useTransform(() => {
              if (sliderRef.current) {
                const { left, width } = sliderRef.current.getBoundingClientRect();
                return clientX.get() < left + width / 2 ? "right" : "left";
              }
            }),
            height: useTransform(scale, [1, 1.2], [6, 12]),
            marginTop: useTransform(scale, [1, 1.2], [0, -3]),
            marginBottom: useTransform(scale, [1, 1.2], [0, -3]),
          }}
          className="slider-track-wrapper"
        >
          <div className="slider-track">
            <div
              className="slider-range"
              style={{ width: \`\${getRangePercentage()}%\` }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{
          scale: region === "right" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(() =>
            region === "right" ? overflow.get() / scale.get() : 0,
          ),
        }}
      >
        {rightIcon}
      </motion.div>
    </motion.div>
    <p className="value-indicator">{Math.round(value)}</p>
  </>
);
}

function decay(value, max) {
if (max === 0) {
  return 0;
}

const entry = value / max;
const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

return sigmoid * max;
}`,
  css: `.slider-container {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1rem;
width: 12rem;
}

.slider-wrapper {
display: flex;
width: 100%;
touch-action: none;
user-select: none;
align-items: center;
justify-content: center;
gap: 1rem;
}

.slider-root {
position: relative;
display: flex;
width: 100%;
max-width: 200px;
flex-grow: 1;
cursor: grab;
touch-action: none;
user-select: none;
align-items: center;
padding: 1rem 0;
}

.slider-root:active {
cursor: grabbing;
}

.slider-track-wrapper {
display: flex;
flex-grow: 1;
}

.slider-track {
position: relative;
height: 100%;
flex-grow: 1;
overflow: hidden;
border-radius: 9999px;
background-color: rgba(128, 128, 128, 0.4);
}

.slider-range {
position: absolute;
height: 100%;
background-color: #888;
border-radius: 9999px;
}

.value-indicator {
color: #808080;
position: absolute;
transform: translateY(-1rem);
font-size: 0.75rem;
font-weight: 500;
letter-spacing: 0.05em;
}

.icon {
width: 24px;
height: 24px;
color: #888;
}

.icon.dark {
color: #ddd;
}`,
  tailwind: `import {
animate,
motion,
useMotionValue,
useMotionValueEvent,
useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MAX_OVERFLOW = 50;

export function ElasticSlider({
defaultValue = 50,
startingValue = 0,
maxValue = 100,
className = "",
isStepped = false,
stepSize = 1,
leftIcon = <>-</>,
rightIcon = <>+</>
}) {
return (
  <div className={\`flex flex-col items-center justify-center gap-4 w-48 \${className}\`}>
    <Slider
      defaultValue={defaultValue}
      startingValue={startingValue}
      maxValue={maxValue}
      isStepped={isStepped}
      stepSize={stepSize}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  </div>
);
}

function Slider({
defaultValue,
startingValue,
maxValue,
isStepped,
stepSize,
leftIcon,
rightIcon,
}) {
const [value, setValue] = useState(defaultValue);
const sliderRef = useRef(null);
const [region, setRegion] = useState("middle");
const clientX = useMotionValue(0);
const overflow = useMotionValue(0);
const scale = useMotionValue(1);

useEffect(() => {
  setValue(defaultValue);
}, [defaultValue]);

useMotionValueEvent(clientX, "change", (latest) => {
  if (sliderRef.current) {
    const { left, right } = sliderRef.current.getBoundingClientRect();
    let newValue;

    if (latest < left) {
      setRegion("left");
      newValue = left - latest;
    } else if (latest > right) {
      setRegion("right");
      newValue = latest - right;
    } else {
      setRegion("middle");
      newValue = 0;
    }

    overflow.jump(decay(newValue, MAX_OVERFLOW));
  }
});

const handlePointerMove = (e) => {
  if (e.buttons > 0 && sliderRef.current) {
    const { left, width } = sliderRef.current.getBoundingClientRect();
    let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

    if (isStepped) {
      newValue = Math.round(newValue / stepSize) * stepSize;
    }

    newValue = Math.min(Math.max(newValue, startingValue), maxValue);
    setValue(newValue);
    clientX.jump(e.clientX);
  }
};

const handlePointerDown = (e) => {
  handlePointerMove(e);
  e.currentTarget.setPointerCapture(e.pointerId);
};

const handlePointerUp = () => {
  animate(overflow, 0, { type: "spring", bounce: 0.5 });
};

const getRangePercentage = () => {
  const totalRange = maxValue - startingValue;
  if (totalRange === 0) return 0;
  return ((value - startingValue) / totalRange) * 100;
};

return (
  <>
    <motion.div
      onHoverStart={() => animate(scale, 1.2)}
      onHoverEnd={() => animate(scale, 1)}
      onTouchStart={() => animate(scale, 1.2)}
      onTouchEnd={() => animate(scale, 1)}
      style={{
        scale,
        opacity: useTransform(scale, [1, 1.2], [0.7, 1]),
      }}
      className="flex w-full touch-none select-none items-center justify-center gap-4"
    >
      <motion.div
        animate={{
          scale: region === "left" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(() =>
            region === "left" ? -overflow.get() / scale.get() : 0,
          ),
        }}
      >
        {leftIcon}
      </motion.div>

      <div
        ref={sliderRef}
        className="relative flex w-full max-w-xs flex-grow cursor-grab touch-none select-none items-center py-4"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <motion.div
          style={{
            scaleX: useTransform(() => {
              if (sliderRef.current) {
                const { width } = sliderRef.current.getBoundingClientRect();
                return 1 + overflow.get() / width;
              }
            }),
            scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
            transformOrigin: useTransform(() => {
              if (sliderRef.current) {
                const { left, width } = sliderRef.current.getBoundingClientRect();
                return clientX.get() < left + width / 2 ? "right" : "left";
              }
            }),
            height: useTransform(scale, [1, 1.2], [6, 12]),
            marginTop: useTransform(scale, [1, 1.2], [0, -3]),
            marginBottom: useTransform(scale, [1, 1.2], [0, -3]),
          }}
          className="flex flex-grow"
        >
          <div className="relative h-full flex-grow overflow-hidden rounded-full bg-gray-400">
            <div
              className="absolute h-full bg-gray-500 rounded-full"
              style={{ width: \`\${getRangePercentage()}%\` }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{
          scale: region === "right" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(() =>
            region === "right" ? overflow.get() / scale.get() : 0,
          ),
        }}
      >
        {rightIcon}
      </motion.div>
    </motion.div>
    <p className="absolute text-gray-400 transform -translate-y-4 text-xs font-medium tracking-wide">
      {Math.round(value)}
    </p>
  </>
);
}

function decay(value, max) {
if (max === 0) {
  return 0;
}

const entry = value / max;
const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);

return sigmoid * max;
}`
}