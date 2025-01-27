import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/SpotlightCard/SpotlightCard.jsx?raw';
import css from '@content/Components/SpotlightCard/SpotlightCard.css?raw';
import tailwind from '@tailwind/Components/SpotlightCard/SpotlightCard.jsx?raw';

export const spotlightCard = {
  ...(generateCliCommands('Components/SpotlightCard', ['default', 'tailwind'])),
  usage: `import SpotlightCard from './SpotlightCard';
  
<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
  // Content goes here
</SpotlightCard>`,
  code,
  css,
  tailwind
}