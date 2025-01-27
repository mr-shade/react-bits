import code from '@content/Backgrounds/LetterGlitch/LetterGlitch.jsx?raw';
import tailwind from '@tailwind/Backgrounds/LetterGlitch/LetterGlitch.jsx?raw';

export const letterGlitch = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Backgrounds/LetterGlitch`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Backgrounds/LetterGlitch`,
  usage: `import LetterGlitch from './LetterGlitch';
  
<LetterGlitch
  glitchSpeed={50}
  centerVignette={true}
  outerVignette={false}
  smooth={true}
/>`,
  code,
  tailwind
}