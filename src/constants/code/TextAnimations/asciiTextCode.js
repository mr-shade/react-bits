import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/ASCIIText/ASCIIText.jsx?raw';

export const asciiText = {
  ...(generateCliCommands('TextAnimations/ASCIIText', ['default', 'tailwind'])),
  installation: `npm i three`,
  usage: `import ASCIIText from './ASCIIText';
<ASCIIText
  text='hello_world'
  enableWaves={true}
  asciiFontSize={8}
/>`,
  code,
  tailwind: code
}