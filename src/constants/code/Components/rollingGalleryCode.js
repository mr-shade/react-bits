import code from '@content/Components/RollingGallery/RollingGallery.jsx?raw';
import css from '@content/Components/RollingGallery/RollingGallery.css?raw';
import tailwind from '@tailwind/Components/RollingGallery/RollingGallery.jsx?raw';

export const rollingGallery = {
  installation: `npm i framer-motion`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/RollingGallery`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/RollingGallery`,
  usage: `import RollingGallery from './RollingGallery'
  
<RollingGallery autoplay={true} pauseOnHover={true} />`,
  code,
  css,
  tailwind
}