import code from '@content/Animations/ClickSpark/ClickSpark.jsx?raw';
import tailwind from '@tailwind/Animations/ClickSpark/ClickSpark.jsx?raw';

export const clickSpark = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/ClickSpark`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/ClickSpark`,
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