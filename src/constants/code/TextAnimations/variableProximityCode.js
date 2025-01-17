export const variableProximity = {
  installation: `npm i framer-motion`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/VariableProximity`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/VariableProximity`,
  usage: `import { useRef } from 'react';
import VariableProximity from './VariableProximity';

const containerRef = useRef(null);

<div
ref={containerRef}
style={{position: 'relative'}}
>
  <VariableProximity
    label={'Hover me! And then star React Bits on GitHub, or else...'}
    className={'variable-proximity-demo'}
    fromFontVariationSettings="'wght' 400, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={100}
    falloff='linear'
  />
</div>`,
  code: `import { forwardRef, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./VariableProximity.css";

function useAnimationFrame(callback) {
useEffect(() => {
  let frameId;
  const loop = () => {
    callback();
    frameId = requestAnimationFrame(loop);
  };
  frameId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(frameId);
}, [callback]);
}

function useMousePositionRef(containerRef) {
const positionRef = useRef({ x: 0, y: 0 });

useEffect(() => {
  const updatePosition = (x, y) => {
    if (containerRef?.current) {
      const rect = containerRef.current.getBoundingClientRect();
      positionRef.current = { x: x - rect.left, y: y - rect.top };
    } else {
      positionRef.current = { x, y };
    }
  };

  const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY);
  const handleTouchMove = (ev) => {
    const touch = ev.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
  };
}, [containerRef]);

return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
const {
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 50,
  falloff = "linear",
  className = "",
  onClick,
  style,
  ...restProps
} = props;

const letterRefs = useRef([]);
const interpolatedSettingsRef = useRef([]);
const mousePositionRef = useMousePositionRef(containerRef);

const parsedSettings = useMemo(() => {
  const parseSettings = (settingsStr) =>
    new Map(
      settingsStr.split(",")
        .map(s => s.trim())
        .map(s => {
          const [name, value] = s.split(" ");
          return [name.replace(/['"]/g, ""), parseFloat(value)];
        })
    );

  const fromSettings = parseSettings(fromFontVariationSettings);
  const toSettings = parseSettings(toFontVariationSettings);

  return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
    axis,
    fromValue,
    toValue: toSettings.get(axis) ?? fromValue,
  }));
}, [fromFontVariationSettings, toFontVariationSettings]);

const calculateDistance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const calculateFalloff = (distance) => {
  const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
  switch (falloff) {
    case "exponential": return norm ** 2;
    case "gaussian": return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
    case "linear":
    default: return norm;
  }
};

useAnimationFrame(() => {
  if (!containerRef?.current) return;
  const containerRect = containerRef.current.getBoundingClientRect();

  letterRefs.current.forEach((letterRef, index) => {
    if (!letterRef) return;

    const rect = letterRef.getBoundingClientRect();
    const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
    const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

    const distance = calculateDistance(
      mousePositionRef.current.x,
      mousePositionRef.current.y,
      letterCenterX,
      letterCenterY
    );

    if (distance >= radius) {
      letterRef.style.fontVariationSettings = fromFontVariationSettings;
      return;
    }

    const falloffValue = calculateFalloff(distance);
    const newSettings = parsedSettings
      .map(({ axis, fromValue, toValue }) => {
        const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
        return \`'\${axis}' \${interpolatedValue}\`;
      })
      .join(", ");

    interpolatedSettingsRef.current[index] = newSettings;
    letterRef.style.fontVariationSettings = newSettings;
  });
});

const words = label.split(" ");
let letterIndex = 0;

return (
  <span
    ref={ref}
    className={\`\${className} variable-proximity\`}
    onClick={onClick}
    style={{ display: "inline", ...style }}
    {...restProps}
  >
    {words.map((word, wordIndex) => (
      <span
        key={wordIndex}
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
      >
        {word.split("").map((letter) => {
          const currentLetterIndex = letterIndex++;
          return (
            <motion.span
              key={currentLetterIndex}
              ref={(el) => { letterRefs.current[currentLetterIndex] = el; }}
              style={{
                display: "inline-block",
                fontVariationSettings:
                  interpolatedSettingsRef.current[currentLetterIndex],
              }}
              aria-hidden="true"
            >
              {letter}
            </motion.span>
          );
        })}
        {wordIndex < words.length - 1 && (
          <span style={{ display: "inline-block" }}>&nbsp;</span>
        )}
      </span>
    ))}
    <span className="sr-only">{label}</span>
  </span>
);
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;`,
  css: `// example font - make sure it's variable
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap");

.variable-proximity {
font-family: "Roboto Flex", sans-serif;
}

.sr-only {
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border: 0;
}`,
  tailwind: `import { forwardRef, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function useAnimationFrame(callback) {
useEffect(() => {
  let frameId;
  const loop = () => {
    callback();
    frameId = requestAnimationFrame(loop);
  };
  frameId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(frameId);
}, [callback]);
}

function useMousePositionRef(containerRef) {
const positionRef = useRef({ x: 0, y: 0 });

useEffect(() => {
  const updatePosition = (x, y) => {
    if (containerRef?.current) {
      const rect = containerRef.current.getBoundingClientRect();
      positionRef.current = { x: x - rect.left, y: y - rect.top };
    } else {
      positionRef.current = { x, y };
    }
  };

  const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY);
  const handleTouchMove = (ev) => {
    const touch = ev.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
  };
}, [containerRef]);

return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
const {
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 50,
  falloff = "linear",
  className = "",
  onClick,
  style,
  ...restProps
} = props;

const letterRefs = useRef([]);
const interpolatedSettingsRef = useRef([]);
const mousePositionRef = useMousePositionRef(containerRef);

const parsedSettings = useMemo(() => {
  const parseSettings = (settingsStr) =>
    new Map(
      settingsStr.split(",")
        .map(s => s.trim())
        .map(s => {
          const [name, value] = s.split(" ");
          return [name.replace(/['"]/g, ""), parseFloat(value)];
        })
    );

  const fromSettings = parseSettings(fromFontVariationSettings);
  const toSettings = parseSettings(toFontVariationSettings);

  return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
    axis,
    fromValue,
    toValue: toSettings.get(axis) ?? fromValue,
  }));
}, [fromFontVariationSettings, toFontVariationSettings]);

const calculateDistance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const calculateFalloff = (distance) => {
  const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
  switch (falloff) {
    case "exponential": return norm ** 2;
    case "gaussian": return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
    case "linear":
    default: return norm;
  }
};

useAnimationFrame(() => {
  if (!containerRef?.current) return;
  const containerRect = containerRef.current.getBoundingClientRect();

  letterRefs.current.forEach((letterRef, index) => {
    if (!letterRef) return;

    const rect = letterRef.getBoundingClientRect();
    const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
    const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

    const distance = calculateDistance(
      mousePositionRef.current.x,
      mousePositionRef.current.y,
      letterCenterX,
      letterCenterY
    );

    if (distance >= radius) {
      letterRef.style.fontVariationSettings = fromFontVariationSettings;
      return;
    }

    const falloffValue = calculateFalloff(distance);
    const newSettings = parsedSettings
      .map(({ axis, fromValue, toValue }) => {
        const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
        return \`'\${axis}' \${interpolatedValue}\`;
      })
      .join(", ");

    interpolatedSettingsRef.current[index] = newSettings;
    letterRef.style.fontVariationSettings = newSettings;
  });
});

const words = label.split(" ");
let letterIndex = 0;

return (
  <span
    ref={ref}
    onClick={onClick}
    style={{
      display: "inline",
      fontFamily: '"Roboto Flex", sans-serif',
      ...style,
    }}
    className={className}
    {...restProps}
  >
    {words.map((word, wordIndex) => (
      <span
        key={wordIndex}
        className="inline-block whitespace-nowrap"
      >
        {word.split("").map((letter) => {
          const currentLetterIndex = letterIndex++;
          return (
            <motion.span
              key={currentLetterIndex}
              ref={(el) => { letterRefs.current[currentLetterIndex] = el; }}
              style={{
                display: "inline-block",
                fontVariationSettings:
                  interpolatedSettingsRef.current[currentLetterIndex],
              }}
              aria-hidden="true"
            >
              {letter}
            </motion.span>
          );
        })}
        {wordIndex < words.length - 1 && (
          <span className="inline-block">&nbsp;</span>
        )}
      </span>
    ))}
    <span className="sr-only">{label}</span>
  </span>
);
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;`
}