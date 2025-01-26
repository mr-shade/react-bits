export const fadeContent = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/FadeContent`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/FadeContent`,
  cliTsDefault: `npx jsrepo add https://reactbits.dev/ts/default/Animations/FadeContent`,
  cliTsTailwind: `npx jsrepo add https://reactbits.dev/ts/tailwind/Animations/FadeContent`,
  usage: `import FadeContent from './FadeContent'
  
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
  {/* Anything placed inside this container will be fade into view */}
</FadeContent>`,
  code: `import { useRef, useEffect, useState } from 'react';

const FadeContent = ({
  children,
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  threshold = 0.1,
  initialOpacity = 0,
  className = ''
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
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;`,
  tailwind: `import { useRef, useEffect, useState } from 'react';
  
const FadeContent = ({
  children,
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  threshold = 0.1,
  initialOpacity = 0,
  className = ''
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

  return (
    <div
      ref={ref}
      className={\`\${className} transition-opacity \${blur ? "transition-[opacity,filter]" : ""} \${inView ? "opacity-100" : \`opacity-[\${initialOpacity}]\`
        } \${blur ? (inView ? "blur-0" : "blur-[10px]") : ""}\`}
      style={{
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;`,
  tsCode: `import { useRef, useEffect, useState, ReactNode } from "react";

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  easing = "ease-out",
  threshold = 0.1,
  initialOpacity = 0,
  className = "",
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,
        filter: blur ? (inView ? "blur(0px)" : "blur(10px)") : "none",
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;`,
  tsTailwind: `import { useRef, useEffect, useState, ReactNode } from "react";
  
interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  easing = "ease-out",
  threshold = 0.1,
  initialOpacity = 0,
  className = "",
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={\`\${className} transition-opacity \${blur ? "transition-[opacity,filter]" : ""} \${
        inView ? "opacity-100" : \`opacity-[\${initialOpacity}]\`
      } \${blur ? (inView ? "blur-0" : "blur-[10px]") : ""}\`}
      style={{
        transition: \`opacity \${duration}ms \${easing}, filter \${duration}ms \${easing}\`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;`
}