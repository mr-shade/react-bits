import code from '@content/Backgrounds/Squares/Squares.jsx?raw';
import css from '@content/Backgrounds/Squares/Squares.css?raw';
import tailwind from '@tailwind/Backgrounds/Squares/Squares.jsx?raw';

export const squares = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Backgrounds/Squares`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Backgrounds/Squares`,
  usage: `import Squares from './Squares';
  
<Squares 
speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
/>`,
  code,
  css,
  tailwind
}