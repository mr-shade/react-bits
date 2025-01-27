import { generateCliCommands } from '@/utils/utils';

import magnetCode from '../../../content/Animations/Magnet/Magnet.jsx?raw';

export const magnet = {
  ...(generateCliCommands('Animations/Magnet', ['default'])),
  usage: `import Magnet from './Magnet'

<Magnet padding={50} disabled={false} magnetStrength={50}>
  <p>Star React Bits on GitHub!</p>
</Magnet>`,
  code: magnetCode
}