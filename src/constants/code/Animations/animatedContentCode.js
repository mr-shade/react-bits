export const animatedContent = {
  installation: `npm install @react-spring/web`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/AnimatedContent`,
  usage: `import AnimatedContent from './AnimatedContent'

<AnimatedContent
distance={150}
direction="horizontal"
reverse={false}
config={{ tension: 80, friction: 20 }}
initialOpacity={0.2}
animateOpacity
scale={1.1}
threshold={0.2}
>
<div>Content to Animate</div>
</AnimatedContent>`,
  code: `import { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedContent = ({
children,
distance = 100,
direction = "vertical",
reverse = false,
config = { tension: 50, friction: 25 },
initialOpacity = 0,
animateOpacity = true,
scale = 1,
threshold = 0.1,
}) => {
const [inView, setInView] = useState(false);
const ref = useRef();

useEffect(() => {
  if (!ref.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    },
    { threshold }
  );

  observer.observe(ref.current);

  return () => observer.disconnect();
}, [threshold]);

const directions = {
  vertical: "Y",
  horizontal: "X",
};

const springProps = useSpring({
  from: {
    transform: \`translate\${directions[direction]}(\${reverse ? \`-\${distance}px\` : \`\${distance}px\`}) scale(\${scale})\`,
    opacity: animateOpacity ? initialOpacity : 1,
  },
  to: inView
    ? { transform: "translateY(0px) scale(1)", opacity: 1 }
    : undefined,
  config,
});

return (
  <animated.div ref={ref} style={springProps}>
    {children}
  </animated.div>
);
};

export default AnimatedContent;`
}