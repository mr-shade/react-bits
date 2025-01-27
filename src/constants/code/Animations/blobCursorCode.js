import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/BlobCursor/BlobCursor.jsx?raw';
import css from '@content/Animations/BlobCursor/BlobCursor.css?raw';

export const blobCursor = {
  ...(generateCliCommands('Animations/BlobCursor', ['default'])),
  installation: `npm i @react-spring/web`,
  usage: `import BlobCursor from './BlobCursor'
  
<BlobCursor />`,
  code,
  css
}