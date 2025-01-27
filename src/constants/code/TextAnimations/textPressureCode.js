import code from '@content/TextAnimations/TextPressure/TextPressure.jsx?raw';
import tailwind from '@tailwind/TextAnimations/TextPressure/TextPressure.jsx?raw';

export const textPressure = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/TextPressure`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/TextPressure`,
  usage: `import TextPressure from './TextPressure';

// Note:
// Make sure the font you're using supports all the variable properties. 
// React Bits does not take responsibility for the fonts used

<div style={{position: 'relative', height: '300px'}}>
  <TextPressure
    text="Hello!"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div>`,
  code,
  tailwind
}