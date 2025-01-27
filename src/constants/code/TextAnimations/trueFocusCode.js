import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/TrueFocus/TrueFocus.jsx?raw';
import css from '@content/TextAnimations/TrueFocus/TrueFocus.css?raw';
import tailwind from '@tailwind/TextAnimations/TrueFocus/TrueFocus.jsx?raw';

export const trueFocus = {
  ...(generateCliCommands('TextAnimations/TrueFocus', ['default', 'tailwind'])),
  installation: `npm i framer-motion`,
  usage: `import TrueFocus from './TrueFocus';

<TrueFocus 
sentence="True Focus"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>`,
  code,
  css,
  tailwind
}