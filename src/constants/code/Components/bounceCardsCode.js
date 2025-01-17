export const bounceCards = {
  installation: `npm i gsap`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/BounceCards`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/BounceCards`,
  usage: `import BounceCards from './BounceCards'

const images = [
"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format",
"https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
"https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
"https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
"https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
];

const transformStyles = [
"rotate(5deg) translate(-150px)",
"rotate(0deg) translate(-70px)",
"rotate(-5deg)",
"rotate(5deg) translate(70px)",
"rotate(-5deg) translate(150px)"
];

<BounceCards
className="custom-class"
images={images}
containerWidth={500}
containerHeight={500}
animationDelay={1}
animationStagger={0.08}
easeType="elastic.out(1, 0.5)"
transformStyles={transformStyles}
/>`,
  code: `import { useEffect } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

export default function BounceCards({
className = "",
images = [],
containerWidth = 400,
containerHeight = 400,
animationDelay = 0.5,
animationStagger = 0.06,
easeType = "elastic.out(1, 0.8)",
transformStyles = [
  "rotate(10deg) translate(-170px)",
  "rotate(5deg) translate(-85px)",
  "rotate(-3deg)",
  "rotate(-10deg) translate(85px)",
  "rotate(2deg) translate(170px)"
]
}) {
useEffect(() => {
  gsap.fromTo(
    ".card",
    { scale: 0 },
    {
      scale: 1,
      stagger: animationStagger,
      ease: easeType,
      delay: animationDelay
    }
  );
}, [animationStagger, easeType, animationDelay]);

return (
  <div
    className={\`bounceCardsContainer \${className}\`}
    style={{
      position: "relative",
      width: containerWidth,
      height: containerHeight
    }}
  >
    {images.map((src, idx) => (
      <div
        className="card"
        key={idx}
        style={{
          transform:
            transformStyles[idx] !== undefined ? transformStyles[idx] : "none"
        }}
      >
        <img className="image" src={src} alt={\`card-\${idx}\`} />
      </div>
    ))}
  </div>
);
}`,
  css: `.bounceCardsContainer {
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: 400px;
height: 400px;
}

.card {
position: absolute;
width: 200px;
aspect-ratio: 1;
border: 5px solid #fff;
border-radius: 25px;
overflow: hidden;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card .image {
width: 100%;
height: 100%;
object-fit: cover;
}`,
  tailwind: `import { useEffect } from "react";
import { gsap } from "gsap";

export default function BounceCards({
className = "",
images = [],
containerWidth = 400,
containerHeight = 400,
animationDelay = 0.5,
animationStagger = 0.06,
easeType = "elastic.out(1, 0.8)",
transformStyles = [
  "rotate(10deg) translate(-170px)",
  "rotate(5deg) translate(-85px)",
  "rotate(-3deg)",
  "rotate(-10deg) translate(85px)",
  "rotate(2deg) translate(170px)"
]
}) {
useEffect(() => {
  gsap.fromTo(
    ".card",
    { scale: 0 },
    {
      scale: 1,
      stagger: animationStagger,
      ease: easeType,
      delay: animationDelay
    }
  );
}, [animationStagger, easeType, animationDelay]);

return (
  <div
    className={\`relative \${className}\`}
    style={{
      width: containerWidth,
      height: containerHeight
    }}
  >
    {images.map((src, idx) => (
      <div
        key={idx}
        className="card absolute w-[200px] aspect-square border-8 border-white rounded-[30px] overflow-hidden"
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          transform:
            transformStyles[idx] !== undefined ? transformStyles[idx] : "none"
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={\`card-\${idx}\`}
        />
      </div>
    ))}
  </div>
);
}`
}