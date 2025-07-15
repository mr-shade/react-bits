import { generateCliCommands } from '@/utils/utils';

import code from '@content/Components/ScrollStack/ScrollStack.jsx?raw';
import css from '@content/Components/ScrollStack/ScrollStack.css?raw';
import tailwind from '@tailwind/Components/ScrollStack/ScrollStack.jsx?raw';
import tsCode from "@ts-default/Components/ScrollStack/ScrollStack.tsx?raw";
import tsTailwind from "@ts-tailwind/Components/ScrollStack/ScrollStack.tsx?raw";

export const scrollStack = {
  ...(generateCliCommands('Components/ScrollStack')),
  installation: `npm i lenis`,
  usage: `import ScrollStack, { ScrollStackItem } from './ScrollStack'

<ScrollStack>
  <ScrollStackItem>
    <h2>Card 1</h2>
    <p>This is the first card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 2</h2>
    <p>This is the second card in the stack</p>
  </ScrollStackItem>
  <ScrollStackItem>
    <h2>Card 3</h2>
    <p>This is the third card in the stack</p>
  </ScrollStackItem>
</ScrollStack>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}