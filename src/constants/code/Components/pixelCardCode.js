import code from '@content/Components/PixelCard/PixelCard.jsx?raw';
import css from '@content/Components/PixelCard/PixelCard.css?raw';
import tailwind from '@tailwind/Components/PixelCard/PixelCard.jsx?raw';

export const pixelCard = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/PixelCard`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/PixelCard`,
  usage: `import PixelCard from './PixelCard';

<PixelCard variant="pink">
  // your card content (use position: absolute)
</PixelCard>
`,
  code,
  css,
  tailwind
}