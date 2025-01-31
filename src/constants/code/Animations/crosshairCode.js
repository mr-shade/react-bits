import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/Crosshair/Crosshair.jsx?raw';
import tailwind from '@tailwind/Animations/Crosshair/Crosshair.jsx?raw';

export const crosshair = {
  ...(generateCliCommands('Animations/Crosshair')),
  installation: `npm i gsap`,
  usage: `import { useRef } from 'react';
import Crosshair from './Crosshair';

const Component = () => {
const containerRef = useRef(null);

return (
  <div ref={containerRef} style={{ height: '300px', overflow: 'hidden' }}>
    <Crosshair containerRef={containerRef} color='#ffffff'/> // containerRef defaults to "window" if not provided
  </div>
)
};`,
  code,
  tailwind
}