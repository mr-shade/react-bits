import code from '@content/Animations/AnimatedContent/AnimatedContent.jsx?raw';
import tailwind from '@tailwind/Animations/AnimatedContent/AnimatedContent.jsx?raw';
import tsCode from '@ts-default/Animations/AnimatedContent/AnimatedContent.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/AnimatedContent/AnimatedContent.tsx?raw';

export const animatedContent = {
  installation: `npm install @react-spring/web`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/AnimatedContent`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/AnimatedContent`,
  cliTsDefault: `npx jsrepo add https://reactbits.dev/ts/default/Animations/AnimatedContent`,
  cliTsTailwind: `npx jsrepo add https://reactbits.dev/ts/tailwind/Animations/AnimatedContent`,
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
  code,
  tailwind,
  tsCode,
  tsTailwind
}