import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/StarBorder/StarBorder.jsx?raw';
import css from '@content/Animations/StarBorder/StarBorder.css?raw';
import tailwind from '@tailwind/Animations/StarBorder/StarBorder.jsx?raw';

export const starBorder = {
  ...(generateCliCommands('Animations/StarBorder', ['default', 'tailwind'])),
  usage: `import StarBorder from './StarBorder'
  
<StarBorder
  as="button"
  className="custom-class"
  color="cyan"
  speed="5s"
>
  // content
</StarBorder>`,
  code,
  css,
  tailwind
}