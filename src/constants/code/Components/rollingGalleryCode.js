export const rollingGallery = {
  installation: `npm i framer-motion`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/RollingGallery`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/RollingGallery`,
  usage: `import RollingGallery from './RollingGallery'
  
<RollingGallery autoplay={true} pauseOnHover={true} />`,
  code: `import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import "./RollingGallery.css";

// don't forget to add your images to the array
const RollingGallery = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
const faceCount = images.length;
const faceWidth = (cylinderWidth / faceCount) * 1.5; // Increased width for items
const dragFactor = 0.05;
const radius = cylinderWidth / (2 * Math.PI);

const rotation = useMotionValue(0);
const controls = useAnimation();
const autoplayRef = useRef();

const handleDrag = (_, info) => {
  rotation.set(rotation.get() + info.offset.x * dragFactor);
};

const handleDragEnd = (_, info) => {
  controls.start({
    rotateY: rotation.get() + info.velocity.x * dragFactor,
    transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
  });
};

const transform = useTransform(rotation, (value) => {
  return \`rotate3d(0, 1, 0, \${value}deg)\`;
});

useEffect(() => {
  if (autoplay) {
    autoplayRef.current = setInterval(() => {
      controls.start({
        rotateY: rotation.get() - (360 / faceCount),
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - (360 / faceCount));
    }, 2000);

    return () => clearInterval(autoplayRef.current);
  }
}, [autoplay, rotation, controls, faceCount]);

useEffect(() => {
  const handleResize = () => {
    setIsScreenSizeSm(window.innerWidth <= 640);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const handleMouseEnter = () => {
  if (autoplay && pauseOnHover) {
    clearInterval(autoplayRef.current);
    controls.stop();
  }
};

const handleMouseLeave = () => {
  if (autoplay && pauseOnHover) {
    controls.start({
      rotateY: rotation.get() - (360 / faceCount),
      transition: { duration: 2, ease: "linear" },
    });
    rotation.set(rotation.get() - (360 / faceCount));

    autoplayRef.current = setInterval(() => {
      controls.start({
        rotateY: rotation.get() - (360 / faceCount),
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - (360 / faceCount));
    }, 2000);
  }
};

return (
  <div className="gallery-container">
    <div className="gallery-gradient gallery-gradient-left"></div>
    <div className="gallery-gradient gallery-gradient-right"></div>
    <div className="gallery-content">
      <motion.div
        drag="x"
        className="gallery-track"
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        style={{
          transform: transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {images.map((url, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{
              width: \`\${faceWidth}px\`,
              transform: \`rotateY(\${i * (360 / faceCount)}deg) translateZ(\${radius}px)\`,
            }}
          >
            <img src={url} alt="gallery" className="gallery-img" />
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);
};

export default RollingGallery;`,
  css: `.gallery-container {
position: relative;
height: 500px;
width: 100%;
overflow: hidden;
}

.gallery-gradient {
position: absolute;
top: 0;
height: 100%;
width: 48px;
z-index: 10;
}

.gallery-gradient-left {
left: 0;
background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, #060606 100%);
}

.gallery-gradient-right {
right: 0;
background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #060606 100%);
}

.gallery-content {
display: flex;
height: 100%;
align-items: center;
justify-content: center;
perspective: 1000px;
transform-style: preserve-3d;
}

.gallery-track {
display: flex;
height: auto;
min-height: 200px;
justify-content: center;
align-items: center;
cursor: grab;
transform-style: preserve-3d;
width: 100%;
}

.gallery-item {
position: absolute;
display: flex;
height: fit-content;
align-items: center;
justify-content: center;
padding: 8%;
backface-visibility: hidden;
}

.gallery-img {
pointer-events: none;
height: 120px;
width: 300px;
border-radius: 15px;
border: 3px solid #fff;
object-fit: cover;
transition: 0.3s ease;
}

.gallery-item:hover .gallery-img {
transform: scale(1.05);
transition: 0.3s ease;
}

@media (max-width: 768px) {
.gallery-item {
  padding: 6%;
}
.gallery-img {
  height: 100px;
  width: 220px;
}
}`,
  tailwind: `import { useEffect, useState } from "react";
import {
motion,
useMotionValue,
useAnimation,
useTransform,
} from "framer-motion";

const RollingGallery = ({
autoplay = false,
pauseOnHover = false,
images = [],
}) => {
const [isScreenSizeSm, setIsScreenSizeSm] = useState(
  window.innerWidth <= 640
);
useEffect(() => {
  const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
const faceCount = images.length;
const faceWidth = (cylinderWidth / faceCount) * 1.5;
const radius = cylinderWidth / (2 * Math.PI);

const dragFactor = 0.05;
const rotation = useMotionValue(0);
const controls = useAnimation();

const transform = useTransform(
  rotation,
  (val) => \`rotate3d(0,1,0,\${val}deg)\`
);

const startInfiniteSpin = (startAngle) => {
  controls.start({
    rotateY: [startAngle, startAngle - 360],
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  });
};

useEffect(() => {
  if (autoplay) {
    const currentAngle = rotation.get();
    startInfiniteSpin(currentAngle);
  } else {
    controls.stop();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [autoplay]);

const handleUpdate = (latest) => {
  if (typeof latest.rotateY === "number") {
    rotation.set(latest.rotateY);
  }
};

const handleDrag = (_, info) => {
  controls.stop();
  rotation.set(rotation.get() + info.offset.x * dragFactor);
};

const handleDragEnd = (_, info) => {
  const finalAngle = rotation.get() + info.velocity.x * dragFactor;
  rotation.set(finalAngle);

  if (autoplay) {
    startInfiniteSpin(finalAngle);
  }
};

const handleMouseEnter = () => {
  if (autoplay && pauseOnHover) {
    controls.stop();
  }
};
const handleMouseLeave = () => {
  if (autoplay && pauseOnHover) {
    const currentAngle = rotation.get();
    startInfiniteSpin(currentAngle);
  }
};

return (
  <div className="relative h-[500px] w-full overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full w-[48px] z-10"
      style={{
        background:
          "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
      }}
    />
    <div
      className="absolute top-0 right-0 h-full w-[48px] z-10"
      style={{
        background:
          "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
      }}
    />

    <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
      <motion.div
        drag="x"
        dragElastic={0}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={controls}
        onUpdate={handleUpdate}
        style={{
          transform: transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
      >
        {images.map((url, i) => (
          <div
            key={i}
            className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
            style={{
              width: \`\${faceWidth}px\`,
              transform: \`rotateY(\${(360 / faceCount) * i
                }deg) translateZ(\${radius}px)\`,
            }}
          >
            <img
              src={url}
              alt="gallery"
              className="pointer-events-none h-[120px] w-[300px] rounded-[15px] border-[3px] border-white object-cover
                         transition-transform duration-300 ease-out group-hover:scale-105
                         sm:h-[100px] sm:w-[220px]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);
};

export default RollingGallery;`
}