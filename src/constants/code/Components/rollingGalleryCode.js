import code from '@content/Components/RollingGallery/RollingGallery.jsx?raw';
import css from '@content/Components/RollingGallery/RollingGallery.css?raw';
import tailwind from '@tailwind/Components/RollingGallery/RollingGallery.jsx?raw';
import tsCode from '@ts-default/Components/RollingGallery/RollingGallery.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/RollingGallery/RollingGallery.tsx?raw';

export const rollingGallery = {
  dependencies: `motion`,
  usage: `import RollingGallery from './RollingGallery'
  
<RollingGallery autoplay={true} pauseOnHover={true} />`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
