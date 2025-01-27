import code from '@content/Components/BounceCards/BounceCards.jsx?raw';
import css from '@content/Components/BounceCards/BounceCards.css?raw';
import tailwind from '@tailwind/Components/BounceCards/BounceCards.jsx?raw';

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
  code,
  css,
  tailwind
}