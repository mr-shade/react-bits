import code from '@content/Components/DecayCard/DecayCard.jsx?raw';
import css from '@content/Components/DecayCard/DecayCard.css?raw';

export const decayCard = {
  installation: `npm i gsap`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/DecayCard`,
  usage: `import DecayCard from './DecayCard';

<DecayCard width={200} height={300} image="https://...">
  <h2>The<br/>Open Sea</h2>
</DecayCard>`,
  code,
  css
}