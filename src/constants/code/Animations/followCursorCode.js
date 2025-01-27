import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/FollowCursor/FollowCursor.jsx?raw';
import css from '@content/Animations/FollowCursor/FollowCursor.css?raw';

export const followCursor = {
  ...(generateCliCommands('Animations/FollowCursor', ['default'])),
  installation: `npm i @react-spring/web react-use-gesture`,
  usage: `import FollowCursor from './FollowCursor'

<FollowCursor />`,
  code,
  css
}