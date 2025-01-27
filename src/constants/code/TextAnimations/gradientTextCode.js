import code from '@content/TextAnimations/GradientText/GradientText.jsx?raw';
import css from '@content/TextAnimations/GradientText/GradientText.css?raw';
import tailwind from '@tailwind/TextAnimations/GradientText/GradientText.jsx?raw';

export const gradientText = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/GradientText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/GradientText`,
  usage: `import GradientText from './GradientText'
  
<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Add a splash of color!
</GradientText>`,
  code,
  css,
  tailwind
}