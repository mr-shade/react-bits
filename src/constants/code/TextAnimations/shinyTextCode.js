import code from '@content/TextAnimations/ShinyText/ShinyText.jsx?raw';
import css from '@content/TextAnimations/ShinyText/ShinyText.css?raw';
import tailwind from '@tailwind/TextAnimations/ShinyText/ShinyText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ShinyText/ShinyText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ShinyText/ShinyText.tsx?raw';

export const shinyText = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/ShinyText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/ShinyText`,
  usage: `import ShinyText from './ShinyText';
  
<ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}