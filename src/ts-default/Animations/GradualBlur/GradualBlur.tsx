import React, {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  PropsWithChildren,
} from "react";
import * as math from "mathjs";
import "./Gradualblur.css";

type GradualBlurProps = {
  position?: "top" | "bottom" | "left" | "right";
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;

  animated?: boolean | "scroll";
  duration?: string;
  easing?: string;

  opacity?: number;
  curve?: "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";

  responsive?: boolean;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;

  preset?: "top" | "bottom" | "left" | "right" | "subtle" | "intense" | "smooth" | "sharp" | "header" | "footer" | "sidebar" | "page-header" | "page-footer";
  gpuOptimized?: boolean;
  hoverIntensity?: number;
  target?: "parent" | "page";

  onAnimationComplete?: () => void;
  className?: string;
  style?: CSSProperties;
};


const DEFAULT_CONFIG: Partial<GradualBlurProps> = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: true,
  zIndex: 40,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'bezier',
  responsive: false,
  target: 'page',
  className: '',
  style: {}
};


const PRESETS: Record<string, Partial<GradualBlurProps>> = {

  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  

  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  

  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  

  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  

  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
};

const CURVE_FUNCTIONS: Record<string, (progress: number) => number> = {
  linear: (progress) => progress,
  bezier: (progress) => progress * progress * (3 - 2 * progress),
  'ease-in': (progress) => progress * progress,
  'ease-out': (progress) => 1 - Math.pow(1 - progress, 2),
  'ease-in-out': (progress) => 
    progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
};

const mergeConfigs = (...configs: Partial<GradualBlurProps>[]): Partial<GradualBlurProps> => {
  return configs.reduce((acc, config) => ({ ...acc, ...config }), {});
};

const getGradientDirection = (position: string): string => {
  const directions: Record<string, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return directions[position] || 'to bottom';
};

const debounce = <T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


const useResponsiveHeight = (responsive: boolean = false, config: Partial<GradualBlurProps>) => {
  const [height, setHeight] = useState(config.height);
  
  const updateHeight = useCallback(debounce(() => {
    if (!responsive) return;
    
    const screenWidth = window.innerWidth;
    let newHeight = config.height;
    
    if (screenWidth <= 480 && config.mobileHeight) {
      newHeight = config.mobileHeight;
    } else if (screenWidth <= 768 && config.tabletHeight) {
      newHeight = config.tabletHeight;
    } else if (screenWidth <= 1024 && config.desktopHeight) {
      newHeight = config.desktopHeight;
    }
    
    setHeight(newHeight);
  }, 100), [responsive, config]);

  useEffect(() => {
    if (!responsive) return;
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [responsive, updateHeight]);

  return responsive ? height : config.height;
};

const useResponsiveWidth = (responsive: boolean = false, config: Partial<GradualBlurProps>) => {
  const [width, setWidth] = useState(config.width);
  
  const updateWidth = useCallback(debounce(() => {
    if (!responsive) return;
    
    const screenWidth = window.innerWidth;
    let newWidth = config.width;
    
    if (screenWidth <= 480 && config.mobileWidth) {
      newWidth = config.mobileWidth;
    } else if (screenWidth <= 768 && config.tabletWidth) {
      newWidth = config.tabletWidth;
    } else if (screenWidth <= 1024 && config.desktopWidth) {
      newWidth = config.desktopWidth;
    }
    
    setWidth(newWidth);
  }, 100), [responsive, config]);

  useEffect(() => {
    if (!responsive) return;
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [responsive, updateWidth]);

  return responsive ? width : config.width;
};

const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement | null>, shouldObserve: boolean = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);
  
  useEffect(() => {
    if (!shouldObserve || !ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);
  
  return isVisible;
};

const GradualBlur: React.FC<PropsWithChildren<GradualBlurProps>> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as Required<GradualBlurProps>;
  }, [props]);


  const responsiveHeight = useResponsiveHeight(config.responsive, config);
  const responsiveWidth = useResponsiveWidth(config.responsive, config);

  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');


  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;
    const currentStrength = isHovered && config.hoverIntensity ? 
      config.strength * config.hoverIntensity : config.strength;
    
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;
    
    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);
      
      // Calculate blur value
      let blurValue: number;
      if (config.exponential) {
        blurValue = Number(math.pow(2, progress * 4)) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }
      
      // Calculate gradient positions
      const p1 = math.round((increment * i - increment) * 10) / 10;
      const p2 = math.round((increment * i) * 10) / 10;
      const p3 = math.round((increment * i + increment) * 10) / 10;
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;
      
      // Generate gradient
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      
      const direction = getGradientDirection(config.position);
      
      const divStyle: CSSProperties = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition: config.animated && config.animated !== 'scroll' ? 
          `backdrop-filter ${config.duration} ${config.easing}` : undefined
      };
      
      divs.push(<div key={i} style={divStyle} />);
    }
    
    return divs;
  }, [config, isHovered]);

  const containerStyle: CSSProperties = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';
    
    const baseStyle: CSSProperties = {
  
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };


    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);


  const handleMouseEnter = useCallback(() => {
    if (config.hoverIntensity) {
      setIsHovered(true);
    }
  }, [config.hoverIntensity]);

  const handleMouseLeave = useCallback(() => {
    if (config.hoverIntensity) {
      setIsHovered(false);
    }
  }, [config.hoverIntensity]);


  useEffect(() => {
    if (isVisible && config.animated === 'scroll' && config.onAnimationComplete) {
      const timer = setTimeout(
        () => config.onAnimationComplete!(),
        parseFloat(config.duration) * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [isVisible, config.animated, config.duration, config.onAnimationComplete]);

  return (
    <div 
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className}`}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="gradual-blur-inner" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%'
        }}
      >
        {blurDivs}
      </div>
    </div>
  );
};


export const createPageBlur = (props: Partial<GradualBlurProps> = {}) => {
  return <GradualBlur {...props} target="page" />;
};

export const createParentBlur = (props: Partial<GradualBlurProps> = {}) => {
  return <GradualBlur {...props} target="parent" />;
};


export { PRESETS, CURVE_FUNCTIONS };

export default React.memo(GradualBlur);


const injectStyles = () => {
  if (typeof document === 'undefined') return;
  
  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = `
    .gradual-blur {
      pointer-events: none;
    }

    .gradual-blur-page {
    }

    .gradual-blur-parent {
    }

    .gradual-blur-inner {
      pointer-events: none;
    }

    .gradual-blur:hover .gradual-blur-inner {
    }

    .gradual-blur {
      transition: opacity 0.3s ease-out;
    }

    @media (max-width: 480px) {
      .gradual-blur-responsive {
      }
    }

    @media (max-width: 768px) {
      .gradual-blur-responsive {
      }
    }
  `;
  
  document.head.appendChild(styleElement);
};

if (typeof document !== 'undefined') {
  injectStyles();
}
