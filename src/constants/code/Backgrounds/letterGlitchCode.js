import { generateCliCommands } from '@/utils/utils';

import code from '@content/Backgrounds/LetterGlitch/LetterGlitch.jsx?raw';
import tailwind from '@tailwind/Backgrounds/LetterGlitch/LetterGlitch.jsx?raw';

export const letterGlitch = {
  ...(generateCliCommands('Backgrounds/LetterGlitch', ['default', 'tailwind'])),
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