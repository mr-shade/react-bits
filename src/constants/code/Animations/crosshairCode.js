import code from '@content/Animations/Crosshair/Crosshair.jsx?raw';
import tailwind from '@tailwind/Animations/Crosshair/Crosshair.jsx?raw';

export const crosshair = {
  installation: `npm i gsap`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/Crosshair`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/Crosshair`,
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