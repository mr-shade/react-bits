import code from '@content/Backgrounds/Waves/Waves.jsx?raw';
import css from '@content/Backgrounds/Waves/Waves.css?raw';
import tailwind from '@tailwind/Backgrounds/Waves/Waves.jsx?raw';

export const waves = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Backgrounds/Waves`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Backgrounds/Waves`,
  usage: `import Waves from './Waves';

<Waves
  lineColor="#fff"
  backgroundColor="rgba(255, 255, 255, 0.2)"
  waveSpeedX={0.02}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={12}
  yGap={36}
/>`,
  code,
  css,
  tailwind
}