import code from '@content/TextAnimations/FallingText/FallingText.jsx?raw';
import css from '@content/TextAnimations/FallingText/FallingText.css?raw';
import tailwind from '@tailwind/TextAnimations/FallingText/FallingText.jsx?raw';

export const fallingText = {
  installation: `npm i matter-js`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/FallingText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/FallingText`,
  usage: `import FallingText from './FallingText';
  
<FallingText
  text={\`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.\`}
  highlightWords={["React", "Bits", "animated", "components", "simplify"]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={false}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>`,
  code,
  css,
  tailwind
}