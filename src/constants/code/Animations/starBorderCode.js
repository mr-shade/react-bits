import code from '@content/Animations/StarBorder/StarBorder.jsx?raw';
import css from '@content/Animations/StarBorder/StarBorder.css?raw';
import tailwind from '@tailwind/Animations/StarBorder/StarBorder.jsx?raw';

export const starBorder = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/StarBorder`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/StarBorder`,
  usage: `import StarBorder from './StarBorder'
  
<StarBorder
  as="button"
  className="custom-class"
  color="cyan"
  speed="5s"
>
  // content
</StarBorder>`,
  code,
  css,
  tailwind
}