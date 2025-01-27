import code from '@content/TextAnimations/BlurText/BlurText.jsx?raw';
import tailwind from '@tailwind/TextAnimations/BlurText/BlurText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/BlurText/BlurText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/BlurText/BlurText.tsx?raw';

export const blurText = {
  installation: `npm install @react-spring/web`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/BlurText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/BlurText`,
  cliTsDefault: `npx jsrepo add https://reactbits.dev/ts/default/TextAnimations/BlurText`,
  cliTsTailwind: `npx jsrepo add https://reactbits.dev/ts/tailwind/TextAnimations/BlurText`,
  usage: `import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

<BlurText
  text="Isn't this so cool?!"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8"
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}