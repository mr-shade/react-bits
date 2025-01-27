import code from '@content/Components/ElasticSlider/ElasticSlider.jsx?raw';
import css from '@content/Components/ElasticSlider/ElasticSlider.css?raw';
import tailwind from '@tailwind/Components/ElasticSlider/ElasticSlider.jsx?raw';

export const elasticSlider = {
  installation: `npm i framer-motion`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/ElasticSlider`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/ElasticSlider`,
  usage: `import ElasticSlider from './ElasticSlider'
  
<ElasticSlider
  leftIcon={<>...your icon...</>}
  rightIcon={<>...your icon...</>}
  startingValue={500}
  defaultValue={750}
  maxValue={1000}
  isStepped
  stepSize={10}
/>`,
  code,
  css,
  tailwind
}