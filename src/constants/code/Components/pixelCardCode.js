import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/PixelCard/PixelCard.jsx?raw';
import css from '@content/Components/PixelCard/PixelCard.css?raw';
import tailwind from '@tailwind/Components/PixelCard/PixelCard.jsx?raw';

export const pixelCard = {
  ...(generateCliCommands('Components/PixelCard', ['default', 'tailwind'])),
  usage: `import PixelCard from './PixelCard';

<PixelCard variant="pink">
  // your card content (use position: absolute)
</PixelCard>
`,
  code,
  css,
  tailwind
}