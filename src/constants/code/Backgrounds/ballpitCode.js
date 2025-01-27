import code from '@content/Backgrounds/Ballpit/Ballpit.jsx?raw';
import utility from '@content/Backgrounds/Ballpit/ballpit-utility.js?raw';
import tailwind from '@tailwind/Backgrounds/Ballpit/Ballpit.jsx?raw';

export const ballpit = {
  installation: `npm i three`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Backgrounds/Ballpit`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Backgrounds/Ballpit`,
  usage: `import Ballpit from './Ballpit;'

<div style={{position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
  <Ballpit
    count={200}
    gravity={0.7}
    friction={0.8}
    wallBounce={0.95}
    followCursor={true}
  />
</div>`,
  utility,
  code,
  tailwind
}