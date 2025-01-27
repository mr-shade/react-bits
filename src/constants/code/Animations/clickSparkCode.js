import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/ClickSpark/ClickSpark.jsx?raw';
import tailwind from '@tailwind/Animations/ClickSpark/ClickSpark.jsx?raw';

export const clickSpark = {
  ...(generateCliCommands('Animations/ClickSpark', ['default', 'tailwind'])),
  usage: `import ClickSpark from './ClickSpark';

<ClickSpark
  sparkColor='#fff'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
/>`,
  code,
  tailwind
}