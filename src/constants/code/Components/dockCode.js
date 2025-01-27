import code from '@content/Components/Dock/Dock.jsx?raw';
import css from '@content/Components/Dock/Dock.css?raw';

export const dock = {
  installation: `npm i @react-spring/web`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/Dock`,
  usage: `import Dock from './Dock';

<Dock collapsible={false} position="left" responsive="bottom" />`,
  code,
  css
}