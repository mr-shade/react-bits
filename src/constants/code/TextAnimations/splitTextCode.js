// Fun fact: this is the first component ever made for React Bits!

export const splitText = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/SplitText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/SplitText`,
  installation: `npm install @react-spring/web`,
  usage: `import SplitText from "./SplitText";

const handleAnimationComplete = () => {
console.log('All letters have animated!');
};

<SplitText
text="Hello, Tailwind!"
className="text-2xl font-semibold text-center"
delay={150}
animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
easing="easeOutCubic"
threshold={0.2}
rootMargin="-50px"
onLetterAnimationComplete={handleAnimationComplete}
/>`,
  code: `import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

const SplitText = ({
text = '',
className = '',
delay = 100,
animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
easing = 'easeOutCubic',
threshold = 0.1,
rootMargin = '-100px',
textAlign = 'center',
onLetterAnimationComplete,
}) => {
const letters = text.split('');
const [inView, setInView] = useState(false);
const ref = useRef();
const animatedCount = useRef(0);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(ref.current);

  return () => observer.disconnect();
}, [threshold, rootMargin]);

const springs = useSprings(
  letters.length,
  letters.map((_, i) => ({
    from: animationFrom,
    to: inView
      ? async (next) => {
        await next(animationTo);
        animatedCount.current += 1;
        if (animatedCount.current === letters.length && onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      }
      : animationFrom,
    delay: i * delay,
    config: { easing },
  }))
);

return (
  <p
    ref={ref}
    className={\`split-parent \${className}\`}
    style={{ textAlign, display: 'inline', overflow: 'hidden' }}
  >
    {springs.map((props, index) => (
      <animated.span
        key={index}
        style={{
          ...props,
          display: 'inline-block',
          willChange: 'transform, opacity',
        }}
      >
        {letters[index] === ' ' ? '\u00A0' : letters[index]}
      </animated.span>
    ))}
  </p>
);
};

export default SplitText;`,
  tailwind: `import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

const SplitText = ({
text = '',
className = '',
delay = 100,
animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
easing = 'easeOutCubic',
threshold = 0.1,
rootMargin = '-100px',
textAlign = 'center',
onLetterAnimationComplete,
}) => {
const letters = text.split('');
const [inView, setInView] = useState(false);
const ref = useRef();
const animatedCount = useRef(0);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(ref.current);

  return () => observer.disconnect();
}, [threshold, rootMargin]);

const springs = useSprings(
  letters.length,
  letters.map((_, i) => ({
    from: animationFrom,
    to: inView
      ? async (next) => {
        await next(animationTo);
        animatedCount.current += 1;
        if (animatedCount.current === letters.length && onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      }
      : animationFrom,
    delay: i * delay,
    config: { easing },
  }))
);

return (
  <p
    ref={ref}
    className={\`split-parent overflow-hidden inline \${className}\`}
    style={{ textAlign }}
  >
    {springs.map((props, index) => (
      <animated.span
        key={index}
        style={props}
        className="inline-block transform transition-opacity will-change-transform"
      >
        {letters[index] === ' ' ? '\u00A0' : letters[index]}
      </animated.span>
    ))}
  </p>
);
};

export default SplitText;`
}