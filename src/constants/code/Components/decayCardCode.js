import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/DecayCard/DecayCard.jsx?raw';
import css from '@content/Components/DecayCard/DecayCard.css?raw';

export const decayCard = {
  ...(generateCliCommands('Components/DecayCard', ['default'])),
  installation: `npm i gsap`,
  usage: `import DecayCard from './DecayCard';

<DecayCard width={200} height={300} image="https://...">
  <h2>The<br/>Open Sea</h2>
</DecayCard>`,
  code,
  css
}