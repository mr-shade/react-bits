import code from '@content/Backgrounds/GridDistortion/GridDistortion.jsx?raw';
import css from '@content/Backgrounds/GridDistortion/GridDistortion.css?raw';
import tailwind from '@tailwind/Backgrounds/GridDistortion/GridDistortion.jsx?raw';

export const gridDistortion = {
  installation: `npm i three`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Backgrounds/GridDistortion`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Backgrounds/GridDistortion`,
  usage: `import GridDistortion from './GridDistortion';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GridDistortion
    imageSrc="https://picsum.photos/1920/1080?grayscale"
    grid={10}
    mouse={0.1}
    strength={0.15}
    relaxation={0.9}
    className="custom-class"
  />
</div>`,
  code,
  css,
  tailwind
}