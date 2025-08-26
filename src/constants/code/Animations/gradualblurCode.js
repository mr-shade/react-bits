import { generateCliCommands } from '@/utils/utils';

import code from '@content/Animations/GradualBlur/GradualBlur.jsx?raw';
import tailwind from '@tailwind/Animations/GradualBlur/GradualBlur.jsx?raw';
import tsCode from '@ts-default/Animations/GradualBlur/GradualBlur.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/GradualBlur/GradualBlur.tsx?raw';

export const gradualBlur = {
  ...(generateCliCommands('Animations/GradualBlur')),
  Installation: `npm install mathjs`,
  usage: `

import GradualBlur from 'gradualblur'

<GradualBlur
  position="bottom"
  strength={2}
  height="7rem"
  divCount={5}
  exponential={true}
  opacity={1}
  target="page"
>
  <div>
    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
    </p>
  </div>
</GradualBlur>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}
