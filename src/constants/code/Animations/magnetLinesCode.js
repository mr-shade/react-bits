import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/MagnetLines/MagnetLines.jsx?raw';
import css from '@content/Animations/MagnetLines/MagnetLines.css?raw';
import tailwind from '@tailwind/Animations/MagnetLines/MagnetLines.jsx?raw';

export const magnetLines = {
  ...(generateCliCommands('Animations/MagnetLines', ['default', 'tailwind'])),
  usage: `import MagnetLines from './MagnetLines';

<MagnetLines
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>`,
  code,
  css,
  tailwind
}