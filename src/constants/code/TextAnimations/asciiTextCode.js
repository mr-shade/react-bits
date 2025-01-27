import code from '@content/TextAnimations/ASCIIText/ASCIIText.jsx?raw';

export const asciiText = {
  installation: `npm i three`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/ASCIIText`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/ASCIIText`,
  usage: `import ASCIIText from './ASCIIText';
<ASCIIText
  text='hello_world'
  enableWaves={true}
  asciiFontSize={8}
/>`,
  code,
  tailwind: code
}