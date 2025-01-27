import code from '@content/Animations/FadeContent/FadeContent.jsx?raw';
import tailwind from '@tailwind/Animations/FadeContent/FadeContent.jsx?raw';
import tsCode from '@ts-default/Animations/FadeContent/FadeContent.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/FadeContent/FadeContent.tsx?raw';

export const fadeContent = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/FadeContent`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/FadeContent`,
  cliTsDefault: `npx jsrepo add https://reactbits.dev/ts/default/Animations/FadeContent`,
  cliTsTailwind: `npx jsrepo add https://reactbits.dev/ts/tailwind/Animations/FadeContent`,
  usage: `import FadeContent from './FadeContent'
  
<FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
  {/* Anything placed inside this container will be fade into view */}
</FadeContent>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}