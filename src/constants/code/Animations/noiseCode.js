import code from '@content/Animations/Noise/Noise.jsx?raw';
import css from '@content/Animations/Noise/Noise.css?raw';
import tailwind from '@tailwind/Animations/Noise/Noise.jsx?raw';

export const noise = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/Noise`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/Noise`,
  usage: `import Noise from './Noise;'

<div style={{width: '600px', height: '400px', position: 'relative', overflow: 'hidden'}}>
<Noise
  patternSize={250}
  patternScaleX={1}
  patternScaleY={1}
  patternRefreshInterval={2}
  patternAlpha={15}
/>
</div>`,
  code,
  css,
  tailwind
}